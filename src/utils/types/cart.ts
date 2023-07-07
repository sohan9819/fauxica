import { Product } from '.';

type CartProduct = Product & {
  count: number extends 0 ? never : number;
};

enum CartActionType {
  ADD_TO_CART = 'add_to_cart',
  REMOVE_FROM_CART = 'remove_from_cart',
  PLUS = 'increase_count',
  MINUS = 'decrease_count',
}

type CartAction = {
  type: CartActionType;
  payload: Product | string;
};

type CartState = CartProduct[];

type CartContextState = {
  cartProducts: CartProduct[];
  cartDispatch: React.Dispatch<CartAction>;
  isProductInCart: (uuid: string) => boolean;
};

type CartContextProviderProps = {
  children: React.ReactNode;
};

export type {
  CartProduct,
  CartAction,
  CartState,
  CartContextState,
  CartContextProviderProps,
};

export { CartActionType };
