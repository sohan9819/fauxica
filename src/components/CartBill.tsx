import { toast } from 'react-hot-toast';
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

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (total: number) => {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('You are offline... Failed to load Razorpay SDK');
      return;
    }

    const options = {
      key: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY,
      currency: 'INR',
      // amount: total,
      amount: total * 100,
      name: 'Fauxica',
      description: 'Thanks for purchasing',
      image:
        'https://github.com/sohan9819/fauxica/assets/64985447/080ee6fe-608c-4206-a256-97d3b574b29c',
      handler: function (response) {
        console.log(response);
        alert(response.razorpay_payment_id);
        toast.success('Payment Successfully');
      },

      prefill: {
        name: 'Fauxica',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
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
              <button
                className='cart__bill-checkout'
                onClick={() => displayRazorpay(total)}
              >
                Checkout
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default CartBill;
