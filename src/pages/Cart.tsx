import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { ProductCard, CartBill } from '../components';
import { useCartContext } from '../context';
import { motion } from 'framer-motion';
import { staggerContainer, textVariant_1 } from '../utils/motion';

const Cart = () => {
  const { cartProducts } = useCartContext();

  return (
    <motion.main
      className='cart section'
      variants={staggerContainer()}
      initial='hidden'
      animate='show'
    >
      <motion.h1 className='section__title' variants={textVariant_1(0.1)}>
        Cart 🛒
      </motion.h1>
      {cartProducts.length == 0 ? (
        <motion.p className='section__empty' variants={textVariant_1(0.2)}>
          Your cart is empty ☹️ <br />
          <Link to={'/products'} className='section__empty-cta'>
            <span>Browse our collection</span>
            <FiArrowRight className='section__empty-cta-icon' />
          </Link>
        </motion.p>
      ) : (
        <>
          {' '}
          <CartBill />
          <motion.div className='cart__container' variants={textVariant_1(0.2)}>
            {cartProducts.map((product) => (
              <ProductCard variant='cart' product={product} key={product.id} />
            ))}
          </motion.div>
        </>
      )}
    </motion.main>
  );
};

export default Cart;
