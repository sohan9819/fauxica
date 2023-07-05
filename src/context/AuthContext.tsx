import { useState, useEffect, createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChangedHandler } from '../utils/firebase/firebase.utils';

type AuthContextProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext({} as AuthContextProps);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChangedHandler((user) => {
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
