import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from '../utils/firebase/firebase.utils';
import { updateProfile } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

type FormInputs = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({});

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const onSubmitHandler: SubmitHandler<FormInputs> = async ({
    displayName,
    email,
    password,
  }) => {
    setAuthLoading(true);
    try {
      const { user } = await createAuthUserWithEmailAndPassword({
        email,
        password,
      });
      await updateProfile(user, { displayName });
      await createUserDocFromAuth({ ...user, displayName });
    } catch (error) {
      const e = error as FirebaseError;
      reset();
      setAuthLoading(false);
      e.code === 'auth/email-already-in-use'
        ? setAuthError('User with same email already exists')
        : setAuthError(e.message);
    }
  };

  return (
    <form
      className='auth__form'
      onSubmit={handleSubmit(onSubmitHandler)}
      noValidate
      onChange={() => setAuthError('')}
    >
      <h2>SignUp</h2>

      {authLoading && <p className='auth__form-loading'>Authenticating...</p>}
      {authError !== '' && (
        <p className='auth__form-error auth-error'>{authError}</p>
      )}

      <label className='auth__username' htmlFor='username'>
        Username &nbsp;<span className='auth__required'>*</span>
        <input
          className='auth__username-input'
          type='text'
          id='username'
          placeholder='Username'
          {...register('displayName', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username should be at least 3 characters',
            },
            disabled: authLoading,
          })}
        />
        <p className='auth__form-error'>{errors.displayName?.message}</p>
      </label>
      <label className='auth__email' htmlFor='email'>
        Email &nbsp;<span className='auth__required'>*</span>
        <input
          className='auth__email-input'
          type='email'
          id='email'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
            disabled: authLoading,
          })}
          placeholder='Email'
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
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,12}$/,
              message:
                'Your password must contain at least one uppercase, one lowercase, one number and one special character',
            },
            disabled: authLoading,
          })}
        />
        <p className='auth__form-error'>{errors.password?.message}</p>
      </label>
      <label className='auth__confPassword' htmlFor='confPassword'>
        Confirm Password &nbsp;<span className='auth__required'>*</span>
        <input
          className='auth__confPassword-input'
          type='password'
          id='confPassword '
          placeholder='Confirm Password'
          {...register('confirmPassword', {
            required: 'Please confirm password',
            validate: (val: string) =>
              watch('password') !== val ? 'Your passwords do not match' : true,
            disabled: authLoading,
          })}
        />
        <p className='auth__form-error'>{errors.confirmPassword?.message}</p>
      </label>
      <label className='auth__terms' htmlFor='terms'>
        <input
          className='auth__terms-input'
          type='checkbox'
          {...register('terms', {
            required: 'You need to agree all terms and condition',
            disabled: authLoading,
          })}
          id='terms'
        />
        I accept all terms & conditions
        <span className='auth__required'>*</span>
        <p className='auth__form-error'>{errors.terms?.message}</p>
      </label>

      <button
        className='auth__btn'
        type='submit'
        role='button'
        disabled={authLoading ? true : authError !== '' ? true : false}
      >
        SignUp
      </button>
    </form>
  );
};

export default SignUpForm;
