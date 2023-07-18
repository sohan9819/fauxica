import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { navVariants } from '../utils/motion';
import Logo from '../assets/logo.svg';
import { useAuthContext } from '../context';

const Navbar = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    document.addEventListener('click', () => {
      setIsNavActive(isNavActive ? !isNavActive : isNavActive);
    });
  }, [isNavActive]);

  return (
    <motion.header
      className='header'
      variants={navVariants}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
    >
      <Link to={'/'} className='logo'>
        <img src={Logo} alt='Fauxica Logo' className='logo__image' />
      </Link>
      <nav
        className='nav'
        onClick={(e) => {
          setIsNavActive(!isNavActive);
          e.stopPropagation();
        }}
      >
        <ul className={`nav__links ${isNavActive ? 'active' : ''}`}>
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
          {user ? (
            <li className='nav__link'>
              <NavLink className='link' to={'/profile'}>
                Profile
              </NavLink>
            </li>
          ) : (
            <li className='nav__link'>
              <NavLink className='link' to={'/auth'}>
                Login
              </NavLink>
            </li>
          )}
        </ul>

        <div
          className={`nav__hamburger ${isNavActive ? 'active' : ''}`}
          onClick={() => {
            setIsNavActive(!isNavActive);
          }}
        >
          <div className='nav__hamburger-line line1'></div>
          <div className='nav__hamburger-line line2'></div>
          <div className='nav__hamburger-line line3'></div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
