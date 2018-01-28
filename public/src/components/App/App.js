import React from 'react';
import Header from '../Header/Header';
import TableContainer from '../TableContainer/TableContainer';
import Prediction from '../Prediction/Prediction';

export default class App extends React.Component {
    render() {
        return (
            <div className='content'>
                <Header/>

                <TableContainer/>

                <form action='/predictions' method='post' style={{display: 'none'}}>
                    <input type='hidden' value={1} name='matchday'/>
                    <Prediction/>
                </form>
            </div>
        );
    }
}
