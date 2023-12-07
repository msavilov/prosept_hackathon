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
            <td className='products__head-item'>Цена</td>
            <td className='products__head-item'>Ссылка</td>
            <td className='products__head-item'>Сопоставлен</td>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.product_name}</td>
              <td>{product.price}</td>
              <td><a href={product.product_url} target="_blank" rel="noopener noreferrer">Link</a></td>
              <td>{product.is_marked ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">
              <p>Matched Products: {matchedProductsCount}</p>
              <p>Unmatched Products: {unmatchedProductsCount}</p>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Statistics;
