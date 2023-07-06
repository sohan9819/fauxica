import { FiSearch } from 'react-icons/fi';
import { ActionType, useProductContext } from '../../context/ProductContext';

const SearchFilter = () => {
  const { filterState, filterDispatch } = useProductContext();

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterDispatch({ type: ActionType.UPDATE_SEARCH, payload: e.target.value });
  };

  return (
    <>
      <FiSearch className='filter__search-icon' />
      <input
        type='search'
        role='searchbox'
        results={5}
        className='filter__search-input'
        onChange={searchHandler}
        value={filterState.search}
      />
    </>
  );
};

export default SearchFilter;
