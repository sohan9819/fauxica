import { Category, ActionType } from '../../utils/types';
import { useProductContext } from '../../context/ProductContext';

const CategoryFilter = () => {
  const { filterState, filterDispatch } = useProductContext();

  const categoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterDispatch({
      type: ActionType.UPDATE_CATEGORY,
      payload: e.target.value,
    });
  };

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
            value={Category.Hats}
            checked={filterState.category.includes(Category.Hats)}
            onChange={categoryHandler}
          />
          {Category.Hats}
        </label>
        <label htmlFor='category-2' className='filter__category-label'>
          <input
            type='checkbox'
            id='category-2'
            name='category-2'
            className='filter__category-input'
            value={Category.Jackets}
            checked={filterState.category.includes(Category.Jackets)}
            onChange={categoryHandler}
          />
          {Category.Jackets}
        </label>
        <label htmlFor='category-3' className='filter__category-label'>
          <input
            type='checkbox'
            id='category-3'
            name='category-3'
            className='filter__category-input'
            value={Category.Sneakers}
            checked={filterState.category.includes(Category.Sneakers)}
            onChange={categoryHandler}
          />
          {Category.Sneakers}
        </label>
        <label htmlFor='category-4' className='filter__category-label'>
          <input
            type='checkbox'
            id='category-4'
            name='category-4'
            className='filter__category-input'
            value={Category.Mens}
            checked={filterState.category.includes(Category.Mens)}
            onChange={categoryHandler}
          />
          {Category.Mens}
        </label>
        <label htmlFor='category-5' className='filter__category-label'>
          <input
            type='checkbox'
            id='category-5'
            name='category-5'
            className='filter__category-input'
            value={Category.Womens}
            checked={filterState.category.includes(Category.Womens)}
            onChange={categoryHandler}
          />
          {Category.Womens}
        </label>
      </div>
    </div>
  );
};

export default CategoryFilter;
