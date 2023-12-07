import React from 'react';

function SearchForm(props) {
  // Нажатие на кнопку поиск
  const handleSubmit = e => {
    e.preventDefault();

    if (props.formValue.search) {
      props.handleSearch(props.formValue.search, props.isShortCheckActive);
    } else {
    }
  };

  return (
    <form className='form search-form'>
      <p className='text search-form__text'>Search:</p>
      <input
        type='text'
        className='text form__input search-form__input'
        id='search'
        name='search'
        value={props.formValue.search || ''}
        onChange={props.handleChange}
      />
    </form>
  );
}
export default SearchForm;
