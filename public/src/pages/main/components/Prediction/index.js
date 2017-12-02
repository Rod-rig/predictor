import React from 'react';
import ScoreInput from './../ScoreInput/index';
import PropTypes from 'prop-types';

import './_styles.css';

export default class Prediction extends React.Component {
    render() {
        let homeId = 'homeTeam' + this.props.id,
            awayId = 'awayTeam' + this.props.id;
        return <div className="prediction">
            <div className="prediction__team justify-end">
                <label htmlFor={homeId}>{this.props.match.homeTeamName}</label>
                <ScoreInput id={homeId} autofocus={this.props.autofocus}/>
            </div>
            <div className="prediction__divider">:</div>
            <div className="prediction__team">
                <ScoreInput id={awayId}/>
                <label htmlFor={awayId}>{this.props.match.awayTeamName}</label>
            </div>
        </div>;
    }
}

Prediction.propTypes = {
    id: PropTypes.number,
    match: PropTypes.shape({
        homeTeamName: PropTypes.string.isRequired,
        awayTeamName: PropTypes.string.isRequired
    }),
    autofocus: PropTypes.bool
};