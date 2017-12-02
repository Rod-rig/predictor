import React from 'react';
import PropTypes from 'prop-types';

import './_styles.css';

export default class ScoreInput extends React.Component {
    static typeOnlyNum(e) {
        return e.target.value;
    }

    render() {
        return <input
            id={this.props.id}
            autoFocus={(this.props.autofocus) ? 'autofocus' : ''}
            className="score-input" type='text'
            onChange={this.typeOnlyNum}
        />;
    }
}

ScoreInput.propTypes = {
    id: PropTypes.string,
    autofocus: PropTypes.bool
};