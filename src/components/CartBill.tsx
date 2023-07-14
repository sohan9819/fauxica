import { useNavigate } from 'react-router-dom';
import { useCartContext, useOrderContext } from '../context';
import { useMemo } from 'react';
import { addOrderToUser } from '../utils/firebase/firebase.utils';
import { CartActionType, InitialOrderState } from '../utils/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FirebaseError } from 'firebase/app';
import { loadScript } from '../utils/razorpay/razorpay.utils';
import toast from 'react-hot-toast';
import {
  OrderFormInputs,
  Response,
  ExtendedWindow,
  OrderActionType,
} from '../utils/types/order';

const CartBill = () => {
  const navigate = useNavigate();

  const { cartProducts, cartDispatch } = useCartContext();
  const { ordersDispatch } = useOrderContext();
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderFormInputs>();

  const displayRazorpay = async (order: InitialOrderState) => {
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
      amount: order.total * 100,
      name: 'Fauxica',
      description: 'Thanks for purchasing',
      image:
        'https://github.com/sohan9819/fauxica/assets/64985447/080ee6fe-608c-4206-a256-97d3b574b29c',
      handler: async function (response: Response) {
        const paymentId = response.razorpay_payment_id;
        const orderRefId = await addOrderToUser({
          ...order,
          paymentId,
        });
        ordersDispatch({
          type: OrderActionType.ADD_ORDER,
          payload: { ...order, paymentId, uid: orderRefId },
        });
        ordersDispatch({ type: OrderActionType.REFETCH_ORDERS, payload: null });
        cartDispatch({ type: CartActionType.RESET, payload: '' });
        reset();
        toast.success('Ordered successfully');
        navigate(`/order/${orderRefId}`);
      },
      prefill: {
        name: 'Fauxica',
      },
    };

    const paymentObject = new (window as unknown as ExtendedWindow).Razorpay(
      options
    );
    paymentObject.open();
  };

  const orderHandler: SubmitHandler<OrderFormInputs> = async ({
    city,
    pincode,
    address,
    phoneNumber,
  }) => {
    try {
      const order: InitialOrderState = {
        products: cartProducts,
        price,
        discount,
        delivery,
        total,
        city,
        pincode,
        address,
        phoneNumber,
        paymentId: null,
        orderDate: new Date().toISOString(),
      };
      displayRazorpay(order);
    } catch (error) {
      const e = error as FirebaseError;
      console.log('Error message ', e.message);
    }
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
              <form
                className='cart__order'
                onSubmit={handleSubmit(orderHandler)}
                noValidate
              >
                <label htmlFor='city' className='cart__order-label'>
                  City &nbsp;<span className='cart__order-required'>*</span>
                  <input
                    type='text'
                    id='city'
                    className='cart__order-input'
                    {...register('city', {
                      required: 'City name is required',
                    })}
                    placeholder='City'
                  />
                  <p className='cart__order-error'>{errors.city?.message}</p>
                </label>
                <label htmlFor='pinCode' className='cart__order-label'>
                  Pin Code &nbsp;<span className='cart__order-required'>*</span>
                  <input
                    type='number'
                    id='pinCode'
                    className='cart__order-input'
                    {...register('pincode', {
                      required: 'Pincode is required',
                      minLength: {
                        value: 6,
                        message: 'Pincode must be of 6 numbers',
                      },
                      maxLength: {
                        value: 6,
                        message: 'Pincode must be of 6 numbers',
                      },
                    })}
                    placeholder='Pin Code'
                  />
                  <p className='cart__order-error'>{errors.pincode?.message}</p>
                </label>
                <label htmlFor='address' className='cart__order-label'>
                  Address &nbsp;<span className='cart__order-required'>*</span>
                  <textarea
                    id='address'
                    className='cart__order-input address'
                    {...register('address', {
                      required: 'Address is required',
                      minLength: {
                        value: 10,
                        message: 'Please mention a proper detailed address',
                      },
                      maxLength: {
                        value: 180,
                        message: 'Your address is too long',
                      },
                    })}
                    placeholder='Address'
                  />
                  <p className='cart__order-error'>{errors.address?.message}</p>
                </label>

                <label htmlFor='phoneNumber' className='cart__order-label'>
                  Phone Number &nbsp;
                  <span className='cart__order-required'>*</span>
                  <input
                    type='tel'
                    id='phoneNumber'
                    className='cart__order-input'
                    pattern='^[789]\d{9}$'
                    {...register('phoneNumber', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[789]\d{9}$/,
                        message: 'invalid phone number',
                      },
                    })}
                    placeholder='Phone number'
                  />
                  <p className='cart__order-error'>
                    {errors.phoneNumber?.message}
                  </p>
                </label>
                <button className='cart__order-checkout' type='submit'>
                  Check Out
                </button>
              </form>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default CartBill;
