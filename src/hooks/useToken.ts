import { useContext } from 'react';
import { AuthContext } from '../context/auth';

const useToken = () => {
  const { currentToken } = useContext(AuthContext);
  return currentToken;
};

export default useToken;
