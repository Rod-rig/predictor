import './css/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Matchday from './components/Matchday/Matchday';
import SubmitButton from './components/SubmitButton/SubmitButton';

ReactDOM.render(
    <div className="content">
        <form action="/predictions" method="post">
            <input type="hidden" value={1} name='matchday'/>
            <Matchday number={1}/>
            <div className="text-center">
                <SubmitButton/>
            </div>
        </form>
    </div>,
    document.getElementById('root')
);