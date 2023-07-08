import { FiArrowRight } from 'react-icons/fi';
import { Transition, ProductCard } from '../components';
import { Link } from 'react-router-dom';
import { useWishContext } from '../context/WishContext';

const Wishlist = () => {
  const { wishProducts } = useWishContext();

  return (
    <>
      <main className='wishlist section'>
        <h1 className='section__title'>Wishlist 💖</h1>
        {wishProducts.length === 0 ? (
          <p className='section__empty'>
            Your wishlist is empty ☹️ <br />
            <Link to={'/products'} className='section__empty-cta'>
              <span>Browse our collection</span>
              <FiArrowRight className='section__empty-cta-icon' />
            </Link>
          </p>
        ) : (
          <div className='wishlist__container'>
            {wishProducts.map((product) => (
              <ProductCard variant='wish' product={product} key={product.id} />
            ))}
          </div>
        )}
      </main>
      <Transition />
    </>
  );
};

export default Wishlist;
