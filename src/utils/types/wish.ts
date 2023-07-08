import { Product, ProductsList } from '.';

enum WishActionType {
  ADD_TO_WISHLIST = 'add_to_wishlist',
  REMOVE_FROM_WISHLIST = 'remove_from_wishlist',
}

type WishAction =
  | {
      type: WishActionType.ADD_TO_WISHLIST;
      payload: Product;
    }
  | {
      type: WishActionType.REMOVE_FROM_WISHLIST;
      payload: string;
    };

type WishContextState = {
  wishProducts: ProductsList;
  wishDispatch: React.Dispatch<WishAction>;
  isProductInWishlist: (uuid: string) => boolean;
};

type WishContextProviderProps = {
  children: React.ReactNode;
};

type WishState = Product[];

export type {
  WishAction,
  WishContextState,
  WishContextProviderProps,
  WishState,
};
export { WishActionType };
