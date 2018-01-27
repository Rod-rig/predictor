import React from 'react';

import './ScoreInput.css';

const ScoreInput = (props) => (
    <input
        id={props.id}
        value={Math.floor(Math.random() * 5)}
        name={props.name}
        readOnly='readOnly'
        autoFocus={(props.autofocus) ? 'autofocus' : ''}
        className="score-input" type='text'
    />
);

export default ScoreInput;