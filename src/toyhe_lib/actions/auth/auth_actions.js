import instance from "../../utils/axios";
import { jwtDecode } from 'jwt-decode';



export const getToken = () => sessionStorage.getItem('token');

export const saveToken = (token) => sessionStorage.setItem('token', token);

export const removeToken = () => sessionStorage.removeItem('token');

//Saving the accessRightRole object to the session Storage
export const saveAccessRights = (accessRights) => sessionStorage.setItem('accessRights', JSON.stringify(accessRights));

//Getting the accessRightRole object from the session Storage
export const getAccessRights = () => JSON.parse(sessionStorage.getItem('accessRights'));

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    throw new Error('Invalid token');
  }
};



export const login = async (formData , url) => {
  console.log(formData)
  const response = await instance.post(url, formData);
  const { token } = response.data;

  if (!token || typeof token !== 'string') {
    throw new Error('Invalid token received');
  }

  saveToken(token);
  const decodedToken = decodeToken(token);
  console.log("The decoded token is :"  , decodedToken)
  //Extracting the accessRights and role for the user from the token
  const accessRightsRoleArray = decodedToken.authorities;


  /**
   * Creating an object from the accessRightsRoleArray with this form  :
   * {
   *  role: 'ROLE_ADMIN',
   *  create: 'CREATE',
   *  model: 'USER',
   *  read: 'READ',
   *  update: 'UPDATE',
   *  delete: 'DELETE', 
   * }

   * **/ 

  const accessRightsObject = transFormAccessRightArray(accessRightsRoleArray);
  //Saving the accessRights to the session Storage
  saveAccessRights(accessRightsObject);

  return {
    token,
    accessRights: accessRightsObject,
    userEmail: decodedToken.sub,
  };
};

export const logout = () => {
  removeToken();
};

const transFormAccessRightArray =  (accessRights) => {
  //Access right in StringForm 


  //Access right in ObjectForm
  const [role , ...accessRightsArray] = accessRights.split(',');
  console.log(accessRightsArray)

  const accessRightsObject = accessRightsArray.map((accessRight) => {
    const [label , model, read , create , update , del] = accessRight.split('_');
    return {
      role ,
      [label.toLowerCase()]: model,
      read,
      create,
      update,
      delete: del
    };
  });

  return accessRightsObject;
}


  