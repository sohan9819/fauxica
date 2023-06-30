import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './sass/main.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Routes>
        <Route path='/*' element={<App />} />
      </Routes> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
