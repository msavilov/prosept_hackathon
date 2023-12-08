import React from 'react';
import { marked } from '../../utils/config';

function Dropdown(props) {
  //   const [selectedOption, setSelectedOption] = React.useState('');

  const handleSelect = e => {
    console.log(e.id);
    const value = e.id;
    props.setSelectedOption(value);
    // onSelect(value);
  };

  return props.marked.map(option => (
    <div
      className={`product-details__text product-details__marked ${
        props.selectedOption === option.id ? 'product-details__active-marked' : ''
      }`}
      key={option.id}
      onClick={() => handleSelect(option)}
    >
      <td value='marked'>{option.name}</td>
      <td>{option.article}</td>
    </div>
  ));
}

export default Dropdown;
