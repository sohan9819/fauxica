import React from 'react';
import { useProductContext } from '../../context/ProductContext';
import { ActionType } from '../../utils/types';

const PriceFilter = () => {
  const { filterState, filterDispatch } = useProductContext();

  const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterDispatch({
      type: ActionType.UPDATE_PRICE,
      payload: Number(e.target.value),
    });
  };
  return (
    <div className='filter__price'>
      <h2 className='filter__price-title'>Price</h2>
      <label htmlFor='price' className='filter__price-label'>
        0
        <input
          type='range'
          min={0}
          max={3500}
          step={100}
          id='price'
          className='filter__price-input'
          value={filterState.price}
          onChange={priceHandler}
        />
        {filterState.price}
      </label>
    </div>
  );
};

export default PriceFilter;
