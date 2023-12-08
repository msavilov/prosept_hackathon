import React from 'react';
import { Link } from 'react-router-dom';

function Load(props) {
  const { products } = props;
  const dateList = [...new Set(products.flatMap(({ date }) => date))];

  return (
    <div className='products__main products-load__main'>
      <table className='products__table products-load__table'>
        <thead className='text products__head'>
          <tr>
            <td className='products__head-item'>Дата выгрузки</td>
          </tr>
        </thead>
        <tbody>
          {products &&
            dateList.map(date => (
              <tr key={date}>
                <tdproducts-load__item>
                  <Link to='' className='link product__item products-load__item'>
                    {date}
                  </Link>
                </tdproducts-load__item>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Load;
