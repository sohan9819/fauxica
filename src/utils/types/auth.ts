import { User } from 'firebase/auth';

type AuthUser = {
  email: string;
  password: string;
};

type updateUserProfileProps = {
  displayName?: string;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

type AuthStateChangeCallback = (user: User | null) => void;

export type { AuthUser, AuthStateChangeCallback, updateUserProfileProps };
