//сопутствующие товары
import React, { useState } from 'react';

function RelatedProducts({ clickedProduct, markedProducts }) {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const calculateSimilarity = (product1, product2) => {
    return product1.dealer_id === product2.dealer_id;
  };

  const handleMatch = (product) => {
    const updatedSelectedProducts = [...selectedProducts];
    const index = updatedSelectedProducts.findIndex((p) => p.id === product.id);

    if (index !== -1) {
      updatedSelectedProducts.splice(index, 1);
    } else {
      updatedSelectedProducts.push(product);
    }

    setSelectedProducts(updatedSelectedProducts);
  };

  // Check if markedProducts is defined before mapping
  const relatedProducts = markedProducts ? markedProducts.map((product) => ({
    ...product,
    is_marked: selectedProducts.some((p) => p.id === product.id),
  })) : [];

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Key</th>
          </tr>
        </thead>
        <tbody>
          {relatedProducts.map((product) => (
            <tr key={product.id} className='product'>
              <td className='product__item product__name'>
                <a
                  href={product.product_url}
                  className='link product__link'
                  target='_blank'
                  rel='noreferrer'
                >
                  {product.product_name}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RelatedProducts;