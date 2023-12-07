import React from "react";


function Statistics(props) {
  
  const { products, marked } = props;

  if (!products || !marked) {
    return <div>No data available.</div>;
  }
  //вычисляем
  const matchedProductsCount = products.filter(product =>
    marked.some(markedProduct => markedProduct.id === product.id)
  ).length;

  const unmatchedProductsCount = products.length - matchedProductsCount;

  return (
    <div className='products__main'>
      <table className='products__table'>
        <thead className='text products__head'>
          <tr>
            <td className='products__head-item'>Имя товара</td>
            <td className='products__head-item'>Дилер</td>
            <td className='products__head-item'>Сопоставлен</td>
            <td className='products__head-item'>Matched Products</td>
            <td className='products__head-item'>Unmatched Products</td>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.product_name}</td>
              <td>{product.dealer_id}</td>
              <td>{product.is_marked ? 'Yes' : 'No'}</td>
              <td>{matchedProductsCount}</td>
              <td>{unmatchedProductsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Statistics;
