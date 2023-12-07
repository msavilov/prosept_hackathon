import React from 'react';
import { NavLink } from 'react-router-dom';

function Pagination(props) {
  const pageNumber = [];
  const allPageNumer = Math.ceil(props.totalProducts / props.views);
  console.log(allPageNumer);

  for (let i = 1; i <= allPageNumer; i++) {
    pageNumber.push(i);
  }

  return (
    <div>
      <ul className='pagination'>
        {' '}
        {pageNumber.map(number => (
          <li className='pagination__item' key={number}>
            <NavLink className='link' to=''>
              {number}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
