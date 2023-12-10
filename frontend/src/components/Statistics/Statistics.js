import React, { useState, useEffect } from 'react';
import { getStatistics } from '../../utils/api';

function Statistics(props) {
  const { products, marked } = props;

  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getStatistics();
        setStatistics(data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

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
        matched: 0
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
    <section className='section products' aria-label='Статистика'>
      <h1 className='section-title products__title'>Статистика</h1>
      <div className='products__main'>
        <table className={`products__table ${props.isMatch ? 'products__table_match' : ''}`}>
          <thead className='text products__head'>
            <tr>
              <td className='products__head-item'>Дилеры</td>
              <td className='products__head-item'>Все товары</td>
              <td className='products__head-item'>Сопоставленные</td>
              <td className='products__head-item'>Несопоставленные</td>
              <td className='products__head-item'>Неуспешно сопоставленные</td>
              <td className='products__head-item'>Отложенные</td>
            </tr>
          </thead>
          <tbody>
            {countsList.map(([dealerId, counts]) => (
              <tr key={dealerId}>
                <td className='product__item'>{dealerId}</td>
                <td className='product__item'>{counts.total}</td>
                <td className='product__item'>{counts.matched}</td>
                <td className='product__item'>{counts.total - counts.matched}</td>
                <td className='product__item'>{counts.total - counts.matched}</td>
                <td className='product__item'>{counts.total - counts.matched}</td>
              </tr>
            ))}
            <tr>
              <td className='product__item'>Итого</td>
              <td className='product__item'>{totalProducts}</td>
              <td className='product__item'>{totalMatched}</td>
              <td className='product__item'>{totalProducts - totalMatched}</td>
              <td className='product__item'>{totalProducts - totalMatched}</td>
              <td className='product__item'>{totalProducts - totalMatched}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Statistics;
