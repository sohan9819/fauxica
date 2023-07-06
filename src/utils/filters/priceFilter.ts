import { FilterState } from '../../context/ProductContext';
import { ProductsList } from '../types';

export const priceFilter = (products: ProductsList, filterState: FilterState) =>
  products.filter((prod) => prod.price <= filterState.price);
