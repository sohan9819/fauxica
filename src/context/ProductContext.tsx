import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useReducer,
} from 'react';
import { ProductsList } from '../utils/types';
import { getProductCollection } from '../utils/firebase/firebase.utils';
import {
  productsFilter,
  searchFilter,
  categoryFilter,
  priceFilter,
  ratingFilter,
  sortFilter,
} from '../utils/filters';

type ProductContextProviderProps = {
  children: React.ReactNode;
};

type InitialStateType = {
  products: ProductsList;
  filterState: FilterState;
  filterDispatch: React.Dispatch<Action>;
};

type Category = 'Hats' | 'Jackets' | 'Sneakers' | 'Mens' | 'Womens';

enum Sort {
  NONE = 'none',
  ASC = 'asc',
  DSC = 'dsc',
}

type FilterState = {
  search: string;
  category: Category[];
  price: number;
  sort: Sort;
};

enum ActionType {
  UPDATE_SEARCH,
  UPDATE_CATEGORY,
  UPDATE_PRICE,
  UPDATE_SORT,
  RESET,
}

type Action = {
  type: ActionType;
  payload: Sort | Category | string | number;
};

const initialState = {
  search: '',
  category: [] as Category[],
  price: 3500,
  sort: Sort.NONE,
};

const ProductContext = createContext({} as InitialStateType);

const ProductContextProvider = ({ children }: ProductContextProviderProps) => {
  const [products, setProducts] = useState([] as ProductsList);

  const reducer = (state: FilterState, action: Action): FilterState => {
    const { type, payload } = action;

    switch (type) {
      case ActionType.UPDATE_SEARCH:
        return { ...state, search: payload as string };
      case ActionType.UPDATE_CATEGORY:
        return { ...state };
      case ActionType.UPDATE_PRICE:
        return { ...state, price: payload as number };
      case ActionType.UPDATE_SORT:
        return { ...state, sort: payload as Sort };
      case ActionType.RESET:
        return { ...initialState };
      default:
        return state;
    }
  };

  const [filterState, filterDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getProductCollection().then((data) => {
      setProducts(data as ProductsList);
    });
  }, []);

  const filteredProducts = productsFilter(
    searchFilter,
    categoryFilter,
    priceFilter,
    ratingFilter,
    sortFilter
  )(products, filterState);

  return (
    <ProductContext.Provider
      value={{ products: filteredProducts, filterState, filterDispatch }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => useContext(ProductContext);

export { ProductContextProvider, useProductContext, ActionType, Sort };
export type { FilterState };
