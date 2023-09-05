import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'hooks/useAuthContext';

export const useAlreadyLog = () => {
  const navigate = useNavigate();
  const { user, admin } = useAuthContext();

  useEffect(() => {
    if (admin) {
      navigate('/admin');
    } else if (user) {
      navigate(`/salesman/${user.id}`);
    }
  }, [user]);
}
