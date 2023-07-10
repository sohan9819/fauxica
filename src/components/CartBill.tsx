import { useCartContext } from '../context';
import { useMemo } from 'react';

const CartBill = () => {
  const { cartProducts } = useCartContext();
  const discountPercentage = 10;

  const price = useMemo(
    () =>
      cartProducts.reduce((sum, prod) => (sum += prod.price * prod.count), 0),
    [cartProducts]
  );

  const delivery = useMemo(() => (price <= 500 ? 40 : 0), [price]);
  const discount = useMemo(() => (price * discountPercentage) / 100, [price]);
  const total = useMemo(
    () => price + delivery - discount,
    [price, delivery, discount]
  );

  return (
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
          <td className='cart__bill__price-text'>
            Price({cartProducts.length}{' '}
            {cartProducts.length === 1 ? 'item' : 'items'})
          </td>
          <td className='cart__bill__price-number'>
            {price.toLocaleString('hi-IN', {
              style: 'currency',
              currency: 'INR',
            })}
          </td>
        </tr>
        <tr className='cart__bill__discount'>
          <td className='cart__bill__discount-text'>Discount</td>
          <td className='cart__bill__discount-number'>
            -
            {discount.toLocaleString('hi-IN', {
              style: 'currency',
              currency: 'INR',
            })}
          </td>
        </tr>
        <tr className='cart__bill__delivery'>
          <td className='cart__bill__delivery-text'>Delivery Charges</td>
          <td className='cart__bill__delivery-number'>
            {delivery === 0
              ? 'Free delivery'
              : delivery.toLocaleString('hi-IN', {
                  style: 'currency',
                  currency: 'INR',
                })}
          </td>
        </tr>
        <tr className='cart__bill__total'>
          <th className='cart__bill__total-text'>Total</th>
          <th className='cart__bill__total-number'>
            {total.toLocaleString('hi-IN', {
              style: 'currency',
              currency: 'INR',
            })}
          </th>
        </tr>
        <tr className='cart__bill__save'>
          <td className='cart__bill__save-text' colSpan={2}>
            You wil save{' '}
            {discount.toLocaleString('hi-IN', {
              style: 'currency',
              currency: 'INR',
            })}{' '}
            on this order
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
  );
};

export default CartBill;
