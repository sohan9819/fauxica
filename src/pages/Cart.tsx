import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { Transition, ProductCard } from '../components';

const Cart = () => {
  return (
    <>
      <main className='cart section'>
        <h1 className='section__title'>Cart 🛒</h1>
        <p className='section__empty'>
          Your cart is empty ☹️ <br />
          <Link to={'/products'} className='section__empty-cta'>
            <span>Browse our collection</span>
            <FiArrowRight className='section__empty-cta-icon' />
          </Link>
        </p>
        <table className='cart__bill'>
          <thead className='cart__bill__heading'>
            <tr>
              <th colSpan={2} className='cart__bill__heading-text'>
                Price details
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='cart__bill__price'>
              <td className='cart__bill__price-text'>Price(1 item)</td>
              <td className='cart__bill__price-number'>$44</td>
            </tr>
            <tr className='cart__bill__discount'>
              <td className='cart__bill__discount-text'>Discount</td>
              <td className='cart__bill__discount-number'>-$44</td>
            </tr>
            <tr className='cart__bill__delivery'>
              <td className='cart__bill__delivery-text'>Delivery Charges</td>
              <td className='cart__bill__delivery-number'>+$44</td>
            </tr>
            <tr className='cart__bill__total'>
              <th className='cart__bill__total-text'>Total</th>
              <th className='cart__bill__total-number'>$200</th>
            </tr>
            <tr className='cart__bill__save'>
              <td className='cart__bill__save-text' colSpan={2}>
                You wil save $22 on this order
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>
                <button className='cart__bill-checkout'>Checkout</button>
              </td>
            </tr>
          </tfoot>
        </table>
        <div className='cart__container'>
          <ProductCard variant='cart' />
          <ProductCard variant='cart' />
          <ProductCard variant='cart' />
          <ProductCard variant='cart' />
          <ProductCard variant='cart' />
          <ProductCard variant='cart' />
          <ProductCard variant='cart' />
        </div>
      </main>
      <Transition />
    </>
  );
};

export default Cart;
