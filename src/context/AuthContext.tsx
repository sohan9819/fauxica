import { useState, useEffect, createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChangedHandler } from '../utils/firebase/firebase.utils';
import { AuthContextProps, AuthContextProviderProps } from '../utils/types';

const AuthContext = createContext({} as AuthContextProps);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChangedHandler(async (user) => {
      setUser(user);
    });

    return unSubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContextProvider, useAuthContext };
