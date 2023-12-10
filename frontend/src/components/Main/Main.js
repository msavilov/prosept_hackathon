import React from 'react';
import AllProducts from '../AllProducts/AllProducts';
// import DilerProducts from '../DilerProducts/DilerProducts';
import { Link, NavLink, useLocation } from 'react-router-dom';

function Main(props) {
  const location = useLocation();

  return (
    <main>
      {location.pathname === '/' && <AllProducts />}
      {/* {location.pathname === '/diler-products' && <DilerProducts />} */}
    </main>
  );
}

export default Main;
