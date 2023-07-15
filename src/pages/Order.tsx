import { useNavigate } from 'react-router-dom';
import { useOrderContext } from '../context';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { timeAgo } from '../utils/timeAgo/timeAgo.utils';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, textVariant_1 } from '../utils/motion';
import { Transition } from '../components';

const Order = () => {
  const { orders } = useOrderContext();
  const navigate = useNavigate();

  return (
    <>
      <motion.div
        className='section'
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: false, amount: 0.25 }}
      >
        <motion.h1 className='section__title' variants={textVariant_1(0.1)}>
          Orders
        </motion.h1>
        <motion.ul className='orders__container' variants={fadeIn(0.1)}>
          {orders &&
            orders?.map((order, index) => (
              <motion.li
                key={index}
                className='orders__card'
                variants={textVariant_1((index + 1) * 0.1)}
              >
                <div className='orders__card__header'>
                  <p className='orders__card-grayText'>
                    {timeAgo(order.orderDate)}
                  </p>
                </div>
                <div className='orders__card__body'>
                  <p className='orders__card__body__total'>
                    <span className='orders__card__body__total-text'>
                      Total :{' '}
                    </span>
                    {order.total.toLocaleString('hi-IN', {
                      style: 'currency',
                      currency: 'INR',
                    })}
                  </p>
                  <div className='orders__card__body__products'>
                    {order.products.length > 4
                      ? order.products
                          .slice(0, 4)
                          .map((product, index) => (
                            <img
                              key={index}
                              src={product.imageUrl}
                              alt='product image'
                              className='orders__card__body__products-image'
                            />
                          ))
                      : order.products.map((product, index) => (
                          <img
                            key={index}
                            src={product.imageUrl}
                            alt='product image'
                            className='orders__card__body__products-image'
                          />
                        ))}
                  </div>
                </div>
                <div className='orders__card__footer'>
                  <button
                    className='orders__card__footer-button check'
                    onClick={() => {
                      navigate(`/order/${order.uid}`);
                    }}
                  >
                    Check
                  </button>
                </div>
              </motion.li>
            ))}
        </motion.ul>
        {orders && orders.length > 0 ? (
          ''
        ) : (
          <p className='section__empty'>
            You have no orders yet ☹️ <br />
            <Link to={'/products'} className='section__empty-cta'>
              <span>Browse our collection</span>
              <FiArrowRight className='section__empty-cta-icon' />
            </Link>
          </p>
        )}
      </motion.div>
      <Transition />
    </>
  );
};

export default Order;
