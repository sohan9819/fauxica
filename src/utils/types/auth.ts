import { User } from 'firebase/auth';

type AuthUser = {
  email: string;
  password: string;
};

type AuthStateChangeCallback = (user: User | null) => void;

export type { AuthUser, AuthStateChangeCallback };
