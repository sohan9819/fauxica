import { ProductsList, FilterState } from '../types';

export const priceFilter = (products: ProductsList, filterState: FilterState) =>
  products.filter((prod) => prod.price <= filterState.price);
