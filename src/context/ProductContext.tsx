import {
  useState,
  useContext,
  createContext,
  useEffect,
  useReducer,
} from 'react';
import {
  InitialStateType,
  ProductContextProviderProps,
  ProductsList,
  Category,
  Sort,
  RatingOption,
  FilterState,
  ActionType,
  Action,
} from '../utils/types';
import { getProductCollection } from '../utils/firebase/firebase.utils';
import {
  productsFilter,
  searchFilter,
  categoryFilter,
  priceFilter,
  ratingFilter,
  sortFilter,
} from '../utils/filters';
import toast from 'react-hot-toast';

const initialState = {
  search: '',
  category: [] as Category[],
  price: 3500,
  sort: Sort.NONE,
  rating: RatingOption.NONE,
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
        return state.category.includes(payload as Category)
          ? {
              ...state,
              category: state.category.filter((cat) => cat !== payload),
            }
          : {
              ...state,
              category: [
                ...new Set([...state.category, payload]),
              ] as Category[],
            };

      case ActionType.UPDATE_USER_CATEGORY:
        return { ...state, category: [payload as Category] };

      case ActionType.UPDATE_PRICE:
        return { ...state, price: payload as number };
      case ActionType.UPDATE_SORT:
        return { ...state, sort: payload as Sort };
      case ActionType.UPDATE_RATING:
        return { ...state, rating: payload as RatingOption };
      case ActionType.RESET:
        return { ...initialState };
      default:
        return state;
    }
  };

  const [filterState, filterDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const productPromise = getProductCollection().then((data) => {
      setProducts(data as ProductsList);
    });
    toast.promise(productPromise, {
      loading: 'Loading Products data',
      success: 'Got the Products data',
      error: 'Error when fetching Products',
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

export { ProductContextProvider, useProductContext };
