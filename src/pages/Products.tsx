import React, { useState } from 'react';
import transiton from '../utils/motion';
import { FiSearch, FiList, FiStar } from 'react-icons/fi';
import { ProductCard } from '../components';
import Filters from '../components/Filters';

const Products = () => {
  const [filterActive, setFilterActive] = useState(false);

  return (
    <main className='product'>
      <form className='filter__search'>
        <FiSearch className='filter__search-icon' />
        <input
          type='search'
          role='searchbox'
          results={5}
          className='filter__search-input'
        />
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
      </form>

      {filterActive && <Filters />}

      <div className='product__container'>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </main>
  );
};

export default transiton(Products);
