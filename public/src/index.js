import './css/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Matchday from './pages/main/components/Matchday/index';
import SubmitButton from './pages/main/components/submitButton/index';

ReactDOM.render(
    <div className="content">
        <Matchday/>
        <div className="text-center">
            <SubmitButton/>
        </div>
    </div>,
    document.getElementById('root')
);