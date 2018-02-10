import * as React from 'react';

import './ScoreInput.css';

export interface IScore {
    id: string;
    name: string;
    autofocus: boolean;
}

export default class ScoreInput extends React.Component<IScore, {}> {
    public static typeOnlyNum(e: any): string {
        return e.target.value;
    }

    public render() {
        return (
            <input
                id={this.props.id}
                value={Math.floor(Math.random() * 5)}
                name={this.props.name}
                readOnly={true}
                autoFocus={(this.props.autofocus)}
                className='score-input'
                type='text'
                onChange={ScoreInput.typeOnlyNum}
            />
        );
    }
}
