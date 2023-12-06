import React from 'react';

import products from '../Products/Products';
import ProductItem from '../ProductItem/ProductItem';
import Pagination from '../Pagination/Pagination';
import icon_match from '../../images/icon_match.png';

function AllProducts(props) {
  // States
  const [loading, setLoading] = React.useState(false);
  const [isMatch, setIsMatch] = React.useState(false);
  console.log(isMatch);

  const [productsList, setProductsList] = React.useState([]);
  const [views, setViews] = React.useState(10);
  console.log(views);
  
  const [currentPage] = React.useState(1);

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

  // products for table
  React.useEffect(() => {
    setLoading(true);
    setProductsList(() => {
      if (products !== null) {
        if (products.length >= views) {
          return products.slice(firstProductIndex, lastProductIndex);
        } else {
          return products;
        }
      }
    });
    setLoading(false);
  }, [views]);

  // res
  let res = productsList.map(product => (
    <ProductItem
      key={product.id}
      product={product}
      isMatch={isMatch}
      handleMatch={handleMatch}
      handleMatchClose={handleMatchClose}
    />
  ));

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
        <table className={`products__table ${isMatch ? 'products__table_match' : ''}`}>
          <thead className='text products__head'>
            {isMatch ? (
              <tr>
                <td className='products__head-item'>Имя</td>
                <td className='products__head-item products__head-icon'>
                  <img
                    className='products__icon'
                    src={icon_match}
                    alt='Иконка соотношения товаров'
                  />
                </td>
              </tr>
            ) : (
              <tr>
                <td className='products__head-item'>Имя</td>
                <td className='products__head-item products__head-icon'>
                  <img
                    className='products__icon'
                    src={icon_match}
                    alt='Иконка соотношения товаров'
                  />
                </td>
                <td className='products__head-item'>product_key</td>
                <td className='products__head-item'>Дилер</td>
                <td className='products__head-item'>Цена</td>
                <td className='products__head-item'>Дата</td>
              </tr>
            )}
          </thead>
          <tbody>{res}</tbody>
        </table>
        {isMatch && (
          <button
            className='button button-close product__button-close '
            onClick={handleMatchClose}
          ></button>
        )}
      </div>
      <Pagination
        views={views}
        totalProducts={products.length}
        firstProductIndex={firstProductIndex}
        lastProductIndex={lastProductIndex}
      ></Pagination>
    </section>
  );
}

export default AllProducts;
