import { ProductsList, FilterState, RatingOption } from '../types';

export const ratingFilter = (
  products: ProductsList,
  filterState: FilterState
) => {
  switch (filterState.rating) {
    case RatingOption.ABOVE_1_STAR:
      return products.filter((product) => product.rating.rate >= 1);
    case RatingOption.ABOVE_2_STAR:
      return products.filter((product) => product.rating.rate >= 2);
    case RatingOption.ABOVE_3_STAR:
      return products.filter((product) => product.rating.rate >= 3);
    case RatingOption.ABOVE_4_STAR:
      return products.filter((product) => product.rating.rate >= 4);
    case RatingOption.NONE:
      return products;
  }
};
