//сопутствующие товары

import React from 'react';
import ProductItem from '../ProductItem/ProductItem';

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <div className='products__related'>
      <h3>Related Products</h3>
      <div className='products__related-list'>
        {relatedProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;