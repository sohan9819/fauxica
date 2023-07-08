import { ActionType, RatingOption } from '../../utils/types';
import { useProductContext } from '../../context/ProductContext';

const RatingFilter = () => {
  const { filterDispatch, filterState } = useProductContext();

  const ratingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterDispatch({ type: ActionType.UPDATE_RATING, payload: e.target.value });
  };

  return (
    <div className='filter__rating'>
      <h2 className='filter__rating-title'>Rating</h2>
      <div className='filter__rating-filters'>
        <label htmlFor='rating-none' className='filter__rating-label'>
          <input
            type='radio'
            name='rating'
            id='rating-none'
            className='filter__rating-input'
            value={RatingOption.NONE}
            checked={filterState.rating === RatingOption.NONE}
            onChange={ratingHandler}
          />
          None
        </label>
        <label htmlFor='rating-1' className='filter__rating-label'>
          <input
            type='radio'
            name='rating'
            id='rating-1'
            className='filter__rating-input'
            value={RatingOption.ABOVE_1_STAR}
            checked={filterState.rating === RatingOption.ABOVE_1_STAR}
            onChange={ratingHandler}
          />
          Above 1 star
        </label>
        <label htmlFor='rating-2' className='filter__rating-label'>
          <input
            type='radio'
            name='rating'
            id='rating-2'
            className='filter__rating-input'
            value={RatingOption.ABOVE_2_STAR}
            checked={filterState.rating === RatingOption.ABOVE_2_STAR}
            onChange={ratingHandler}
          />
          Above 2 star
        </label>
        <label htmlFor='rating-3' className='filter__rating-label'>
          <input
            type='radio'
            name='rating'
            id='rating-3'
            className='filter__rating-input'
            value={RatingOption.ABOVE_3_STAR}
            checked={filterState.rating === RatingOption.ABOVE_3_STAR}
            onChange={ratingHandler}
          />
          Above 3 star
        </label>
        <label htmlFor='rating-4' className='filter__rating-label'>
          <input
            type='radio'
            name='rating'
            id='rating-4'
            className='filter__rating-input'
            value={RatingOption.ABOVE_4_STAR}
            checked={filterState.rating === RatingOption.ABOVE_4_STAR}
            onChange={ratingHandler}
          />
          Above 4 star
        </label>
      </div>
    </div>
  );
};

export default RatingFilter;
