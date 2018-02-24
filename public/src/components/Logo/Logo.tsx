import * as React from 'react';
import {Link} from 'react-router-dom';

import './Logo.css';

const Logo = () => (
  <div className='logo'>
    <Link to='/'>
      <img className='logo__img' src='https://avatars2.githubusercontent.com/u/11474330' alt='logo'/>
    </Link>
  </div>
);

export default Logo;
