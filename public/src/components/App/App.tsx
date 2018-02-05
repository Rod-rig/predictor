import * as React from 'react';
import Header from '../Header/Header';
import Prediction from '../Prediction/Prediction';
import TableContainer from '../TableContainer/TableContainer';

export default class App extends React.Component {
    public render() {
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
