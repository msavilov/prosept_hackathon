import React from 'react';

function SearchForm(props) {
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
