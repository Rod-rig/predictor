import React from 'react';
import Prediction from '../Prediction/Prediction';
import matchdayContent from 'Services/1';

import './Matchday.css';

export default class Matchday extends React.Component {
    render() {
        return (
            <div className="matchday">
                <div className="matchday__title">Matchday 1</div>
                {
                    matchdayContent.map(function (item, index) {
                        return <Prediction
                            key={index}
                            id={index}
                            match={matchdayContent[index]}
                            autofocus={index === 0}
                        />;
                    })
                }
            </div>
        );
    }
}
