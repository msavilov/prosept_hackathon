import React from "react";

import products from "../Products/Products";

function Statistics(products, markedProducts) {

  
  if (!products || products.length === 0 || !markedProducts || markedProducts.length === 0) {
    return {
      totalProducts: 0,
      matchedProducts: 0,
      matchingPercentage: 0,
    };
  }

  const totalProducts = products.length;
  const totalMarkedProducts = markedProducts.length;

  const matchedProducts = products.filter(product =>
    markedProducts.some(markedProduct => markedProduct.id === product.id)
  ).length;

  const matchingPercentage = (matchedProducts / totalMarkedProducts) * 100;

  return {
    totalProducts,
    matchedProducts,
    matchingPercentage,
  };
}

const markedProducts = [
  { id: 1, name: 'Product A' },
];

const statistics = Statistics(products, markedProducts);
console.log(statistics);


export default Statistics;
