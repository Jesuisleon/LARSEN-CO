import { useAuthContext } from 'hooks/useAuthContext';
import axios from 'axios';

export const useLogout = () => {

  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      await axios.get('/api/auth/logout');

      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
    }
    catch (error) {
      console.error(error);
    }
  }

  return { logout };
}