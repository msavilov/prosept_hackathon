//сопутствующие товары

import React from 'react';
import products from './Products';

function RelatedProducts({ clickedProduct, markedProducts }) {

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
      <table>
        <thead>
          <tr>
            <th>{products.product_name}</th>
            <th>{products.product_key}</th>
          </tr>
        </thead>
        <tbody>
          {relatedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.article}</td>
              <td>{product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RelatedProducts;
