import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import AppHeader from "./Header/AppHeader";
//import Main from './Main';
import Footer from './Footer';
=======
//import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
>>>>>>> e07402c6f9c7c35f8020dab93538eb79b4f447e5
//import NotFound from './NotFound';
//import InfoTooltip from './InfoTooltip';
//import Navigation from './Navigation';
//import ProtectedRoute from './ProtectedRoute';
//import All-products from './All-products';\
//import Diler-products from './Diler-products';
import Preloader from './Preloader';

function App() {
  // Стейты
  const [isLoading, setIsLoading] = React.useState(false);

  return isLoading ? (
    <Preloader />
  ) : (
    <div className='App page'>
      <AppHeader>
        {/*<Navigation />*/}
      </AppHeader>
      <Routes>
        <Route path='/' element={<Main />} />
        {/* <Route path='/all-products' element={<All-products />} /> */}
        {/* <Route path='/diler-products' element={<Diler-products />} /> */}
        {/* <Route path='/*' element={<NotFound />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
