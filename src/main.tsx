import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/main.scss';
import { BrowserRouter } from 'react-router-dom';
import {
  AuthContextProvider,
  CartContextProvider,
  WishContextProvider,
  ProductContextProvider,
  OrderContextProvider,
} from './context';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <WishContextProvider>
              <OrderContextProvider>
                <App />
              </OrderContextProvider>
            </WishContextProvider>
          </CartContextProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
