import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { TUser } from '../types/user';

type TAuthContext = {
  currentUser: TUser | null;
  currentToken: string;
  setData(user: TUser | null, token: string): void;
  setCurrentUser(user: TUser | null): void;
  setCurrentToken(token: string): void;
};

export const AuthContext = createContext<TAuthContext>({
  currentUser: null,
  currentToken: '',
  setData() {},
  setCurrentToken() {},
  setCurrentUser() {},
});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [{ user, token }, setUserData] = useState<{
    user: TUser | null;
    token: string;
  }>({
    user: null,
    token: '',
  });

  const setData = useCallback((user: TUser | null, token: string) => {
    setUserData(() => ({ token, user }));
  }, []);

  const setCurrentUser = useCallback((user: TUser | null) => {
    setUserData((data) => ({ ...data, user }));
  }, []);

  const setCurrentToken = useCallback((token: string) => {
    setUserData((data) => ({ ...data, token }));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentToken: token,
        currentUser: user,
        setCurrentToken,
        setCurrentUser,
        setData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
