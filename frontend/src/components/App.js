import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AppHeader from './Header/AppHeader';
//import Main from './Main';
//import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';

import Statistics from './Statistics/Statistics';
import Load from './Loading/Load';
//import NotFound from './NotFound';
//import ProtectedRoute from './ProtectedRoute';
import AllProducts from './AllProducts/AllProducts';
//import DilerProducts from './DilerProducts';
import Preloader from './Preloader/Preloader';
import products from './Products/Products';
import { BASE_URL, HEADERS, marked } from '../utils/config';

function App() {
  // States
  const [loading, setLoading] = React.useState(false);

  return loading ? (
    <Preloader />
  ) : (
    <div className='App page'>
      <AppHeader />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/all-products' element={<AllProducts setLoading={setLoading} />} />
        <Route path='/load' element={<Load />} />
        {/* <Route path='/*' element={<NotFound />} /> */}
        <Route path='/statistics' element={<Statistics products={products} marked={marked} isMatch={true} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
