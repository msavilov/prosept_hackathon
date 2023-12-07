//сопутствующие товары

import React from 'react';

const RelatedProducts = ({ clickedProduct, markedProducts }) => {

  const calculateSimilarity = (product1, product2) => {

    return product1.dealer_id === product2.dealer_id;
  };

  
  const getRelatedProducts = () => {

    const sortedProducts = markedProducts.sort((product1, product2) =>
      calculateSimilarity(clickedProduct, product2) - calculateSimilarity(clickedProduct, product1)
    );

    
    const top5RelatedProducts = sortedProducts.slice(0, 5);

    return top5RelatedProducts;
  };

  const relatedProducts = getRelatedProducts();

  return (
    <div>
      <ul>
        {relatedProducts.map((product) => (
          <li key={product.id}>
            Article: {product.article}, Name: {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedProducts;
