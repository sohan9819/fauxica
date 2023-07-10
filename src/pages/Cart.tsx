import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { ProductCard, Transition, CartBill } from '../components';
import { useCartContext } from '../context';

const Cart = () => {
  const { cartProducts } = useCartContext();

  return (
    <>
      <main className='cart section'>
        <h1 className='section__title'>Cart 🛒</h1>
        {cartProducts.length == 0 ? (
          <p className='section__empty'>
            Your cart is empty ☹️ <br />
            <Link to={'/products'} className='section__empty-cta'>
              <span>Browse our collection</span>
              <FiArrowRight className='section__empty-cta-icon' />
            </Link>
          </p>
        ) : (
          <>
            {' '}
            <CartBill />
            <div className='cart__container'>
              {cartProducts.map((product) => (
                <ProductCard
                  variant='cart'
                  product={product}
                  key={product.id}
                />
              ))}
            </div>
          </>
        )}
      </main>
      <Transition />
    </>
  );
};

export default Cart;
