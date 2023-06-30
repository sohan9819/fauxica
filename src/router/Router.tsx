import { useRoutes, useLocation } from 'react-router-dom';
import {
  Home,
  Products,
  Wishlist,
  Cart,
  Profile,
  Error404,
  Auth,
} from '../pages';
import { cloneElement } from 'react';
import { AnimatePresence } from 'framer-motion';

const Router = () => {
  const location = useLocation();
  const router = useRoutes([
    {
      path: '/',
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/products',
          element: <Products />,
        },
        {
          path: '/wishlist',
          element: <Wishlist />,
        },
        {
          path: '/cart',
          element: <Cart />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/auth',
          element: <Auth />,
        },
        {
          path: '/*',
          element: <Error404 />,
        },
      ],
    },
  ]);

  return (
    <AnimatePresence mode='wait'>
      {router && cloneElement(router, { key: location.pathname })}
    </AnimatePresence>
  );
};

export default Router;
