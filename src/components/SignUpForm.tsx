const SignUpForm = () => {
  return (
    <form className='auth__form'>
      <h2>SignUp</h2>
      <label className='auth__username' htmlFor='username'>
        Username &nbsp;<span className='auth__required'>*</span>
        <input
          className='auth__username-input'
          type='text'
          id='username'
          name='username'
          placeholder='Username'
          required
        />
      </label>
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
      <label className='auth__confPassword' htmlFor='confPassword'>
        Confirm Password &nbsp;<span className='auth__required'>*</span>
        <input
          className='auth__confPassword-input'
          type='password'
          id='confPassword '
          name='confPassword'
          placeholder='Confirm Password'
          required
        />
      </label>
      <label className='auth__terms' htmlFor='terms'>
        <input
          className='auth__terms-input'
          type='checkbox'
          name='terms'
          id='terms'
          required
        />
        I accept all terms & conditions
        <span className='auth__required'>*</span>
      </label>

      <button className='auth__btn' type='submit' role='button'>
        SignUp
      </button>
    </form>
  );
};

export default SignUpForm;
