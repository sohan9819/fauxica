const CategoryFilter = () => {
  return (
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
        <label htmlFor='category-5' className='filter__category-label'>
          <input
            type='checkbox'
            id='category-5'
            name='category-5'
            className='filter__category-input'
          />
          Category-5
        </label>
      </div>
    </div>
  );
};

export default CategoryFilter;
