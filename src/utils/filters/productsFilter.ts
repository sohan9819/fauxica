import { FilterState } from '../../context/ProductContext';
import { ProductsList } from '../types';

type InputFunction = (
  products: ProductsList,
  filterState: FilterState
) => ProductsList;

export const productsFilter =
  (...func: InputFunction[]) =>
  (products: ProductsList, filterState: FilterState): ProductsList =>
    func.reduce((acc, f) => {
      return f(acc, filterState);
    }, products);
