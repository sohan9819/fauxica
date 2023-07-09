import { Navbar } from './components';
import { Toaster } from 'react-hot-toast';
import Router from './router/Router';

function App() {
  return (
    <>
      <Navbar />
      <Router />
      <Toaster position='top-right' containerStyle={{ fontSize: '1.4rem' }} />
    </>
  );
}

export default App;
