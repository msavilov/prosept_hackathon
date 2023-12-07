import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import icon_match from '../../images/icon_match.png';

import RelatedProducts from '../Products/RelatedProducts';
import ProductDetails from '../Products/ProductDetails';

function ProductsList(props) {
  const [editing, setEditing] = React.useState(true);
  const [marked, setMarked] = React.useState([]);

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
            />
          ))}
        </tbody>
      </table>
      {editing && RelatedProducts && (
        <div>
          <ProductDetails selectedProduct={RelatedProducts} />
          <RelatedProducts clickedProduct={RelatedProducts} markedProducts={marked} />
        </div>
      )}
      {props.isMatch && (
        <button
          className='button button-close product__button-close '
          onClick={props.handleMatchClose}
        ></button>
      )}
    </div>
  );
}

export default ProductsList;
