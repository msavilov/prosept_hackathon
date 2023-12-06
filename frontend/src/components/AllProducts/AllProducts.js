import React from 'react';

import products from '../Products/Products';
import ProductsList from '../ProductsList/ProductsList';
import ProductItem from '../ProductItem/ProductItem';
import Pagination from '../Pagination/Pagination';

function AllProducts(props) {
  // States
  const [isMatch, setIsMatch] = React.useState(false);
  const [productsList, setProductsList] = React.useState([]);
  const [views, setViews] = React.useState(10);
  console.log(views);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Match open & close
  function handleMatch() {
    setIsMatch(true);
  }

  function handleMatchClose() {
    setIsMatch(false);
  }

  // value for Views
  function handleViewsChange(e) {
    setViews(e.target.value);
  }

  // products index
  const lastProductIndex = currentPage * views;
  const firstProductIndex = lastProductIndex - views;
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage(prev => prev - 1);
  const nextPage = () => setCurrentPage(prev => prev + 1);

  // products for table
  React.useEffect(() => {
    props.setLoading(true);
    const firstProductIndex = currentPage * views - views;
    const lastProductIndex = firstProductIndex + views;
    setProductsList(() => {
      if (products !== null) {
        if (products.length >= views) {
          return products.slice(firstProductIndex, lastProductIndex);
        } else {
          return products;
        }
      }
    });
    props.setLoading(false);
  }, [views, currentPage]);

  return (
    <section className='section products' aria-label='Таблица товаров'>
      <h1 className='section-title products__title'>Товары продавцов</h1>
      <div className='products__optoins'>
        <label className='text products__label' for='views'>
          Show:
        </label>
        <input
          className='text products__input'
          type='number'
          id='views'
          name='views'
          min='10'
          max='500'
          step='5'
          value={views}
          onChange={handleViewsChange}
        />
      </div>
      <div className='products__main'>
        <ProductsList
          setLoading={props.setLoading}
          productsList={productsList}
          setProductsList={setProductsList}
          isMatch={isMatch}
          handleMatch={handleMatch}
          handleMatchClose={handleMatchClose}
        />
      </div>
      <Pagination
        views={views}
        currentPage={currentPage}
        totalProducts={products.length}
        firstProductIndex={firstProductIndex}
        lastProductIndex={lastProductIndex}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </section>
  );
}

export default AllProducts;
