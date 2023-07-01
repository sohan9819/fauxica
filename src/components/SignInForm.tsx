const SignInForm = () => {
  return (
    <form className='auth__form'>
      <h2>SignIn</h2>
      <label className='auth__email' htmlFor='email'>
        Email &nbsp;<span className='auth__required'>*</span>
        <input
          className='auth__email-input'
          type='email'
          id='email'
          name='email'
          placeholder='Email'
          required
        />
      </label>
      <label className='auth__password' htmlFor='password'>
        Password &nbsp;<span className='auth__required'>*</span>
        <input
          className='auth__password-input'
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          required
        />
      </label>
      <button className='auth__btn' type='submit' role='button'>
        SignIn
      </button>
    </form>
  );
};

export default SignInForm;
