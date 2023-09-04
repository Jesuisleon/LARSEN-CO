import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'hooks/useAuthContext';
import axios from 'axios';

export const useLogin = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/auth/login', {  email, password })
      const user = response.data

      localStorage.setItem('user', JSON.stringify(user));

      dispatch({ type: 'LOGIN', payload: user });

      if (user.isAdmin) {
        dispatch({ type: 'SET_ADMIN', payload: true });
        navigate('/admin');
      } else {
        navigate(`/salesman/${user.id}`);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  }

  return { login, error, isLoading };
}
