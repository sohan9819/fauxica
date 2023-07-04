import { useState } from 'react';
import { Transition, SignInForm, SignUpForm } from '../components';
import { FcGoogle } from 'react-icons/fc';
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
} from '../utils/firebase/firebase.utils';

type AuthOption = 'SignIn' | 'SignUp';

const Auth = () => {
  const [authOption, setAuthOption] = useState<AuthOption>('SignIn');

  const authGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocFromAuth(user);
  };

  return (
    <>
      <main className='auth section'>
        <h1 className='section__title'>
          Welcome , <br /> get authenticated and start shopping 🛍️
        </h1>
        <section className='auth__container'>
          <div className='auth__social'>
            <button className='auth__social-btn' onClick={authGoogleUser}>
              <FcGoogle className='auth__social-icon' />
            </button>
          </div>
          {authOption === 'SignIn' && <SignInForm />}
          {authOption === 'SignUp' && <SignUpForm />}
          {authOption === 'SignIn' && (
            <p className='auth__option'>
              Don't have an account ?{' '}
              <button
                className='auth__option-text'
                onClick={() => {
                  setAuthOption('SignUp');
                }}
              >
                SignUp
              </button>
            </p>
          )}
          {authOption === 'SignUp' && (
            <p className='auth__option'>
              Alredy have an account ?{' '}
              <button
                className='auth__option-text'
                onClick={() => {
                  setAuthOption('SignIn');
                }}
              >
                SignIn
              </button>
            </p>
          )}
        </section>
      </main>
      <Transition />
    </>
  );
};

export default Auth;
