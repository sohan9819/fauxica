import React from 'react';

const Filters = () => {
  return (
    <div className='filter'>
      <div className='filter__category'>
        <h2 className='filter__category-title'>Category</h2>
        <div className='filter__category-filters'>
          <label htmlFor='category-1' className='filter__category-label'>
            <input
              type='checkbox'
              id='category-1'
              name='category-1'
              className='filter__category-input'
            />
            Category-1
          </label>
          <label htmlFor='category-2' className='filter__category-label'>
            <input
              type='checkbox'
              id='category-2'
              name='category-2'
              className='filter__category-input'
            />
            Category-2
          </label>
          <label htmlFor='category-3' className='filter__category-label'>
            <input
              type='checkbox'
              id='category-3'
              name='category-3'
              className='filter__category-input'
            />
            Category-3
          </label>
          <label htmlFor='category-4' className='filter__category-label'>
            <input
              type='checkbox'
              id='category-4'
              name='category-4'
              className='filter__category-input'
            />
            Category-4
          </label>
        </div>
      </div>
      <div className='filter__price'>
        <h2 className='filter__price-title'>Price</h2>
        <label htmlFor='price' className='filter__price-label'>
          0
          <input
            type='range'
            min={0}
            max={1000}
            step={100}
            id='price'
            className='filter__price-input'
          />
          1000
        </label>
      </div>
      <div className='filter__sort'>
        <h2 className='filter__sort-title'>Sort</h2>
        <div className='filter__sort-filters'>
          <label htmlFor='radio-none' className='filter__sort-label'>
            <input
              type='radio'
              id='radio-none'
              name='sort'
              className='filter__sort-input '
            />
            None
          </label>
          <label htmlFor='asc' className='filter__sort-label'>
            <input
              type='radio'
              id='asc'
              name='sort'
              className='filter__sort-input'
            />
            Asc
          </label>
          <label htmlFor='dsc' className='filter__sort-label'>
            <input
              type='radio'
              id='dsc'
              name='sort'
              className='filter__sort-input'
            />
            Dsc
          </label>
        </div>
      </div>
      <div className='filter__rating'>
        <h2 className='filter__rating-title'>Rating</h2>
        <div className='filter__rating-filters'>
          <label htmlFor='rating-none' className='filter__rating-label'>
            <input
              type='radio'
              name='rating'
              id='rating-none'
              className='filter__rating-input'
            />
            None
          </label>
          <label htmlFor='rating-1' className='filter__rating-label'>
            <input
              type='radio'
              name='rating'
              id='rating-1'
              className='filter__rating-input'
            />
            Above 1 star
          </label>
          <label htmlFor='rating-2' className='filter__rating-label'>
            <input
              type='radio'
              name='rating'
              id='rating-2'
              className='filter__rating-input'
            />
            Above 2 star
          </label>
          <label htmlFor='rating-3' className='filter__rating-label'>
            <input
              type='radio'
              name='rating'
              id='rating-3'
              className='filter__rating-input'
            />
            Above 3 star
          </label>
          <label htmlFor='rating-4' className='filter__rating-label'>
            <input
              type='radio'
              name='rating'
              id='rating-4'
              className='filter__rating-input'
            />
            Above 4 star
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;
