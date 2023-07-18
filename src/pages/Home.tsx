import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { SuspenseLoader } from '../components';
import { motion } from 'framer-motion';
import {
  textVariant_1,
  staggerContainer,
  popOut_1,
  fadeIn,
} from '../utils/motion';

const CategoryGallery = lazy(() =>
  import('../components').then((module) => ({
    default: module.CategoryGallery,
  }))
);

const Home = () => {
  return (
    <motion.main
      className='home'
      variants={staggerContainer()}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.25 }}
    >
      <div className='home__hero'>
        <motion.h1 className='home__hero-title' variants={textVariant_1(0.1)}>
          Quality apparel without the price tag
        </motion.h1>
        <motion.p className='home__hero-subhead' variants={textVariant_1(0.2)}>
          No need to spend $xxx on apparel just for the name’s sake. Our premium
          apparel is made from the same stuff.
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
      <Suspense fallback={<SuspenseLoader />}>
        <CategoryGallery />
      </Suspense>
    </motion.main>
  );
};

export default Home;
