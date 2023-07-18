import { lazy, Suspense } from 'react';
import { useProductContext } from '../context';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, textVariant_1 } from '../utils/motion';
import { SwishSpinner } from 'react-spinners-kit';
import { SuspenseLoader } from '../components';

const ProductCard = lazy(() =>
  import('../components').then((module) => ({ default: module.ProductCard }))
);

const Filters = lazy(() =>
  import('../components').then((module) => ({ default: module.Filters }))
);

const Products = () => {
  const { products, status } = useProductContext();

  return (
    <motion.main
      className='product'
      variants={staggerContainer()}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.25 }}
    >
      <Suspense fallback={<SuspenseLoader />}>
        <Filters />
      </Suspense>
      {status === 'noProducts' && (
        <motion.h1 variants={fadeIn(0)} initial='hidden' animate='show'>
          No products found ☹️
        </motion.h1>
      )}
      <motion.div
        layout
        className='product__container'
        variants={textVariant_1(0.3)}
        initial='hidden'
        whileInView='show'
      >
        {products &&
          products.map((product) => (
            <Suspense
              fallback={
                <div className='product__card-loader'>
                  <SwishSpinner />
                </div>
              }
              key={product.id}
            >
              <ProductCard product={product} />
            </Suspense>
          ))}
      </motion.div>
    </motion.main>
  );
};

export default Products;
