import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import SortFilter from './SortFilter';
import RatingFilter from './RatingFilter';
import SearchFilter from './SearchFilter';
import ResetFilter from './ResetFilter';

import { useState } from 'react';
import { FiList } from 'react-icons/fi';

const Filters = () => {
  const [filterActive, setFilterActive] = useState(false);

  return (
    <>
      <div className='filter__search'>
        <SearchFilter />
        <button
          type='button'
          role='button'
          className='filter__button'
          onClick={() => {
            setFilterActive((prev) => !prev);
          }}
        >
          <FiList className='filter__button-icon' />
        </button>
      </div>
      {filterActive && (
        <>
          <div className='filter'>
            <ResetFilter />
            <CategoryFilter />
            <PriceFilter />
            <SortFilter />
            <RatingFilter />
          </div>
        </>
      )}
    </>
  );
};

export default Filters;
