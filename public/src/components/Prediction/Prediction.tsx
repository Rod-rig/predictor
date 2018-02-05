import * as React from 'react';
import itemdayContent from '../../services/1.json';
import ScoreInput from '../ScoreInput/ScoreInput';

import './Prediction.css';

interface ITeam {
    [index: string]: string;
}

export default class Prediction extends React.Component {
    public render() {
        return (
            <div className="prediction">
                <div className="prediction__title">Matchday 1</div>
                {
                    itemdayContent.map((item: ITeam, index: number) => {
                        const homeId = 'homeTeam' + index;
                        const awayId = 'awayTeam' + index;
                        return (
                            <div className='prediction__row' key={index}>
                                <div className="prediction__team justify-end">
                                    <label htmlFor={homeId}>{item.homeTeamName}</label>
                                    <ScoreInput
                                        id={homeId}
                                        name={'homeTeamScores' + homeId}
                                        autofocus={index === 0}
                                    />
                                </div>
                                <div className="prediction__divider">:</div>
                                <div className="prediction__team">
                                    <ScoreInput
                                        id={awayId}
                                        name={'awayTeamScores' + awayId}
                                        autofocus={false}
                                    />
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
