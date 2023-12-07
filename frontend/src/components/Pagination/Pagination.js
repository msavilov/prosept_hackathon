import React from 'react';
import { Link } from 'react-router-dom';

function Pagination(props) {
  const pageNumber = [];
  const allPageNumer = Math.ceil(props.totalProducts / props.views);

  for (let i = 1; i <= allPageNumer; i++) {
    pageNumber.push(i);
  }

  return (
    <div className='pagination'>
      <h2 className='text pagination__title'>
        Showing {props.firstProductIndex + 1} to{' '}
        {props.currentPage * props.views > props.totalProducts
          ? props.totalProducts
          : props.currentPage * props.views}{' '}
        of {props.totalProducts} entries
      </h2>
      <ul className='pagination__items'>
        <li className='pagination__item'>
          <button
            className='button pagination__button'
            to=''
            disabled={props.currentPage === 1}
            onClick={props.prevPage}
          >
            Previous
          </button>
        </li>
        {pageNumber.map(number => (
          <li className='pagination__item' key={number}>
            <Link
              className={`button pagination__button ${
                props.currentPage === number ? 'pagination__button_active' : ''
              }`}
              to=''
              onClick={() => props.paginate(number)}
            >
              {number}
            </Link>
          </li>
        ))}
        <li className='pagination__item'>
          <button
            className='button pagination__button'
            to=''
            disabled={props.currentPage === allPageNumer}
            onClick={props.nextPage}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
