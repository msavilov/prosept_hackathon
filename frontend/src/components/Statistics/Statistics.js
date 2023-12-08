import React from "react";


function Statistics(props) {
  const { products, marked } = props;

  if (!products || !marked) {
    return <div>No data available.</div>;
  }

  // Calculate counts
  const countsByDealerId = {};
  let totalProducts = 0;
  let totalMatched = 0;

  products.forEach(product => {
    const dealerId = product.dealer_id;
    
    if (!countsByDealerId[dealerId]) {
      countsByDealerId[dealerId] = {
        total: 0,
        matched: 0,
      };
    }

    countsByDealerId[dealerId].total++;
    totalProducts++;

    if (marked.some(markedProduct => markedProduct.id === product.id)) {
      countsByDealerId[dealerId].matched++;
      totalMatched++;
    }
  });

  const countsList = Object.entries(countsByDealerId);


  return (
    <div className='products__main'>
      <table className='products__table'>
        <thead className='text products__head'>
          <tr>
            <td className='products__head-item'>Дилеры</td>
            <td className='products__head-item'>Все товары</td>
            <td className='products__head-item'>Сопоставленные продукты</td>
            <td className='products__head-item'>Несопоставленные продукты</td>
          </tr>
        </thead>
        <tbody>
          {countsList.map(([dealerId, counts]) => (
            <tr key={dealerId}>
              <td className='products__head-item'>{dealerId}</td>
              <td className='products__head-item'>{counts.total}</td>
              <td className='products__head-item'>{counts.matched}</td>
              <td className='products__head-item'>{counts.total - counts.matched}</td>
            </tr>
          ))}
          <tr>
            <td className='products__head-item'>Итого</td>
            <td className='products__head-item'>{totalProducts}</td>
            <td className='products__head-item'>{totalMatched}</td>
            <td className='products__head-item'>{totalProducts - totalMatched}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Statistics;

