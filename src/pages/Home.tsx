import { Link } from 'react-router-dom';
import transiton from '../utils/motion';

const Home = () => {
  return (
    <main className='home'>
      <div className='home__hero'>
        <h1 className='home__hero-title'>
          Quality apparel without the price tag
        </h1>
        <p className='home__hero-subhead'>
          No need to spend $xxx on apparel just for the name’s sake. Our premium
          apparel is made from the same stuff.
        </p>
        <div className='home__hero__cta'>
          <Link to={'#'} className='home__hero__cta-btn'>
            Browse our collection
          </Link>
        </div>
        <div className='home__hero__news'>
          <p className='home__hero__news-employees'>50K</p>
          <p className='home__hero__news-details'>
            We’re proud to announce that we now employ a workforce of over
            &nbsp;
            <strong>50,000</strong>. It’s all possible because of you.
          </p>
        </div>
      </div>
      <div className='home__category'>
        <article className='home__category__card card-1'>
          <div className='product__detail'>
            <div className='product__info'>
              <Link to={'#'} className='product__brand'>
                Fauxica Jackets
              </Link>
              <p className='product__category'>starting from</p>
            </div>
            <p className='product__price'>$49</p>
          </div>
        </article>
        <article className='home__category__card card-2'>
          <div className='product__detail'>
            <div className='product__info'>
              <Link to={'#'} className='product__brand'>
                Fauxica Sneakers
              </Link>
              <p className='product__category'>starting from</p>
            </div>
            <p className='product__price'>$49</p>
          </div>
        </article>
        <article className='home__category__card card-3'>
          <div className='product__detail'>
            <div className='product__info'>
              <Link to={'#'} className='product__brand'>
                Fauxica Hats
              </Link>
              <p className='product__category'>starting from</p>
            </div>
            <p className='product__price'>$49</p>
          </div>
        </article>
        <article className='home__category__card card-4'>
          <div className='product__detail'>
            <div className='product__info'>
              <Link to={'#'} className='product__brand'>
                Fauxica Mens
              </Link>
              <p className='product__category'>starting from</p>
            </div>
            <p className='product__price'>$49</p>
          </div>
        </article>
        <article className='home__category__card card-5'>
          <div className='product__detail'>
            <div className='product__info'>
              <Link to={'#'} className='product__brand'>
                Fauxica Womens
              </Link>
              <p className='product__category'>starting from</p>
            </div>
            <p className='product__price'>$49</p>
          </div>
        </article>
      </div>
    </main>
  );
};

export default transiton(Home);
