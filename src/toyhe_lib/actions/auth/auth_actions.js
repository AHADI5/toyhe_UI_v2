import instance from "../../utils/axios.js";
import { jwtDecode } from 'jwt-decode';


export const getToken = () => sessionStorage.getItem('token');

export const saveToken = (token) => sessionStorage.setItem('token', token);

export const removeToken = () => sessionStorage.removeItem('token');

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    throw new Error('Invalid token');
  }
};

export const parseAccessRights = (roleString) => {
  const [role, ...rights] = roleString.split(',');
  const accessRights = rights.map((right) => {
    const match = right.match(/^MODEL_(\w+)_([A-Z_]+)$/);
    if (!match) return null;

    const model = match[1].toLowerCase();
    const permissions = match[2].split('_');

    return {
      model,
      read: permissions.includes('READ') ? 1 : 0,
      write: permissions.includes('WRITE') ? 1 : 0,
      update: permissions.includes('UPDATE') ? 1 : 0,
      delete: permissions.includes('DELETE') ? 1 : 0,
    };
  }).filter(Boolean);

  return { role, accessRights };
};

export const login = async (formData , url) => {
  const response = await instance.post(url, formData);
  const { token } = response.data;

  if (!token || typeof token !== 'string') {
    throw new Error('Invalid token received');
  }

  saveToken(token);
  const decodedToken = decodeToken(token);
  const accessRightsRoleArray = parseAccessRights(decodedToken.authorities);
  console.log(accessRightsRoleArray)
  return {
    token,
    userRole: accessRightsRoleArray.role,
    accessRights: accessRightsRoleArray.accessRights,
    userEmail: decodedToken.sub,
  };
};

export const logout = () => {
  removeToken();
};

  