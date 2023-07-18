import { cloneElement, lazy } from 'react';
import { useRoutes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuthContext } from '../context';
import { PageLoader } from '../components';

const Home = lazy(() =>
  import('../pages').then((module) => ({ default: module.Home }))
);
const Products = lazy(() =>
  import('../pages').then((module) => ({ default: module.Products }))
);
const Wishlist = lazy(() =>
  import('../pages').then((module) => ({ default: module.Wishlist }))
);
const Cart = lazy(() =>
  import('../pages').then((module) => ({ default: module.Cart }))
);
const Profile = lazy(() =>
  import('../pages').then((module) => ({ default: module.Profile }))
);
const Order = lazy(() =>
  import('../pages').then((module) => ({ default: module.Order }))
);
const OrderId = lazy(() =>
  import('../pages').then((module) => ({ default: module.OrderId }))
);
const Auth = lazy(() =>
  import('../pages').then((module) => ({ default: module.Auth }))
);
const Error404 = lazy(() =>
  import('../pages').then((module) => ({ default: module.Error404 }))
);

const Router = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  const router = useRoutes([
    {
      path: '/',
      children: [
        {
          index: true,
          element: (
            <PageLoader>
              <Home />
            </PageLoader>
          ),
        },
        {
          path: 'products',
          element: (
            <PageLoader>
              <Products />
            </PageLoader>
          ),
        },
        {
          path: 'wishlist',
          element: user ? (
            <PageLoader>
              <Wishlist />
            </PageLoader>
          ) : (
            <Navigate to={'/auth'} />
          ),
        },
        {
          path: 'cart',
          element: user ? (
            <PageLoader>
              <Cart />
            </PageLoader>
          ) : (
            <Navigate to={'/auth'} />
          ),
        },
        {
          path: 'order',
          children: [
            {
              index: true,
              element: user ? (
                <PageLoader>
                  <Order />
                </PageLoader>
              ) : (
                <Navigate to={'/auth'} />
              ),
            },
            {
              path: ':orderId',
              element: user ? (
                <PageLoader>
                  <OrderId />
                </PageLoader>
              ) : (
                <Navigate to={'/auth'} />
              ),
            },
          ],
        },
        {
          path: 'profile',
          element: user ? (
            <PageLoader>
              <Profile />
            </PageLoader>
          ) : (
            <Navigate to={'/auth'} />
          ),
        },
        {
          path: 'auth',
          element: <PageLoader>{user ? <Profile /> : <Auth />}</PageLoader>,
        },
        {
          path: '*',
          element: (
            <PageLoader>
              <Error404 />
            </PageLoader>
          ),
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
