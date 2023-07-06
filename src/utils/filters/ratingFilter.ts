import { FilterState } from '../../context/ProductContext';
import { ProductsList } from '../types';

export const ratingFilter = (
  products: ProductsList,
  filterState: FilterState
) => {
  console.log(filterState);
  return products;
};
