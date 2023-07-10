import { User } from 'firebase/auth';

type AuthUser = {
  email: string;
  password: string;
};

type AuthStateChangeCallback = (user: User | null) => void;

type AuthContextProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export type {
  AuthUser,
  AuthStateChangeCallback,
  AuthContextProps,
  AuthContextProviderProps,
};
