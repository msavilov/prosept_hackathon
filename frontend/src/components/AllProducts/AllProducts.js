import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import icon_match from '../../images/icon_match.png';

function AllProducts(props) {
  // States
  const [isMatch, setIsMatch] = React.useState(false);
  console.log(isMatch);

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
    }
  ];

  const views = 10;

  // Расчет количества строк отображаемых в таблице
  const ProductsList = products => {
    if (products !== null) {
      if (products.length >= views) {
        return products.slice(0, views);
      } else {
        return products;
      }
    }
  };

  let res = ProductsList(products).map(product => (
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
      <table className={`products__table ${isMatch ? 'products__table_match' : ''}`}>
        <thead className='text products__head'>
          {isMatch ? (
            <tr>
              <td className='products__head-item'>Имя</td>
              <td className='products__head-item products__head-icon'>
                <img className='products__icon' src={icon_match} alt='Иконка соотношения товаров' />
              </td>
            </tr>
          ) : (
            <tr>
              <td className='products__head-item'>Имя</td>
              <td className='products__head-item products__head-icon'>
                <img className='products__icon' src={icon_match} alt='Иконка соотношения товаров' />
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
    </section>
  );
}

export default AllProducts;
