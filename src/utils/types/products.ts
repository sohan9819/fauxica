enum Category {
  Hats = 'Hats',
  Jackets = 'Jackets',
  Sneakers = 'Sneakers',
  Mens = 'Mens',
  Womens = 'Womens',
}

type Rating = {
  rate: number;
  count: number;
};

type ProductData = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: Category;
  rating: Rating;
};

type Product = ProductData & {
  uuid: string;
};

type ProductsList = Product[];

//-------------- CONTEXT ---------------//

type ProductContextProviderProps = {
  children: React.ReactNode;
};

type InitialStateType = {
  products: ProductsList;
  filterState: FilterState;
  filterDispatch: React.Dispatch<Action>;
};

enum Sort {
  NONE = 'none',
  ASC = 'asc',
  DSC = 'dsc',
}

enum RatingOption {
  NONE = 'none',
  ABOVE_1_STAR = 'above_1_star',
  ABOVE_2_STAR = 'above_2_star',
  ABOVE_3_STAR = 'above_3_star',
  ABOVE_4_STAR = 'above_4_star',
}

type FilterState = {
  search: string;
  category: Category[];
  price: number;
  sort: Sort;
  rating: RatingOption;
};

enum ActionType {
  UPDATE_SEARCH,
  UPDATE_CATEGORY,
  UPDATE_USER_CATEGORY,
  UPDATE_PRICE,
  UPDATE_SORT,
  UPDATE_RATING,
  RESET,
}

type Action = {
  type: ActionType;
  payload: Sort | Category | RatingOption | string | number;
};

export {};

export type {
  ProductData,
  Product,
  ProductsList,
  Rating,
  ProductContextProviderProps,
  InitialStateType,
  FilterState,
  Action,
};
export { Category, Sort, RatingOption, ActionType };
