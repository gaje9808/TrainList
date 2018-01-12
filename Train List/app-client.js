import { render } from 'react-dom';
import React, {Component} from 'react';
import Navbar from './components/Navbar';
import TrainList from './components/TrainList'

const Train_App = () => {
    return (
        <div>
            <Navbar />
            <TrainList />
        </div>
    );
};

render(<Train_App />, document.getElementById('app'));

module.exports = Train_App;

