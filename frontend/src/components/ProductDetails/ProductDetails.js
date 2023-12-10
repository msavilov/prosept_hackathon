//сведения о продуктах
import React from 'react';
// import RelatedProducts from '../Products/RelatedProducts';
import { marked } from '../../utils/config';
import Dropdown from '../Dropdown/Dropdown';

function ProductDetails(props) {
  const [selectedOption, setSelectedOption] = React.useState('');

  return (
    <div className='product-details'>
      <h2 className='product-details__title'>{props.selectedProd.product_name}</h2>
      <p className='text product-details__text'>Product_key: {props.selectedProd.product_key}</p>
      <p className='text product-details__text'>Price: {props.selectedProd.price}</p>
      <p className='text product-details__text'>Product_url: {props.selectedProd.product_url}</p>
      <h2 className='product-details__title'>Товары для сопоставления</h2>
      <Dropdown
        marked={marked}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <div className='product-details__buttons'>
        <button className='button product-details__button' onClick={() => {}}>
          Да
        </button>
        <button className='button product-details__button' onClick={() => {}}>
          Нет
        </button>
        <button className='button product-details__button' onClick={() => {}}>
          Отложить
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
