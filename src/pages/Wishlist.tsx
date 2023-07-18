import { FiArrowRight } from 'react-icons/fi';
import { ProductCard } from '../components';
import { Link } from 'react-router-dom';
import { useWishContext } from '../context';
import { motion } from 'framer-motion';
import { staggerContainer, textVariant_1 } from '../utils/motion';

const Wishlist = () => {
  const { wishProducts } = useWishContext();

  return (
    <motion.main
      className='wishlist section'
      variants={staggerContainer()}
      initial='hidden'
      animate='show'
    >
      <motion.h1 className='section__title' variants={textVariant_1(0.1)}>
        Wishlist 💖
      </motion.h1>
      {wishProducts.length === 0 ? (
        <motion.p className='section__empty' variants={textVariant_1(0.2)}>
          Your wishlist is empty ☹️ <br />
          <Link to={'/products'} className='section__empty-cta'>
            <span>Browse our collection</span>
            <FiArrowRight className='section__empty-cta-icon' />
          </Link>
        </motion.p>
      ) : (
        <motion.div
          className='wishlist__container'
          variants={textVariant_1(0.2)}
        >
          {wishProducts.map((product) => (
            <ProductCard variant='wish' product={product} key={product.id} />
          ))}
        </motion.div>
      )}
    </motion.main>
  );
};

export default Wishlist;
