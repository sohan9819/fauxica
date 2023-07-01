import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { navVariants } from '../utils/motion';
import Logo from '../assets/logo.svg';

const Navbar = () => {
  return (
    <motion.header
      className='header'
      variants={navVariants}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
    >
      <div className='logo'>
        <img src={Logo} alt='Fauxica Logo' className='logo__image' />
      </div>
      <nav className='nav'>
        <ul className='nav__links'>
          <li className='nav__link'>
            <NavLink className='link' to={'/'}>
              Home
            </NavLink>
          </li>
          <li className='nav__link'>
            <NavLink className='link' to={'/products'}>
              Products
            </NavLink>
          </li>
          <li className='nav__link'>
            <NavLink className='link' to={'/wishlist'}>
              Wishlist
            </NavLink>
          </li>
          <li className='nav__link'>
            <NavLink className='link' to={'/cart'}>
              Cart
            </NavLink>
          </li>
          <li className='nav__link'>
            <NavLink className='link' to={'/profile'}>
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* <div className='hamburger'>
        <div></div>
        <div></div>
        <div></div>
      </div> */}
    </motion.header>
  );
};

export default Navbar;
