import { createContext, useContext, useReducer, useEffect } from 'react';
import {
  OrderAction,
  OrderActionType,
  OrderContextProps,
  OrderContextState,
  OrderList,
} from '../utils/types';
import { getAllOrders } from '../utils/firebase/firebase.utils';

const OrderContext = createContext<OrderContextState>({} as OrderContextState);
import { useAuthContext } from '.';

const initialState = [] as OrderList;

const OrderContextProvider = ({ children }: OrderContextProps) => {
  const { user } = useAuthContext();

  const reducer = (state: OrderList, action: OrderAction) => {
    const { type, payload } = action;

    switch (type) {
      case OrderActionType.ADD_ORDER:
        return [...state, payload];

      case OrderActionType.REFETCH_ORDERS:
        getAllOrders().then((data) => {
          dispatch({
            type: OrderActionType.ADD_ALL_ORDERS,
            payload: data as OrderList,
          });
        });
        return state;

      case OrderActionType.ADD_ALL_ORDERS:
        return payload ? payload : state;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (user) {
      (async function () {
        getAllOrders().then((data) => {
          dispatch({
            type: OrderActionType.ADD_ALL_ORDERS,
            payload: data as OrderList,
          });
        });
      })();
    }
  }, [user]);

  return (
    <OrderContext.Provider value={{ orders: state, ordersDispatch: dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

const useOrderContext = () => useContext(OrderContext);

export { OrderContextProvider, useOrderContext };
