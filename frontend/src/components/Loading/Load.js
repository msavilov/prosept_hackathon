import React from 'react';

function Load(props) {
  const { products } = props;

  return (
    <div className='products__main'>
      <table className={`products__table ${props.isMatch ? 'products__table_match' : ''}`}>
        <thead className='text products__head'>
          <tr>
            <td className='products__head-item'>Дата выгрузки</td>
            <td className='products__head-item'>Имя дилера</td>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map(product => (
              <tr key={product.id}>
                <td>{product.date}</td>
                <td>{product.dealer_id}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Load;
