import { authClient } from './client';

const getToken = () => {
  return localStorage.getItem('auth-token');
};

const setToken = (token) => {
  authClient();
  return localStorage.setItem('auth-token', token);
};

const removeToken = () => {
  return localStorage.removeItem('auth-token');
};

export { getToken, setToken, removeToken };
