import React from "react";

import Logo from "../../images/logo.png";

function Header () {

    return (
        <nav>
            <ul>
                <li>
                    < Logo />
                </li>

                <li>
                    <button>
                        <p> Меню </p>
                    </button>
                </li>
            </ul>
        </nav>
    )
};

export default Header