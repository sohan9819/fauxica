import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from '../utils/firebase/firebase.utils';
import { FirebaseError } from 'firebase/app';
import toast from 'react-hot-toast';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const signUpFormSchema = z
  .object({
    displayName: z.string().min(3, 'Username should be at least 3 characters'),
    email: z.string().email(),
    password: z
      .string()
      .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
      .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
      .regex(new RegExp('.*\\d.*'), 'One number')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        'One special character'
      )
      .min(8, 'Must be at least 8 characters in length')
      .max(12, 'Must be within characters in length'),
    confirmPassword: z.string(),
    terms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Your passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.terms === true, {
    message: 'You must agree to the terms and conditions',
    path: ['terms'],
  });

type SignUpFormSchema = z.infer<typeof signUpFormSchema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
  });

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<SignUpFormSchema> = async ({
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
      navigate(-1);
      user.reload();
      toast.dismiss();
      toast.success(`Welcome to fauxica, ${user?.displayName} 🥳🥳🥳`);
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
