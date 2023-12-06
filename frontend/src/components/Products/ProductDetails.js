//сведения о продуктах
import React from 'react';

function ProductDetails() {

  // Match open & close
  function handleMatch() {
    setIsMatch(true);
  }

  function handleMatchClose() {
    setIsMatch(false);
  }
  const [isMatch, setIsMatch] = React.useState(false);
  console.log(isMatch);

  return (
    <div>
      <table className={`products__table ${isMatch ? 'products__table_match' : ''}`}>
        <thead className='text products__head'>
          <tr>
            <td className='products__head-item'>Соответствующие товары</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td></td>
          </tr>
        </tbody>
        {isMatch && (
          <button
            className='button button-close product__button-close '
            onClick={handleMatchClose}
          ></button>
        )}
      </table>
    </div>
  )
};

export default ProductDetails;