//сведения о продуктах

import React from 'react';

const ProductDetails = ({ selectedProduct }) => {
  return (
    <div className='products__details'>
      <img src={selectedProduct.product_url} alt={selectedProduct.product_name} />
      <h2>{selectedProduct.product_name}</h2>
      {/* Add more details or styling as needed */}
    </div>
  );
};

export default ProductDetails;