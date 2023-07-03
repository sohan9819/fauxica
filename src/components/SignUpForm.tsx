import { useForm, SubmitHandler } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

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
    control,
    reset,
  } = useForm<FormInputs>();

  const onSubmitHandler: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <>
      <form
        className='auth__form'
        onSubmit={handleSubmit(onSubmitHandler)}
        noValidate
      >
        <h2>SignUp</h2>
        <label className='auth__username' htmlFor='username'>
          Username &nbsp;<span className='auth__required'>*</span>
          <input
            className='auth__username-input'
            type='text'
            id='username'
            {...register('displayName', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username should be at least 3 characters',
              },
            })}
            placeholder='Username'
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
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                message:
                  'Your password must contain at least one uppercase, one lowercase, and one number',
              },
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
                watch('password') !== val
                  ? 'Your passwords do not match'
                  : true,
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
            })}
            id='terms'
          />
          I accept all terms & conditions
          <span className='auth__required'>*</span>
          <p className='auth__form-error'>{errors.terms?.message}</p>
        </label>

        <button className='auth__btn' type='submit' role='button'>
          SignUp
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default SignUpForm;
