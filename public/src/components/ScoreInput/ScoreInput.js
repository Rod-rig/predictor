import React from 'react';
import PropTypes from 'prop-types';

import './ScoreInput.css';

export default class ScoreInput extends React.Component {
    static typeOnlyNum(e) {
        return e.target.value;
    }

    render() {
        return (
            <input
                id={this.props.id}
                value={Math.floor(Math.random() * 5)}
                name={this.props.name}
                readOnly='readOnly'
                autoFocus={(this.props.autofocus) ? 'autofocus' : ''}
                className="score-input" type='text'
                onChange={this.typeOnlyNum}
            />
        );
    }
}

ScoreInput.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    autofocus: PropTypes.bool
};