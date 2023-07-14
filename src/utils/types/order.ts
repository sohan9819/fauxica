import { CartProduct } from '.';

type InitialOrderState = {
  products: CartProduct[];
  price: number;
  discount: number;
  delivery: number;
  total: number;
  city: string;
  pincode: number;
  address: string;
  phoneNumber: number;
  paymentId: null | string;
  orderDate: string;
};

type Order = InitialOrderState & {
  uid: string;
};

type OrderList = Order[];

type OrderContextProps = {
  children: React.ReactNode;
};

enum OrderActionType {
  ADD_ORDER = 'add_order',
  REFETCH_ORDERS = 'refetch_order',
  ADD_ALL_ORDERS = 'add_all_orders',
}

type OrderAction =
  | {
      type: OrderActionType.ADD_ORDER;
      payload: Order;
    }
  | {
      type: OrderActionType.REFETCH_ORDERS;
      payload: null;
    }
  | {
      type: OrderActionType.ADD_ALL_ORDERS;
      payload: OrderList;
    };

type OrderContextState = {
  orders: OrderList | null;
  ordersDispatch: React.Dispatch<OrderAction>;
};

type OrderFormInputs = {
  city: string;
  pincode: number;
  address: string;
  phoneNumber: number;
};

type Response = {
  razorpay_payment_id: string;
};

interface ExtendedWindow extends Window {
  Razorpay: any;
}

export type {
  InitialOrderState,
  Order,
  OrderList,
  OrderContextProps,
  OrderContextState,
  OrderAction,
  OrderFormInputs,
  Response,
  ExtendedWindow,
};

export { OrderActionType };
