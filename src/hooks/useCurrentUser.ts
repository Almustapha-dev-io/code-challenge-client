import { useContext } from 'react';
import { AuthContext } from '../context/auth';

const useCurrentUser = () => {
  const { currentUser } = useContext(AuthContext);
  return currentUser;
};

export default useCurrentUser;
