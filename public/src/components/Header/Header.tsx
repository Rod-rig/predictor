import * as React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../Logo/Logo';

import './Header.css';

const Header = () => (
    <header className='header'>
        <Logo/>
        <div className='header__menu'>
            <Link className='header__link' to='/predictions'>Predictions</Link>
            <Link className='header__link' to='/statistics/england'>Statistics</Link>
            <Link className='header__link' to='/dwdq/ccc'>ssss</Link>
        </div>
    </header>
);

export default Header;
