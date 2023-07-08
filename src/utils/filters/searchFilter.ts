import { ProductsList, FilterState } from '../types';

export const searchFilter = (
  products: ProductsList,
  filterState: FilterState
) => {
  const regex = new RegExp(filterState.search, 'ig');
  return products.filter(
    (prod) => prod.name.match(regex) || prod.category.match(regex)
  );
};
