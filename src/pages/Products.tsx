import { ProductCard, Transition, Filters } from '../components';
import { useProductContext } from '../context';
import { motion } from 'framer-motion';
import { staggerContainer, textVariant_1 } from '../utils/motion';

const Products = () => {
  const { products } = useProductContext();

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
