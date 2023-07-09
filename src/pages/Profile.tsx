import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { Transition } from '../components';
import { useAuthContext, useWishContext, useCartContext } from '../context';
import { FirebaseError } from 'firebase/app';
import { signOutUser, deleteUser } from '../utils/firebase/firebase.utils';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuthContext();
  const { cartProducts } = useCartContext();
  const { wishProducts } = useWishContext();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    if (window.confirm('Are you sure you want to signOut?')) {
      try {
        await signOutUser();
      } catch (error) {
        toast.error((error as FirebaseError).message);
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        user && (await deleteUser(user));
      } catch (error) {
        const e = error as FirebaseError;

        switch (e.code) {
          case 'auth/requires-recent-login':
            toast.error(
              'To delete your account you need a recent login , please logout and login again'
            );
            break;

          default:
            toast.error(e.message);
            break;
        }
      }
    }
  };

  return (
    <>
      <main className='section'>
        <h1 className='section__title'>Profile🤠 </h1>
        {user ? (
          <div className='profile'>
            <div className='profile__user'>
              <p className='profile__user__name'>
                <span className='profile__user__label'>Name</span>
                <span className='profile__user__text'>{user.displayName}</span>
              </p>
              <p className='profile__user__email'>
                <span className='profile__user__label'>Email</span>
                <span className='profile__user__text'>{user.email}</span>
              </p>
              <div className='profile__user__btns'>
                <button
                  className='profile__user__btns-btn'
                  onClick={handleSignOut}
                >
                  SignOut
                </button>
                <button
                  className='profile__user__btns-btn'
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </button>
              </div>
            </div>
            <div className='profile__summary'>
              <div className='profile__summary__cart'>
                <p className='profile__summary__cart-label'>Cart Items 🛒</p>
                <strong className='profile__summary__cart-number'>
                  {cartProducts.length}
                </strong>
                <button
                  className='profile__summary__cart-btn'
                  disabled={cartProducts.length <= 0}
                  onClick={() => {
                    navigate('/cart');
                  }}
                >
                  Check now
                </button>
              </div>
              <div className='profile__summary__wish'>
                <p className='profile__summary__wish-label'>Wish Items 💖</p>
                <strong className='profile__summary__wish-number'>
                  {wishProducts.length}
                </strong>
                <button
                  className='profile__summary__wish-btn'
                  disabled={wishProducts.length <= 0}
                  onClick={() => {
                    navigate('/wishlist');
                  }}
                >
                  Check now
                </button>
              </div>
              <div className='profile__summary__order'>
                <p className='profile__summary__order-label'>
                  Total Orders 📦{' '}
                </p>
                <strong className='profile__summary__order-number'>0</strong>
                <button className='profile__summary__order-btn'>
                  Check now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className='section__empty'>
            You need to Login to view your profile ☹️ <br />
            <Link to={'/auth'} className='section__empty-cta'>
              <span>SiginIn</span>
              <FiArrowRight className='section__empty-cta-icon' />
            </Link>
          </p>
        )}
      </main>
      <Transition />
    </>
  );
};

export default Profile;
