import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.css';
import Logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='header'>
      <img className='header__logo' src={Logo} alt='Logo' />
      <ul className='header__block'>
        <li className='header__list'>
          <button className='button header__button'>Выйти</button>
        </li>
        <li className='header__list'>
          <button className='button header__button'>Маркетплейсы</button>
        </li>
        <li className='header__list'>
          <button className='button header__button'>Упаковка</button>
        </li>
        <li className='header__list'>
          <Navigation className='button header__button' onMenuToggle={handleMenuToggle} />
          <div
            className={`menu button ${isMenuOpen ? 'active' : ''}`}
            onMouseLeave={handleMenuToggle}
          >
            <ul className='header__items'>
              <li className='header__item'>
                <NavLink to='/all-products'>
                  <button className='button header__button'>Товары продавцов</button>
                </NavLink>
              </li>
              <li className='header__item'>
                <NavLink to='/statistics'>
                  <button className='button header__button'>Статистика сопоставления</button>
                </NavLink>
              </li>
              <li className='header__item'>
                <NavLink to='/unloading'>
                  <button className='button header__button'>Выгрузки</button>
                </NavLink>
              </li>
              <li className='header__item'>
                <button className='button header__button'>Управление запросами ВБ</button>
              </li>
              <li className='header__item'>
                <button className='button header__button'>Мониторинг цен</button>
              </li>
              <li className='header__item'>
                <button className='button header__button'>Не сопоставленные товары</button>
              </li>
              <li className='header__item'>
                <button className='button header__button'>Отчет по дилерам</button>
              </li>
            </ul>
          </div>
        </li>
        <li className='header__list'>
          <button className='button  header__button'>Маркетинг</button>
        </li>
        <li className='header__list'>
          <button className='button header__button'>Создать заявку</button>
        </li>
        <li className='header__list'>
          <button className='button header__button'>О нас</button>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
