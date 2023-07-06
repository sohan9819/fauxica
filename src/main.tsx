import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './sass/main.scss';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.tsx';
import { ProductContextProvider } from './context/ProductContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ProductContextProvider>
          <App />
        </ProductContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
