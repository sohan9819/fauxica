import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Transition from '../utils/motion';

const Profile = () => {
  return (
    <>
      <main className='section'>
        <h1 className='section__title'>Profile🤠 </h1>
        <p className='section__empty'>
          You need to Login to view your profile ☹️ <br />
          <Link to={'/auth'} className='section__empty-cta'>
            <span>SiginIn</span>
            <FiArrowRight className='section__empty-cta-icon' />
          </Link>
        </p>
      </main>
      <Transition />
    </>
  );
};

export default Profile;
