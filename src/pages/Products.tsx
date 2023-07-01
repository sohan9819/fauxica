import { useState } from 'react';
import { FiSearch, FiList } from 'react-icons/fi';
import { ProductCard, Transition, Filters } from '../components';

const Products = () => {
  const [filterActive, setFilterActive] = useState(false);

  return (
    <>
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
      <Transition />
    </>
  );
};

export default Products;
