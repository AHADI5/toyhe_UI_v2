import  { createContext, useState, useEffect } from 'react';
import { login as loginAction, logout as logoutAction, getToken, decodeToken, parseAccessRights } from './auth_actions';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [accessRights, setAccessRights] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decodedToken = decodeToken(token);
        const accessRightsRoleArray = parseAccessRights(decodedToken.authorities);

        setUserRole(accessRightsRoleArray.role);
        setAccessRights(accessRightsRoleArray.accessRights);
        setUserEmail(decodedToken.sub);
        setAuthed(true);
      } catch (error) {
        console.error('Error initializing auth state:', error);
        logoutAction();
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (formData) => {
    try {
      const { userRole, accessRights, userEmail } = await loginAction(formData);

      setUserRole(userRole);
      setAccessRights(accessRights);
      setUserEmail(userEmail);
      setAuthed(true);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = () => {
    try {
      logoutAction();
      setAuthed(false);
      setUserRole(null);
      setUserEmail(null);
      setAccessRights(null);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  console.log('Auth State:', { authed, userRole, userEmail, accessRights });

  return (
    <AuthContext.Provider value={{ authed, userRole, userEmail, accessRights, login, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
