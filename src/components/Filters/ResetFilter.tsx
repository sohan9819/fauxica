import { useProductContext } from '../../context/ProductContext';
import { ActionType } from '../../utils/types';

const ResetFilter = () => {
  const { filterDispatch } = useProductContext();

  const resetHandler = () => {
    filterDispatch({ type: ActionType.RESET, payload: '' });
  };
  return (
    <div className='filter__reset'>
      <button className='filter__reset-btn' onClick={resetHandler}>
        Reset Filter
      </button>
    </div>
  );
};

export default ResetFilter;
