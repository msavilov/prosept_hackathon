import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppHeader from './Header/AppHeader';
import Footer from './Footer/Footer';
import Statistics from './Statistics/Statistics';
import Load from './Loading/Load';
//import NotFound from './NotFound';
//import ProtectedRoute from './ProtectedRoute';
import AllProducts from './AllProducts/AllProducts';
//import DilerProducts from './DilerProducts';
import Preloader from './Preloader/Preloader';
import { LoadingContext } from '../contexts/LoadingContext';
import { LoggedInContext } from '../contexts/LoggedInContext';
import products from './Products/Products';
import { marked } from '../utils/config';

function App() {
  // States
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);

  return (
    <LoadingContext.Provider value={isLoading}>
      <LoggedInContext.Provider value={isLoggedIn}>
        {isLoading ? (
          <Preloader />
        ) : (
          <div className='App page'>
            <AppHeader />
            <main>
              <Routes>
                <Route
                  path='/all-products'
                  element={<AllProducts setLoading={setIsLoading} products={products} />}
                />
                <Route path='/unloading' element={<Load products={products} />} />
                {/* <Route path='/*' element={<NotFound />} /> */}
                <Route
                  path='/statistics'
                  element={<Statistics products={products} marked={marked} isMatch={true} />}
                />
              </Routes>
            </main>
            <Footer />
          </div>
        )}
      </LoggedInContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
