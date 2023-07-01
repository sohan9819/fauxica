import { Link } from 'react-router-dom';
import { Transition } from '../components';
import { motion } from 'framer-motion';
import {
  textVariant_1,
  staggerContainer,
  popOut_1,
  fadeIn,
} from '../utils/motion';

const Home = () => {
  return (
    <>
      <motion.main
        className='home'
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        whileHover='hover'
        viewport={{ once: false, amount: 0.25 }}
      >
        <div className='home__hero'>
          <motion.h1 className='home__hero-title' variants={textVariant_1(0.1)}>
            Quality apparel without the price tag
          </motion.h1>
          <motion.p
            className='home__hero-subhead'
            variants={textVariant_1(0.2)}
          >
            No need to spend $xxx on apparel just for the name’s sake. Our
            premium apparel is made from the same stuff.
          </motion.p>
          <motion.div className='home__hero__cta' variants={popOut_1(0.4)}>
            <Link to={'/products'} className='home__hero__cta-btn'>
              Browse our collection
            </Link>
          </motion.div>
          <motion.div className='home__hero__news' variants={fadeIn(0.3)}>
            <motion.p
              className='home__hero__news-employees'
              variants={textVariant_1(0.5)}
            >
              50K
            </motion.p>
            <motion.p
              className='home__hero__news-details'
              variants={textVariant_1(0.5)}
            >
              We’re proud to announce that we now employ a workforce of over
              &nbsp;
              <strong>50,000</strong>. It’s all possible because of you.
            </motion.p>
          </motion.div>
        </div>
        <motion.div
          className='home__category'
          variants={textVariant_1(0.1)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
        >
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
        </motion.div>
      </motion.main>
      <Transition />
    </>
  );
};

export default Home;
