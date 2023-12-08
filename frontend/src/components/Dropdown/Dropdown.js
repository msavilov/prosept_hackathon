import React from 'react';

function Dropdown(props) {
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleSelect = e => {
    const value = e.target.value;
    setSelectedOption(value);
    // onSelect(value);
  };

  return props.marked.map(option => (
    <div key={option.id} onClick={() => handleSelect(option)}>
      <td value={option.name}>{option.name}</td>
      <td>{option.article}</td>
    </div>
  ));
}

export default Dropdown;
