import React from "react";

function Statistics(products, markedProducts) {
        // Ensure that both input arrays are not empty
        if (!products || products.length === 0 || !markedProducts || markedProducts.length === 0) {
          return {
            totalProducts: 0,
            matchedProducts: 0,
            matchingPercentage: 0,
          };
        }
      
        // Calculate the total number of products and marked products
        const totalProducts = products.length;
        const totalMarkedProducts = markedProducts.length;
      
        // Find the number of products that are marked
        const matchedProducts = products.filter(product =>
          markedProducts.some(markedProduct => markedProduct.id === product.id)
        ).length;
      
        // Calculate the percentage of matching products
        const matchingPercentage = (matchedProducts / totalMarkedProducts) * 100;
      
        return {
          totalProducts,
          matchedProducts,
          matchingPercentage,
        };
      }
      
      // Example usage:
      const products = [
        { id: 1, name: 'Product A' },
        { id: 2, name: 'Product B' },
        { id: 3, name: 'Product C' },
        // Add other products as needed
      ];
      
      const markedProducts = [
        { id: 1, name: 'Product A' },
        // Add other marked products as needed
      ];
      
      const statistics = Statistics(products, markedProducts);
      console.log(statistics);
      

export default Statistics;
