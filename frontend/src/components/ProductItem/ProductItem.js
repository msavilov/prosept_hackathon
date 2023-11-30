import React from 'react';

function ProductItem(props) {
  return (
    <tr className='product'>
      <td className='product__item product__name'>
        <a
          href={props.product.product_url}
          className='link product__link'
          target='_blank'
          rel='noreferrer'
        >
          {props.product.product_name}
        </a>
        <div
          className={`product__item product__mark ${
            props.product.is_marked ? 'product__item_is_marked' : ''
          }`}
        ></div>
      </td>

      <td className='product__item'>{props.product.product_key}</td>
      <td className='product__item'>{props.product.dealer_id}</td>
      <td className='product__item'>{props.product.price}</td>
      <td className='product__item'>{props.product.date}</td>
    </tr>
  );
}

export default ProductItem;
