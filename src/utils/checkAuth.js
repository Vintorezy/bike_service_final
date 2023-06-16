import { getToken } from '../service/token';

export const checkAuth = (userData, userStatus) => {
  if (userStatus === 'fulfilled') return true;

  if (userStatus === 'pending' && getToken() && !userData) return true;

  if (userStatus === 'rejected') return false;

  return false;
};
