import React from "react";

function Load (props) {
  return (
        <div className='products__main'>
          <table className={`products__table ${props.isMatch ? 'products__table_match' : ''}`}>
            <thead className='text products__head'>
              <tr>
                <td className='products__head-item'>ID</td>
                <td className='products__head-item'>Имя товара</td>
                <td className='products__head-item'>Цена</td>
                <td className='products__head-item'>Ссылка</td>
                <td className='products__head-item'>Is Marked</td>
              </tr>
            </thead>
            <tbody>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tbody>
          </table>
        </div>
      );
    
};

export default Load;