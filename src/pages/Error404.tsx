import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Ghost from '../assets/ghost-img.png';

const Error404 = () => {
  return (
    <main className='cart section'>
      <h1 className='section__title'>Error 404</h1>
      <p className='section__empty'>
        <strong>Hey buddy ,</strong> We can't seem to find the page you are
        looking for ☹️ <br />
        <Link to={'/'} className='section__empty-cta'>
          <span>Go to Home</span>
          <FiArrowRight className='section__empty-cta-icon' />
        </Link>
      </p>
      <img src={Ghost} alt='ghost image' className='section__img' />
    </main>
  );
};

export default Error404;
