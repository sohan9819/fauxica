import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Transition } from '../components';
import { getOrderById } from '../utils/firebase/firebase.utils';
import { useAuthContext } from '../context';
import { Order } from '../utils/types';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { timeAgo } from '../utils/timeAgo/timeAgo.utils';

const OrderId = () => {
  const { orderId } = useParams();
  const { user } = useAuthContext();
  const [order, setOrder] = useState<Order | null>(null);
  const [orderLoading, setOrderLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      getOrderById(orderId as string).then((data) => {
        setOrderLoading(false);
        setOrder(data);
      });
    } catch (error) {
      const e = error as FirebaseError;
      console.log('Error message', e.message);
    }
  }, [orderId]);

  return (
    <>
      <div className='section'>
        <h1 className='section__title'>Order Info</h1>
        {orderLoading ? (
          <p className='section__empty'>Loading...</p>
        ) : (
          <div className='orders__container'>
            <div className='profile__user'>
              <p className='profile__user__info'>
                <span className='profile__user__label'>Name</span>
                <span className='profile__user__text'>{user?.displayName}</span>
              </p>
              <p className='profile__user__info'>
                <span className='profile__user__label'>Email</span>
                <span className='profile__user__text'>{user?.email}</span>
              </p>
              <p className='profile__user__info'>
                <span className='profile__user__label'>Phone Number</span>
                <span className='profile__user__text'>
                  {order?.phoneNumber}
                </span>
              </p>
              <p className='profile__user__info'>
                <span className='profile__user__label'>City</span>
                <span className='profile__user__text'>{order?.city}</span>
              </p>
              <p className='profile__user__info'>
                <span className='profile__user__label'>Pincode</span>
                <span className='profile__user__text'>{order?.pincode}</span>
              </p>
              <p className='profile__user__info'>
                <span className='profile__user__label'>Address</span>
                <span className='profile__user__text'>{order?.address}</span>
              </p>
            </div>
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
                    Price({order?.products.length}{' '}
                    {order?.products.length === 1 ? 'item' : 'items'})
                  </td>
                  <td className='cart__bill__price-number'>
                    {order?.price.toLocaleString('hi-IN', {
                      style: 'currency',
                      currency: 'INR',
                    })}
                  </td>
                </tr>
                <tr className='cart__bill__discount'>
                  <td className='cart__bill__discount-text'>Discount</td>
                  <td className='cart__bill__discount-number'>
                    -
                    {order?.discount.toLocaleString('hi-IN', {
                      style: 'currency',
                      currency: 'INR',
                    })}
                  </td>
                </tr>
                <tr className='cart__bill__delivery'>
                  <td className='cart__bill__delivery-text'>
                    Delivery Charges
                  </td>
                  <td className='cart__bill__delivery-number'>
                    {order?.delivery === 0
                      ? 'Free delivery'
                      : order?.delivery.toLocaleString('hi-IN', {
                          style: 'currency',
                          currency: 'INR',
                        })}
                  </td>
                </tr>
                <tr className='cart__bill__total'>
                  <th className='cart__bill__total-text'>Total</th>
                  <th className='cart__bill__total-number'>
                    {order?.total.toLocaleString('hi-IN', {
                      style: 'currency',
                      currency: 'INR',
                    })}
                  </th>
                </tr>
                <tr className='cart__bill__save'>
                  <td className='cart__bill__save-text' colSpan={2}>
                    You have saved{' '}
                    {order?.discount.toLocaleString('hi-IN', {
                      style: 'currency',
                      currency: 'INR',
                    })}{' '}
                    on this order
                  </td>
                </tr>
              </tbody>
              <tfoot className='cart__bill__foot'>
                <tr className='cart__bill__foot-data'>
                  <td>{timeAgo(order?.orderDate as string)}</td>
                  <td>{order?.paymentId}</td>
                </tr>
              </tfoot>
            </table>
            <table className='cart__products'>
              <thead className='cart__products__head'>
                <tr className='cart__products__head-title'>
                  <th colSpan={4}>Products</th>
                </tr>
                <tr className='cart__products__head-headings'>
                  <th>Sr.No.</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody className='cart__products__body'>
                {order?.products.map((prod, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{prod.name}</td>
                    <td>{prod.count}</td>
                    <td>
                      {prod.price.toLocaleString('hi-IN', {
                        style: 'currency',
                        currency: 'INR',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
        )}

        <button
          className='section__btn'
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
      <Transition />
    </>
  );
};

export default OrderId;
