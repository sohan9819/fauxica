import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signInAuthUserWithEmailAndPassword } from '../utils/firebase/firebase.utils';
import { FirebaseError } from 'firebase/app';
import toast from 'react-hot-toast';

type FormInputs = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const onSubmitHandler: SubmitHandler<FormInputs> = async ({
    email,
    password,
  }) => {
    setAuthLoading(true);
    try {
      const { user } = await signInAuthUserWithEmailAndPassword({
        email,
        password,
      });
      toast.success(`Welcome to fauxica, ${user?.displayName} 🥳🥳🥳`);
    } catch (error) {
      const e = error as FirebaseError;
      reset();
      setAuthLoading(false);
      switch (e.code) {
        case 'auth/wrong-password':
          setAuthError('Incorrect password');
          break;

        case 'auth/user-not-found':
          setAuthError('No user associated with this email');
          break;

        case 'auth/too-many-requests':
          setAuthError(
            'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
          );
          break;

        default:
          setAuthError(e.message);
          break;
      }
    }
  };

  return (
    <form
      className='auth__form'
      onSubmit={handleSubmit(onSubmitHandler)}
      noValidate
      onChange={() => setAuthError('')}
    >
      <h2>SignIn</h2>

      {authLoading && <p className='auth__form-loading'>Authenticating...</p>}
      {authError !== '' && (
        <p className='auth__form-error auth-error'>{authError}</p>
      )}

      <label className='auth__email' htmlFor='email'>
        Email &nbsp;<span className='auth__required'>*</span>
        <input
          className='auth__email-input'
          type='email'
          id='email'
          placeholder='Email'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          })}
        />
        <p className='auth__form-error'>{errors.email?.message}</p>
      </label>
      <label className='auth__password' htmlFor='password'>
        Password &nbsp;<span className='auth__required'>*</span>
        <input
          className='auth__password-input'
          type='password'
          id='password'
          placeholder='Password'
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password length should be at least 6 characters',
            },
            maxLength: {
              value: 12,
              message: 'Password cannot exceed more than 12 characters',
            },
          })}
        />
        <p className='auth__form-error'>{errors.password?.message}</p>
      </label>
      <button
        className='auth__btn'
        type='submit'
        role='button'
        disabled={authLoading ? true : authError !== '' ? true : false}
      >
        SignIn
      </button>
    </form>
  );
};

export default SignInForm;
