import { Transition } from '.';
import Ghost from '../assets/ghost-img.png';

type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <>
      <main role='alert' className='section'>
        <h1 className='section__title'>Error </h1>
        <p className='section__empty'>
          Something went wrong :
          <pre className='section__pre'>{error.message}</pre>
        </p>
        <button onClick={resetErrorBoundary} className='section__btn'>
          Try again
        </button>
        <img src={Ghost} alt='ghost image' className='section__img' />
      </main>
      <Transition />
    </>
  );
};

export default ErrorFallback;
