import { ProductCard, Transition, Filters } from '../components';
import { useProductContext } from '../context';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, textVariant_1 } from '../utils/motion';

const Products = () => {
  const { products, status } = useProductContext();

  return (
    <>
      <motion.main
        className='product'
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: false, amount: 0.25 }}
      >
        <Filters />
        {status === 'loading' && (
          <motion.h1 variants={fadeIn(0.1)} initial='hidden' animate='show'>
            Loading...
          </motion.h1>
        )}
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
              <ProductCard product={product} key={product.id} />
            ))}
        </motion.div>
      </motion.main>
      <Transition />
    </>
  );
};

export default Products;
