import { useState } from 'react';
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
import { Product } from '../utils/types';

type ProductCardProps = {
  variant?: 'default' | 'cart' | 'wish';
  product: Product;
};

const ProductCard = ({ variant = 'default', product }: ProductCardProps) => {
  const [cartAdded, setCartAdded] = useState(false);
  const [wishAdded, setWishAdded] = useState(false);

  return (
    <article className='product__card'>
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
            <button className='card__quantity-minus'>-</button>
            <span className='card__quantity-number'>1</span>
            <button className='card__quantity-plus'>+</button>
          </div>
        )}
        <div className='card__btns'>
          {variant === 'cart' ? (
            <button className='card__btn card__btn__cart'>
              <BsCartDashFill />
            </button>
          ) : (
            <button
              className='card__btn card__btn__cart'
              onClick={() => {
                setCartAdded((prev) => !prev);
              }}
            >
              {cartAdded ? <BsFillCartCheckFill /> : <BsFillCartPlusFill />}
            </button>
          )}
          {variant === 'wish' ? (
            <button className='card__btn card__btn__heart'>
              <FaHeartCircleMinus />
            </button>
          ) : (
            <button
              className='card__btn card__btn__heart'
              onClick={() => {
                setWishAdded((prev) => !prev);
              }}
            >
              {wishAdded ? <FaHeartCircleCheck /> : <FaHeartCirclePlus />}
            </button>
          )}
        </div>
        <button className='card__btn-cta'>Buy Now</button>
      </div>
    </article>
  );
};

export default ProductCard;
