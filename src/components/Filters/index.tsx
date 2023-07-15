import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import SortFilter from './SortFilter';
import RatingFilter from './RatingFilter';
import SearchFilter from './SearchFilter';
import ResetFilter from './ResetFilter';

import { useState } from 'react';
import { FiList } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { fadeIn, filterContainer } from '../../utils/motion';

const Filters = () => {
  const [filterActive, setFilterActive] = useState(false);

  return (
    <>
      <motion.div
        className='filter__search'
        variants={fadeIn(0.5)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
      >
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
      </motion.div>
      {filterActive && (
        <>
          <motion.div
            className='filter'
            variants={filterContainer(filterActive)}
            initial='hidden'
            animate='show'
          >
            <ResetFilter />
            <CategoryFilter />
            <PriceFilter />
            <SortFilter />
            <RatingFilter />
          </motion.div>
        </>
      )}
    </>
  );
};

export default Filters;
