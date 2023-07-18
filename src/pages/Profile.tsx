import { useNavigate } from 'react-router-dom';
import {
  useAuthContext,
  useWishContext,
  useCartContext,
  useOrderContext,
} from '../context';
import { FirebaseError } from 'firebase/app';
import { signOutUser, deleteUser } from '../utils/firebase/firebase.utils';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  staggerContainer,
  fadeIn,
  textVariant_1,
  popOut_1,
} from '../utils/motion';

const Profile = () => {
  const { user } = useAuthContext();
  const { cartProducts } = useCartContext();
  const { wishProducts } = useWishContext();
  const { orders } = useOrderContext();

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
    <motion.main
      className='section'
      variants={staggerContainer()}
      initial='hidden'
      animate='show'
    >
      <motion.h1 className='section__title' variants={textVariant_1(0.1)}>
        Profile🤠{' '}
      </motion.h1>
      <motion.div className='profile' variants={fadeIn(0.2)}>
        <div className='profile__user'>
          {user?.displayName ? (
            <>
              <motion.p
                className='profile__user__info'
                variants={textVariant_1(0.2)}
              >
                <span className='profile__user__label'>Name</span>
                <span className='profile__user__text'>{user.displayName}</span>
              </motion.p>
              <motion.p
                className='profile__user__info'
                variants={textVariant_1(0.3)}
              >
                <span className='profile__user__label'>Email</span>
                <span className='profile__user__text'>{user.email}</span>
              </motion.p>
              <motion.div
                className='profile__user__btns'
                variants={fadeIn(0.4)}
              >
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
              </motion.div>
            </>
          ) : (
            <p className='profile__loading'>Loading info...</p>
          )}
        </div>
        <div className='profile__summary'>
          <motion.div
            className='profile__summary__cart'
            variants={popOut_1(0.4)}
          >
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
          </motion.div>
          <motion.div
            className='profile__summary__wish'
            variants={popOut_1(0.5)}
          >
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
          </motion.div>
          <motion.div
            className='profile__summary__order'
            variants={popOut_1(0.6)}
          >
            <p className='profile__summary__order-label'>Total Orders 📦 </p>
            <strong className='profile__summary__order-number'>
              {orders ? orders.length : 0}
            </strong>
            <button
              className='profile__summary__order-btn'
              disabled={orders && orders.length <= 0 ? true : false}
              onClick={() => {
                navigate('/order');
              }}
            >
              Check now
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.main>
  );
};

export default Profile;
