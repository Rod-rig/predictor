import React from 'react';
import ScoreInput from '../ScoreInput/ScoreInput';
import itemdayContent from 'Services/1';

import './Prediction.css';

export default class Prediction extends React.Component {
    render() {
        return (
            <div className="prediction">
                <div className="prediction__title">Matchday 1</div>
                {
                    itemdayContent.map(function (item, index) {
                        let homeId = 'homeTeam' + index,
                            awayId = 'awayTeam' + index;
                        return (
                            <div className='prediction__row' key={index}>
                                <div className="prediction__team justify-end">
                                    <label htmlFor={homeId}>{item.homeTeamName}</label>
                                    <ScoreInput
                                        id={homeId}
                                        name={'homeTeamScores' + homeId}
                                        autofocus={index === 0}/>
                                </div>
                                <div className="prediction__divider">:</div>
                                <div className="prediction__team">
                                    <ScoreInput
                                        id={awayId}
                                        name={'awayTeamScores' + awayId}/>
                                    <label htmlFor={awayId}>{item.awayTeamName}</label>
                                </div>
                            </div>
                        );
                    })
                }
                <div className="text-center">
                    <button className="prediction__submit" type="submit">Send</button>
                </div>
            </div>
        );
    }
}