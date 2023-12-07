import React from 'react';

import products from '../Products/Products';
import ProductsList from '../ProductsList/ProductsList';
import ProductItem from '../ProductItem/ProductItem';
import ProductDetails from '../Products/ProductDetails';
import Pagination from '../Pagination/Pagination';
import RelatedProducts from '../Products/RelatedProducts';

function AllProducts(props) {
  // States
  const [isMatch, setIsMatch] = React.useState(false);
  const [productsList, setProductsList] = React.useState([]);
  const [views, setViews] = React.useState(10);
  console.log(views);
  const [currentPage, setCurrentPage] = React.useState(1);
  console.log(currentPage);

  const [editing, setEditing] = React.useState(true);
  const [marked, setMarked] = React.useState([]);

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

  // const currentProducts = products.slice(firstProductIndex, lastProductIndex);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage(prev => prev - 1);
  const nextPage = () => setCurrentPage(prev => prev + 1);

  // products for table
  /*React.useEffect(() => {
    props.setLoading(true);
    const firstProductIndex = currentPage * views - views;
    console.log(firstProductIndex);
    const lastProductIndex =
      currentPage * views > products.length ? products.length : currentPage * views;
    console.log(lastProductIndex);
    if (firstProductIndex >= products.length) {
      setCurrentPage(1);
    }
    setProductsList(() => {
      if (products !== null) {
        if (products.length >= views) {
          return products.slice(firstProductIndex, lastProductIndex);
        } else {
          return products;
        }
      } else {
        setCurrentPage(1);
      }
    });
    props.setLoading(false);
  }, [views, currentPage]);*/

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
      {editing && RelatedProducts && (
        <div>
          <ProductDetails selectedProduct={RelatedProducts} />
          <RelatedProducts clickedProduct={RelatedProducts} markedProducts={marked} />
        </div>
      )}
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