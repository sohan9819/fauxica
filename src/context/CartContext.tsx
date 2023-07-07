import { useReducer, createContext, useContext, useEffect } from 'react';
import {
  CartProduct,
  CartContextProviderProps,
  CartAction,
  CartContextState,
  CartState,
  CartActionType,
  Product,
} from '../utils/types';

const CartContext = createContext({} as CartContextState);

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const reducer = (state: CartState, action: CartAction): CartState => {
    const { type, payload } = action;
    switch (type) {
      case CartActionType.ADD_TO_CART:
        return [...state, { ...(payload as Product), count: 1 } as CartProduct];
      case CartActionType.REMOVE_FROM_CART:
        // return window.confirm(
        //   'Do you want to remove this product from your cart ?'
        // )
        //   ? state.filter((product) => product.uuid !== (payload as string))
        //   : state;
        return state.filter((product) => product.uuid !== (payload as string));

      case CartActionType.PLUS:
        return state.map((product) =>
          product.uuid === payload
            ? { ...product, count: product.count++ }
            : product
        );
      case CartActionType.MINUS:
        return state.map((product) =>
          product.uuid === payload
            ? { ...product, count: product.count-- }
            : product
        );
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, [] as CartState);

  const isProductInCart = (uuid: string): boolean => {
    return state.findIndex((prod) => prod.uuid === uuid) !== -1 ? true : false;
  };

  useEffect(() => {
    console.log('Cart State ', state);
  }, [state]);

  return (
    <CartContext.Provider
      value={{
        cartProducts: state,
        cartDispatch: dispatch,
        isProductInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => useContext(CartContext);

export { CartContextProvider, useCartContext };
