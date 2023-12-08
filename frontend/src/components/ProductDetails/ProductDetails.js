//сведения о продуктах
import React, { useState } from 'react';
// import RelatedProducts from '../Products/RelatedProducts';
import { marked } from '../../utils/config';
import Dropdown from '../Dropdown/Dropdown';

function ProductDetails(props) {
  return (
    <div className='product-details'>
      <h2 className='product-details__title'>{props.selectedProd.product_name}</h2>
      <p className='text product-details__text'>Product_key: {props.selectedProd.product_key}</p>
      <p className='text product-details__text'>Price: {props.selectedProd.price}</p>
      <p className='text product-details__text'>Product_url: {props.selectedProd.product_url}</p>
      <h2 className='product-details__title'>Товары для сопоставления</h2>
      <Dropdown marked={marked} />
      {/* <table className='products__table'>
        {marked.map(mark => (
          <>
            {mark.name} {mark.article}
          </>
        ))}
      </table> */}
    </div>
  );
}

export default ProductDetails;
