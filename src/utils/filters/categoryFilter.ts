import { ProductsList, FilterState } from '../types';

export const categoryFilter = (
  products: ProductsList,
  filterState: FilterState
) => {
  return filterState.category.length
    ? products.filter((product) =>
        filterState.category.includes(product.category)
      )
    : products;
};
