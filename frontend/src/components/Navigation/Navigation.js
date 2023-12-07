// Navigation.js

import React, { useState } from 'react';
import styles from './Navigation.css';

function Navigation({ onMenuToggle }) {
  return (
    <div className='navigation-container'>
      <button
        className='button navigation-container__button'
        onMouseEnter={onMenuToggle}
        // onClick={onMenuToggle}
      >
        Парсинг
      </button>
    </div>
  );
}

export default Navigation;
