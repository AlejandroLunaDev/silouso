/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { loginUser } from '../../services/auth/loginUser';
import { logOutUser } from '../../services/auth/logOutUser';
import { loginGitHubUser } from '../../services/auth/loginGitHubUser';
import { loginGoogleUser } from '../../services/auth/loginGoogleUser';
import { registerUser } from '../../services/auth/registerUser';
import { recoverPassword } from '../../services/auth/recoverPassword';
import { updatePassword } from '../../services/auth/updatePassword';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();


export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const token = Cookies.get('coderCookie');
 // Añadir un log para verificar el token
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser({ decodedToken }); // Guardamos el token en el estado de usuario
    }
  }, []);

const login = async (credentials) => {
  try {
    // Llamamos a la función loginUser para autenticar al usuario
    const { data, response } = await loginUser(credentials);

    // Puedes usar data y response aquí según sea necesario
    return { data, response };
  } catch (error) {
    // Manejo de errores en el login
    console.error('Login error in AuthProvider:', error);
    return { status: 'error', message: error.message };
  }
};


  const logout = async () => {
    try {
      setUser(null);
      await logOutUser();
  
    } catch (error) {
      console.error('Logout error in AuthProvider:', error);
      return { status: 'error', message: 'Logout failed' };
    }
  };

  const loginWithGitHub = async () => {
    try {
      const response = await loginGitHubUser();
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error('Login with GitHub error in AuthProvider:', error);
      return { status: 'error', message: 'Login with GitHub failed' };
    }
  };

  const loginWithGoogle = async () => {
    try {
      const response = await loginGoogleUser();
      console.log(response)
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Login with Google error in AuthProvider:', error);
      return { status: 'error', message: 'Login with Google failed' };
    }
  };

  const register = async credentials => {
    try {
      const response = await registerUser(credentials);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Register error in AuthProvider:', error);
      return { status: 'error', message: 'Register failed' };
    }
  };

  const recoveredPassword = async email => {
    try {
      const data = await recoverPassword(email);
      return data;
    } catch (error) {
      console.error('Recover password error in AuthProvider:', error);
      return { status: 'error', message: 'Recover password failed' };
    }
  };

  const updatePasswordOk = async (password, password2, token) => {
    try {
      const data = await updatePassword(password, password2, token);
      return data;
    } catch (error) {
      console.error('Update password error in AuthProvider:', error);
      return { status: 'error', message: 'Update password failed' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        loginWithGitHub,
        loginWithGoogle,
        register,
        recoveredPassword,
        updatePasswordOk,
        user,
        decodedToken: user?.decodedToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
