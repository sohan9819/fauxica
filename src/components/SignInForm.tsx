import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { signInAuthUserWithEmailAndPassword } from '../utils/firebase/firebase.utils';
import { FirebaseError } from 'firebase/app';

type FormInputs = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
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
      console.log(user);
    } catch (error) {
      const e = error as FirebaseError;
      setAuthLoading(false);
      e.code === 'auth/wrong-password'
        ? setAuthError('Incorrect password')
        : setAuthError(e.message);
    }
    setAuthLoading(false);
    reset();
  };

  return (
    <>
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
        <button className='auth__btn' type='submit' role='button'>
          SignIn
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default SignInForm;
