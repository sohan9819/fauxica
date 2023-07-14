import { cloneElement } from 'react';
import { useRoutes, useLocation, Navigate } from 'react-router-dom';
import {
  Home,
  Products,
  Wishlist,
  Cart,
  Order,
  OrderId,
  Profile,
  Error404,
  Auth,
} from '../pages';
import { AnimatePresence } from 'framer-motion';
import { useAuthContext } from '../context';

const Router = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  const router = useRoutes([
    {
      path: '/',
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'products',
          element: <Products />,
        },
        {
          path: 'wishlist',
          element: user ? <Wishlist /> : <Navigate to={'/auth'} />,
        },
        {
          path: 'cart',
          element: user ? <Cart /> : <Navigate to={'/auth'} />,
        },
        {
          path: 'order',
          children: [
            {
              index: true,
              element: user ? <Order /> : <Navigate to={'/auth'} />,
            },
            {
              path: ':orderId',
              element: user ? <OrderId /> : <Navigate to={'/auth'} />,
            },
          ],
        },
        {
          path: 'profile',
          element: user ? <Profile /> : <Navigate to={'/auth'} />,
        },
        {
          path: 'auth',
          element: user ? <Profile /> : <Auth />,
        },
        {
          path: '*',
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
