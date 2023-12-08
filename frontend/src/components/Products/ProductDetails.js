//сведения о продуктах
import React, {useState} from 'react';
import RelatedProducts from './RelatedProducts';
import products from './Products';

function ProductDetails({ products }) {

  const [isMatch, setIsMatch] = useState(false);
  const [clickedProduct, setClickedProduct] = useState(null);

  // Match open & close
  function handleMatch(product) {
    setClickedProduct(product);
    setIsMatch(true);
  }

  function handleMatchClose() {
    setClickedProduct(null);
    setIsMatch(false);
  }

  return (
    <div className='products__main'>
      <table className={`products__table ${isMatch ? 'products__table_match' : ''}`}>
        <thead className='text products__head'>
          <tr>
            <td className='products__head-item'>Соответствующие товары</td>
          </tr>
        </thead>
        <tbody>
        </tbody>
        {isMatch && (
          <RelatedProducts clickedProduct={clickedProduct} markedProducts={products} />
        )}
        {isMatch && (
          <button
            className='button button-close product__button-close '
            onClick={handleMatchClose}
          ></button>
        )}
      </table>
    </div>
  );
};

export default ProductDetails;