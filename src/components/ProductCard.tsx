import {
  BsFillCartPlusFill,
  BsFillCartCheckFill,
  BsCartDashFill,
} from 'react-icons/bs';
import {
  FaHeartCircleCheck,
  FaHeartCircleMinus,
  FaHeartCirclePlus,
} from 'react-icons/fa6';
import { AiFillStar } from 'react-icons/ai';
import {
  CartActionType,
  CartProduct,
  ProductCardProps,
  WishActionType,
} from '../utils/types';
import { useAuthContext, useCartContext, useWishContext } from '../context';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ variant = 'default', product }: ProductCardProps) => {
  const { user } = useAuthContext();
  const { cartDispatch, isProductInCart } = useCartContext();
  const { wishDispatch, isProductInWishlist } = useWishContext();
  const navigate = useNavigate();

  const addToCart = () => {
    if (user) {
      toast.dismiss();
      toast.success(
        <Link to={'/cart'}>
          Added&nbsp;<strong>{product.name}</strong>&nbsp;to 🛒
        </Link>
      );
      cartDispatch({ type: CartActionType.ADD_TO_CART, payload: product });
    } else {
      toast.dismiss();
      toast.error(
        <Link to={'/auth'}>
          Please&nbsp;<strong>SignIn</strong>
        </Link>
      );
    }
  };

  const removeFromCart = () => {
    toast.dismiss();
    toast.success(
      <>
        Removed&nbsp;<strong>{product.name}</strong>&nbsp;from 🛒
      </>
    );
    cartDispatch({
      type: CartActionType.REMOVE_FROM_CART,
      payload: product.uuid,
    });
  };

  const plusCart = () => {
    cartDispatch({ type: CartActionType.PLUS, payload: product.uuid });
  };

  const minusCart = () => {
    (product as CartProduct).count > 1
      ? cartDispatch({ type: CartActionType.MINUS, payload: product.uuid })
      : window.confirm('Do you want to remove this product from the cart ?')
      ? cartDispatch({
          type: CartActionType.REMOVE_FROM_CART,
          payload: product.uuid,
        })
      : '';
  };

  const addToWishlist = () => {
    if (user) {
      toast.dismiss();
      toast.success(
        <Link to={'/wishlist'}>
          Added&nbsp;<strong>{product.name}</strong>&nbsp;to 💖
        </Link>
      );
      wishDispatch({ type: WishActionType.ADD_TO_WISHLIST, payload: product });
    } else {
      toast.dismiss();
      toast.error(
        <Link to={'/auth'}>
          Please &nbsp;<strong>SignIn</strong>
        </Link>
      );
    }
  };

  const removeFromWishlist = () => {
    toast.dismiss();
    toast.success(
      <>
        Removed&nbsp;<strong>{product.name}</strong>&nbsp;from 💖
      </>
    );
    wishDispatch({
      type: WishActionType.REMOVE_FROM_WISHLIST,
      payload: product.uuid,
    });
  };

  const buyNow = () => {
    if (user) {
      cartDispatch({ type: CartActionType.RESET, payload: '' });
      cartDispatch({ type: CartActionType.ADD_TO_CART, payload: product });
      navigate('/cart');
    } else {
      toast.dismiss();
      toast.error(
        <Link to={'/auth'}>
          Please&nbsp;<strong>SignIn</strong>
        </Link>
      );
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.9 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, type: 'spring' }}
      layout
      className='product__card'
    >
      <img src={product.imageUrl} alt='' className='card__image' />
      <div className='card__info'>
        <h3 className='card__name'>{product.name}</h3>
        <p className='card__category'>{product.category}</p>
        <div className='card__stats'>
          <h4 className='card__stats-price'>
            {product.price.toLocaleString('hi-IN', {
              style: 'currency',
              currency: 'INR',
            })}
          </h4>
          <p className='card__stats__rating'>
            <strong className='card__stats__rating-rate'>
              {product.rating.rate}{' '}
              <AiFillStar className='card__stats__rating-rate-icon' />
            </strong>
            {product.rating.count}
          </p>
        </div>
        {variant === 'cart' && (
          <div className='card__quantity'>
            <button className='card__quantity-minus' onClick={minusCart}>
              -
            </button>
            <span className='card__quantity-number'>
              {(product as CartProduct)?.count}
            </span>
            <button className='card__quantity-plus' onClick={plusCart}>
              +
            </button>
          </div>
        )}

        <div className='card__btns'>
          {variant === 'cart' ? (
            <button
              className='card__btn card__btn__cart'
              onClick={removeFromCart}
            >
              <BsCartDashFill />
            </button>
          ) : isProductInCart(product.uuid) ? (
            <button
              className='card__btn card__btn__cart'
              onClick={removeFromCart}
            >
              <BsFillCartCheckFill />
            </button>
          ) : (
            <button className='card__btn card__btn__cart' onClick={addToCart}>
              <BsFillCartPlusFill />
            </button>
          )}

          {variant === 'wish' ? (
            <button
              className='card__btn card__btn__heart'
              onClick={removeFromWishlist}
            >
              <FaHeartCircleMinus />
            </button>
          ) : isProductInWishlist(product.uuid) ? (
            <button
              className='card__btn card__btn__heart'
              onClick={removeFromWishlist}
            >
              <FaHeartCircleCheck />
            </button>
          ) : (
            <button
              className='card__btn card__btn__heart'
              onClick={addToWishlist}
            >
              <FaHeartCirclePlus />
            </button>
          )}
        </div>
        <button className='card__btn-cta' onClick={buyNow}>
          Buy Now
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
