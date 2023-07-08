import { useReducer, createContext, useContext } from 'react';
import {
  Product,
  WishAction,
  WishActionType,
  WishContextProviderProps,
  WishContextState,
  WishState,
} from '../utils/types';

const WishContext = createContext({} as WishContextState);

const initialState: WishState = [];

const WishContextProvider = ({ children }: WishContextProviderProps) => {
  const reducer = (state: WishState, action: WishAction): WishState => {
    const { type, payload } = action;
    switch (type) {
      case WishActionType.ADD_TO_WISHLIST:
        return [...state, payload];

      case WishActionType.REMOVE_FROM_WISHLIST:
        return state.filter((product) => product.uuid !== (payload as string));

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const isProductInWishlist = (uuid: string) =>
    state.findIndex((product: Product) => product.uuid === uuid) !== -1
      ? true
      : false;

  return (
    <WishContext.Provider
      value={{
        wishProducts: state,
        wishDispatch: dispatch,
        isProductInWishlist,
      }}
    >
      {children}
    </WishContext.Provider>
  );
};

const useWishContext = () => useContext(WishContext);

export { WishContextProvider, useWishContext };
