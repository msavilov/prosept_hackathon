import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AppHeader from './Header/AppHeader';
//import Main from './Main';
//import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';

import Statistics from './Statistics/Statistics';
import UnLoading from './UnLoading/UnLoading';
//import NotFound from './NotFound';
//import ProtectedRoute from './ProtectedRoute';
import AllProducts from './AllProducts/AllProducts';
//import DilerProducts from './DilerProducts';
import Preloader from './Preloader/Preloader';
import { LoadingContext } from '../contexts/LoadingContext';
import { LoggedInContext } from '../contexts/LoggedInContext';

function App() {
  // States
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);

  // Change state loading
  function handleSetIsLoading(boolean) {
    setIsLoading(boolean);
  }

  return (
    <LoadingContext.Provider value={isLoading}>
      <LoggedInContext.Provider value={isLoggedIn}>
        {isLoading ? (
          <Preloader />
        ) : (
          <div className='App page'>
            <AppHeader />
            <Routes>
              <Route path='/' element={<Main />} />
              <Route
                path='/all-products'
                element={<AllProducts setLoading={handleSetIsLoading} />}
              />
              {/* <Route path='/diler-products' element={<DilerProducts />} /> */}
              {/* <Route path='/*' element={<NotFound />} /> */}
              <Route path='/statistics' element={<Statistics />} />
              <Route path='/unloading' element={<UnLoading />} />
            </Routes>
            <Footer />
          </div>
        )}
      </LoggedInContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
