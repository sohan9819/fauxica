import { FiArrowRight } from 'react-icons/fi';
import { Transition } from '../components';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  return (
    <>
      <main className='wishlist section'>
        <h1 className='section__title'>Wishlist 💖</h1>
        <p className='section__empty'>
          Your wishlist is empty ☹️ <br />
          <Link to={'/products'} className='section__empty-cta'>
            <span>Browse our collection</span>
            <FiArrowRight className='section__empty-cta-icon' />
          </Link>
        </p>
        <div className='wishlist__container'>
          {/* <ProductCard variant='wish' />
          <ProductCard variant='wish' />
          <ProductCard variant='wish' />
          <ProductCard variant='wish' />
          <ProductCard variant='wish' /> */}
        </div>
      </main>
      <Transition />
    </>
  );
};

export default Wishlist;
