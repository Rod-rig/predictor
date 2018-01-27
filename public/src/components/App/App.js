import React from 'react';
import Header from '../Header/Header';
import Prediction from '../Prediction/Prediction';

export default class App extends React.Component {
    render() {
        return (
            <div className="content">
                <Header/>
                <form action="/predictions" method="post">
                    <input type="hidden" value={1} name='matchday'/>
                    <Prediction/>
                </form>
            </div>
        );
    }
}
