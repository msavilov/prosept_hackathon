import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Pagination(props) {
  const pageNumber = [];
  const allPageNumer = Math.ceil(props.totalProducts / props.views);
  console.log(allPageNumer);

  for (let i = 1; i <= allPageNumer; i++) {
    pageNumber.push(i);
  }

  return (
    <div className='pagination'>
      <h2 className='text pagination__title'>
        Showing {props.firstProductIndex} to {props.lastProductIndex} of {props.totalProducts}{' '}
        entries
      </h2>
      <ul className='pagination__items'>
        <li className='pagination__item'>
          <NavLink className='button pagination__button' to=''>
            Previous
          </NavLink>
        </li>
        {pageNumber.map(number => (
          <li className='pagination__item' key={number}>
            <NavLink className='button pagination__button' to=''>
              {number}
            </NavLink>
          </li>
        ))}
        <li className='pagination__item'>
          <NavLink className='button pagination__button' to=''>
            Next
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
