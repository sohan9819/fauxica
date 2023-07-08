import React from 'react';
import { useProductContext } from '../../context/ProductContext';
import { ActionType, Sort } from '../../utils/types';

const SortFilter = () => {
  const { filterState, filterDispatch } = useProductContext();

  const sortHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterDispatch({ type: ActionType.UPDATE_SORT, payload: e.target.value });
  };

  return (
    <div className='filter__sort'>
      <h2 className='filter__sort-title'>Sort</h2>
      <div className='filter__sort-filters'>
        <label htmlFor='radio-none' className='filter__sort-label'>
          <input
            type='radio'
            id='radio-none'
            name='sort'
            className='filter__sort-input '
            value={Sort.NONE}
            checked={Sort.NONE === filterState.sort}
            onChange={sortHandler}
          />
          None
        </label>
        <label htmlFor='asc' className='filter__sort-label'>
          <input
            type='radio'
            id='asc'
            name='sort'
            className='filter__sort-input'
            value={Sort.ASC}
            checked={Sort.ASC === filterState.sort}
            onChange={sortHandler}
          />
          Asc
        </label>
        <label htmlFor='dsc' className='filter__sort-label'>
          <input
            type='radio'
            id='dsc'
            name='sort'
            className='filter__sort-input'
            value={Sort.DSC}
            checked={Sort.DSC === filterState.sort}
            onChange={sortHandler}
          />
          Dsc
        </label>
      </div>
    </div>
  );
};

export default SortFilter;
