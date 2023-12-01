import React, { useState } from "react";

import styles from "./Header.css"
import Logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header() {

    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="header">
            <ul className="header_block">
                <li className="header_list">
                    <img className="header_logo" src={Logo} alt="Logo" />
                </li>
                <li className="header_list">
                    <button className="header_button">Выйти</button>
                </li>
                <li className="header_list">
                    <button className="header_button">Маркетплейсы</button>
                </li>
                <li className="header_list">
                    <button className="header_button">Упаковка</button>
                </li>
                <li className="header_list">
                    <Navigation onMenuToggle={handleMenuToggle} />
                    <div className={`menu ${isMenuOpen ? "active" : ""}`}>
                        <ul>
                            <li>
                                <button>Товары продавцов</button>
                            </li>
                            <li>
                                <button>Статистика сопоставления</button>
                            </li>
                            <li>
                                <button>Выгрузки</button>
                            </li>
                            <li>
                                <button>Управление запросами ВБ</button>
                            </li>
                            <li>
                                <button>Мониторинг цен</button>
                            </li>
                            <li>
                                <button>Не сопоставленные товары</button>
                            </li>
                            <li>
                                <button>Отчет по дилерам</button>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="header_list">
                    <button className="header_button">Маркетинг</button>
                </li>
                <li className="header_list">
                    <button className="header_button">Создать заявку</button>
                </li>
                <li className="header_list">
                    <button className="header_button">О нас</button>
                </li>
            </ul>
        </nav>
    )
};

export default Header