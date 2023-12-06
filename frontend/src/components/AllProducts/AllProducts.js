import React from 'react';
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

  const products = [
    {
      product_key: 546227,
      product_name: 'Prosept Universal Spray, 300',
      dealer_id: 2,
      id: 2,
      date: '2022-08-03',
      price: 233.0,
      product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml/',
      is_marked: false
    },
    {
      product_key: 546408,
      product_name: 'Prosept Universal Spray, 500',
      dealer_id: 2,
      id: 3,
      date: '2022-08-03',
      price: 175.0,
      product_url:
        'https://akson.ru//p/kontsentrat_prosept_multipower_dlya_mytya_polov_tsitrus_1l/',
      is_marked: false
    },
    {
      product_key: 546409,
      product_name: 'Prosept Universal Spray, 1000',
      dealer_id: 2,
      id: 4,
      date: '2022-08-03',
      price: 175.0,
      product_url:
        'https://akson.ru//p/kontsentrat_prosept_multipower_dlya_mytya_polov_tsitrus_1l/',
      is_marked: true
    },
    {
      product_key: 546227,
      product_name: 'Prosept Universal Spray, 300',
      dealer_id: 2,
      id: 5,
      date: '2022-08-03',
      price: 233.0,
      product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml/',
      is_marked: false
    },
    {
      product_key: 546408,
      product_name: 'Prosept Universal Spray, 500',
      dealer_id: 2,
      id: 6,
      date: '2022-08-03',
      price: 175.0,
      product_url:
        'https://akson.ru//p/kontsentrat_prosept_multipower_dlya_mytya_polov_tsitrus_1l/',
      is_marked: false
    },
    {
      product_key: 546409,
      product_name: 'Prosept Universal Spray, 1000',
      dealer_id: 2,
      id: 7,
      date: '2022-08-03',
      price: 175.0,
      product_url:
        'https://akson.ru//p/kontsentrat_prosept_multipower_dlya_mytya_polov_tsitrus_1l/',
      is_marked: true
    },
    {
      product_key: 546227,
      product_name: 'Prosept Universal Spray, 300',
      dealer_id: 2,
      id: 8,
      date: '2022-08-03',
      price: 233.0,
      product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml/',
      is_marked: true
    },
    {
      product_key: 546408,
      product_name: 'Prosept Universal Spray, 500',
      dealer_id: 2,
      id: 9,
      date: '2022-08-03',
      price: 175.0,
      product_url:
        'https://akson.ru//p/kontsentrat_prosept_multipower_dlya_mytya_polov_tsitrus_1l/',
      is_marked: true
    },
    {
      product_key: 546409,
      product_name: 'Prosept Universal Spray, 1000',
      dealer_id: 2,
      id: 9,
      date: '2022-08-03',
      price: 175.0,
      product_url:
        'https://akson.ru//p/kontsentrat_prosept_multipower_dlya_mytya_polov_tsitrus_1l/',
      is_marked: false
    },
    {
      product_key: 546227,
      product_name: 'Prosept Universal Spray, 300',
      dealer_id: 2,
      id: 10,
      date: '2022-08-03',
      price: 233.0,
      product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml/',
      is_marked: true
    },
    {
      product_key: 546408,
      product_name: 'Prosept Universal Spray, 500',
      dealer_id: 2,
      id: 11,
      date: '2022-08-03',
      price: 175.0,
      product_url:
        'https://akson.ru//p/kontsentrat_prosept_multipower_dlya_mytya_polov_tsitrus_1l/',
      is_marked: false
    },
    {
      product_key: 546409,
      product_name: 'Prosept Universal Spray, 1000',
      dealer_id: 2,
      id: 12,
      date: '2022-08-03',
      price: 175.0,
      product_url:
        'https://akson.ru//p/kontsentrat_prosept_multipower_dlya_mytya_polov_tsitrus_1l/',
      is_marked: true
    },
    {
      product_key: 546227,
      product_name: 'Prosept Universal Spray, 300',
      dealer_id: 2,
      id: 13,
      date: '2022-08-03',
      price: 233.0,
      product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml/',
      is_marked: false
    },
    {
      product_key: 546408,
      product_name: 'Prosept Universal Spray, 500',
      dealer_id: 2,
      id: 14,
      date: '2022-08-03',
      price: 175.0,
      product_url:
        'https://akson.ru//p/kontsentrat_prosept_multipower_dlya_mytya_polov_tsitrus_1l/',
      is_marked: true
    },
    {
      product_key: 546409,
      product_name: 'Prosept Universal Spray, 1000',
      dealer_id: 2,
      id: 15,
      date: '2022-08-03',
      price: 1705.0,
      product_url:
        'https://akson.ru//p/kontsentrat_prosept_multipower_dlya_mytya_polov_tsitrus_1l/',
      is_marked: true
    }
  ];

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
