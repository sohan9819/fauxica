import { ProductsList, FilterState, Sort } from '../types';

export const sortFilter = (
  products: ProductsList,
  filterState: FilterState
): ProductsList => {
  switch (filterState.sort) {
    case Sort.ASC:
      return [...products].sort((a, b) => a.price - b.price);
    case Sort.DSC:
      return [...products].sort((a, b) => b.price - a.price);
    case Sort.NONE:
      return [...products];
    default:
      return products;
  }
};
