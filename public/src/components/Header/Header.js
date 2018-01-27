import React from 'react';
import Logo from '../Logo/Logo';

import './Header.css';

const Header = () => (
    <header className='header'>
        <Logo/>
        <div className='header__menu'>
            <a className='header__link' href=''>Predictions</a>
            <a className='header__link' href=''>Statistics</a>
        </div>
    </header>
);

export default Header;