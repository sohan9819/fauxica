import { cloneElement, Suspense, lazy } from 'react';
import { useRoutes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuthContext } from '../context';
import { SuspenseLoader } from '../components';

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
            <Suspense fallback={<SuspenseLoader />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: 'products',
          element: <Products />,
        },
        {
          path: 'wishlist',
          element: user ? (
            <Suspense fallback={<SuspenseLoader />}>
              <Wishlist />
            </Suspense>
          ) : (
            <Navigate to={'/auth'} />
          ),
        },
        {
          path: 'cart',
          element: user ? (
            <Suspense fallback={<SuspenseLoader />}>
              <Cart />
            </Suspense>
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
                <Suspense fallback={<SuspenseLoader />}>
                  <Order />
                </Suspense>
              ) : (
                <Navigate to={'/auth'} />
              ),
            },
            {
              path: ':orderId',
              element: user ? (
                <Suspense fallback={<SuspenseLoader />}>
                  <OrderId />
                </Suspense>
              ) : (
                <Navigate to={'/auth'} />
              ),
            },
          ],
        },
        {
          path: 'profile',
          element: user ? (
            <Suspense fallback={<SuspenseLoader />}>
              <Profile />
            </Suspense>
          ) : (
            <Navigate to={'/auth'} />
          ),
        },
        {
          path: 'auth',
          element: user ? (
            <Suspense fallback={<SuspenseLoader />}>
              <Profile />
            </Suspense>
          ) : (
            <Auth />
          ),
        },
        {
          path: '*',
          element: (
            <Suspense fallback={<SuspenseLoader />}>
              <Error404 />
            </Suspense>
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
