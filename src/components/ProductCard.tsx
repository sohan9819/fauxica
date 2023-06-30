import React, { useState } from 'react';
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
import { FiDollarSign } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';

type ProductCardProps = {
  variant?: 'default' | 'cart' | 'wish';
};

const ProductCard = ({ variant = 'default' }: ProductCardProps) => {
  const [cartAdded, setCartAdded] = useState(false);
  const [wishAdded, setWishAdded] = useState(false);

  return (
    <article className='product__card'>
      <img
        src='https://images.unsplash.com/photo-1687893641851-3d9946c661e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80'
        alt=''
        className='card__image'
      />
      <div className='card__info'>
        <h3 className='card__name'>Product Name</h3>
        <p className='card__description'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. In...
        </p>
        <div className='card__stats'>
          <h4 className='card__stats-price'>
            <FiDollarSign />
            100
          </h4>
          <p className='card__stats__rating'>
            <strong className='card__stats__rating-rate'>
              4.6 <AiFillStar className='card__stats__rating-rate-icon' />
            </strong>
            10,00
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
