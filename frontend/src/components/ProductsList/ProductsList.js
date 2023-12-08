import React, { useCallback } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import icon_match from '../../images/icon_match.png';
import ProductDetails from '../ProductDetails/ProductDetails';
// import RelatedProducts from '../Products/RelatedProducts';

function ProductsList(props) {
  const [selectedProd, setSelectedProd] = React.useState({});
  const handleMatchSelect = useCallback(product => {
    setSelectedProd(product);
  }, []);
  console.log(selectedProd);

  return (
    <div className='products__main'>
      <table className={`products__table ${props.isMatch ? 'products__table_match' : ''}`}>
        <thead className='text products__head'>
          {props.isMatch ? (
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
        <tbody>
          {props.productsList.map(product => (
            <ProductItem
              key={product.id}
              product={product}
              isMatch={props.isMatch}
              handleMatch={props.handleMatch}
              handleMatchClose={props.handleMatchClose}
              handleMatchSelect={handleMatchSelect}
            />
          ))}
        </tbody>
      </table>
      {props.isMatch && (
        <>
          <ProductDetails selectedProd={selectedProd} isMatch={props.isMatch} />
          {/* <RelatedProducts /> */}
          <button
            className='button button-close product__button-close '
            onClick={props.handleMatchClose}
          ></button>
        </>
      )}
    </div>
  );
}

export default ProductsList;
