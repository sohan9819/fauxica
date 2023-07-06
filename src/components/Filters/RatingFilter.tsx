const RatingFilter = () => {
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
          />
          None
        </label>
        <label htmlFor='rating-1' className='filter__rating-label'>
          <input
            type='radio'
            name='rating'
            id='rating-1'
            className='filter__rating-input'
          />
          Above 1 star
        </label>
        <label htmlFor='rating-2' className='filter__rating-label'>
          <input
            type='radio'
            name='rating'
            id='rating-2'
            className='filter__rating-input'
          />
          Above 2 star
        </label>
        <label htmlFor='rating-3' className='filter__rating-label'>
          <input
            type='radio'
            name='rating'
            id='rating-3'
            className='filter__rating-input'
          />
          Above 3 star
        </label>
        <label htmlFor='rating-4' className='filter__rating-label'>
          <input
            type='radio'
            name='rating'
            id='rating-4'
            className='filter__rating-input'
          />
          Above 4 star
        </label>
      </div>
    </div>
  );
};

export default RatingFilter;
