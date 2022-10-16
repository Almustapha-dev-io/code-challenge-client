import { useContext } from 'react';
import { AuthContext } from '../context/auth';

const useIsAuth = () => {
  const { currentToken, currentUser } = useContext(AuthContext);

  if (!currentToken || !currentUser) return false;
  return true;
};

export default useIsAuth;
