import React from 'react';
import Prediction from './../Prediction/index';
import matchdayContent from './../../../../services/1';

import './_styles.css';

export default class Matchday extends React.Component {
    render() {
        return <div className="matchday">
            <div className="matchday__title">Matchday 1</div>
            <form action="" method="post">
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
            </form>
        </div>;
    }
}
