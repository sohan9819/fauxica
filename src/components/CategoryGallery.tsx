import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { textVariant_1 } from '../utils/motion';
import { ActionType, Category } from '../utils/types';
import { useProductContext } from '../context/ProductContext';

const CategoryGallery = () => {
  const { filterDispatch } = useProductContext();
  const categoryHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    const category = target.dataset.category as Category;
    filterDispatch({
      type: ActionType.UPDATE_USER_CATEGORY,
      payload: category,
    });
  };
  return (
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
            <Link
              to={'/products'}
              data-category={Category.Jackets}
              onClick={categoryHandler}
              className='product__brand'
            >
              Fauxica Jackets
            </Link>
            <p className='product__category'>starting from</p>
          </div>
          <p className='product__price'>₹900</p>
        </div>
      </article>
      <article className='home__category__card card-2'>
        <div className='product__detail'>
          <div className='product__info'>
            <Link
              to={'/products'}
              data-category={Category.Sneakers}
              onClick={categoryHandler}
              className='product__brand'
            >
              Fauxica Sneakers
            </Link>
            <p className='product__category'>starting from</p>
          </div>
          <p className='product__price'>₹1,100</p>
        </div>
      </article>
      <article className='home__category__card card-3'>
        <div className='product__detail'>
          <div className='product__info'>
            <Link
              to={'/products'}
              data-category={Category.Hats}
              onClick={categoryHandler}
              className='product__brand'
            >
              Fauxica Hats
            </Link>
            <p className='product__category'>starting from</p>
          </div>
          <p className='product__price'>₹140</p>
        </div>
      </article>
      <article className='home__category__card card-4'>
        <div className='product__detail'>
          <div className='product__info'>
            <Link
              to={'/products'}
              data-category={Category.Mens}
              onClick={categoryHandler}
              className='product__brand'
            >
              Fauxica Mens
            </Link>
            <p className='product__category'>starting from</p>
          </div>
          <p className='product__price'>₹200</p>
        </div>
      </article>
      <article className='home__category__card card-5'>
        <div className='product__detail'>
          <div className='product__info'>
            <Link
              to={'/products'}
              data-category={Category.Womens}
              onClick={categoryHandler}
              className='product__brand'
            >
              Fauxica Womens
            </Link>
            <p className='product__category'>starting from</p>
          </div>
          <p className='product__price'>₹200</p>
        </div>
      </article>
    </motion.div>
  );
};

export default CategoryGallery;
