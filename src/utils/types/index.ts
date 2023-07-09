import {
  AuthUser,
  AuthStateChangeCallback,
  // updateUserProfileProps,
} from './auth';
import {
  ProductData,
  Product,
  ProductsList,
  Rating,
  Category,
  Sort,
  RatingOption,
  ProductContextProviderProps,
  InitialStateType,
  FilterState,
  Action,
  ActionType,
  ProductCardProps,
} from './products';

import {
  CartProduct,
  CartAction,
  CartState,
  CartContextState,
  CartContextProviderProps,
  CartActionType,
} from './cart';

import {
  WishAction,
  WishActionType,
  WishContextState,
  WishContextProviderProps,
  WishState,
} from './wish';

export type {
  AuthUser,
  AuthStateChangeCallback,
  ProductData,
  Product,
  ProductCardProps,
  ProductsList,
  Rating,
  ProductContextProviderProps,
  InitialStateType,
  FilterState,
  Action,
  CartProduct,
  CartAction,
  CartState,
  CartContextState,
  CartContextProviderProps,
  WishAction,
  WishContextState,
  WishContextProviderProps,
  WishState,
};
export {
  Category,
  Sort,
  RatingOption,
  ActionType,
  CartActionType,
  WishActionType,
};
