import { FilterState } from '../../context/ProductContext';
import { ProductsList } from '../types';

export const categoryFilter = (
  products: ProductsList,
  filterState: FilterState
) => {
  console.log(filterState.category);
  return products;
};
