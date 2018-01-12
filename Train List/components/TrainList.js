import React, {Component} from 'react';
import Train from './Train';

const outerContainerStyle = {
    width: '800px',
    height: '500px',
    border: '1px dashed #aaaaaa'
};

const TrainListStyle = {
    width: '800px',
    height: '370px'
};

const dragDropAreaStyle = {
    width: '780px',
    height: '100px',
    padding: '10px',
    border: '1px dashed #aaaaaa'
};

class TrainList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            TRAINS: [],
            locomotive: 0,
            carriage: 0
        };
        this.dropOnTrain = this.dropOnTrain.bind(this);
        this.drop = this.drop.bind(this);
        this.addbuttonClicked = this.addbuttonClicked.bind(this);
        this.calculateTrackClicked = this.calculateTrackClicked.bind(this);
    }

    calculateTrackClicked() {
        const numTrain = this.state.TRAINS.length;
        const arr = [];
        const dep = [];
        for (let i = 1; i <= numTrain; i++) {
            const arrTime = document.getElementById('Arrival' + i).value;
            const depTime = document.getElementById('Departure' + i).value;
            arr.push(arrTime);
            dep.push(depTime);
        }
        alert('Max number of platforms - ' + this.getmaxPlatforms(arr, dep, numTrain));
    }

    getmaxPlatforms(arr, dep, numTrain) {
        let platform_needed = 0, maxPlatforms = 0;
        let i = 0, j = 0;
        while (i < numTrain && j < numTrain) {
            if (arr[i] < dep[j]) {
                platform_needed++;
                i++;
                if (platform_needed > maxPlatforms) maxPlatforms = platform_needed;
            } else {
                platform_needed--;
                j++;
            }
        }
        return maxPlatforms;
    }

    dropOnTrain(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData('text');
        const id = ev.currentTarget.id;
        const Trains = this.state.TRAINS;
        const Train = Trains[id - 1];
        if (data === 'locomotive') {
            Train.locomotive = Train.locomotive + 1;
            if (Train.locomotive > 1) {
                alert('Invalid train. There should be only one locomotive.');
            } else {
                alert(data + ' added suceessfully.');
            }
        } else {
            Train.carriage = Train.carriage + 1;
            this.setState({ TRAINS: Trains });
            alert(data + ' added suceessfully.');
        }
    }

    addbuttonClicked() {
        const self = this;
        const {locomotive, carriage, TRAINS} = this.state;
        if (locomotive === 0 || locomotive > 1) {
            alert('Invalid train. There should be one locomotive. Please try again');
            this.setState({
                locomotive: 0,
                carriage: 0
            });
            return;
        } else if (carriage === 0) {
            alert('Invalid train. There should be one carriage.');
            return;
        }
        const TRAIN = {
            locomotive: locomotive,
            carriage: carriage
        };
        TRAINS.push(TRAIN);
        this.setState({ TRAINS: TRAINS });
        alert('Train added successfully');
        this.setState({
            locomotive: 0,
            carriage: 0
        });
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData('text', ev.target.id);
    }

    drop(ev) {
        ev.preventDefault();
        const {locomotive, carriage} = this.state;
        const data = ev.dataTransfer.getData('text');
        const id = ev.currentTarget.id;
        if (data === 'locomotive') {
            const locomotive = this.state.locomotive + 1;
            if (locomotive > 1) {
                alert('Invalid train. There should be only one locomotive.');
            } else {
                this.setState({ locomotive: locomotive });
                alert(data + ' added suceessfully. Please click add train button to add train to the list');
            }
        } else {
            const carriage = this.state.carriage + 1;
            this.setState({ carriage: carriage });
            alert(data + ' added suceessfully. Please click add train button to add train to the list');
        }
    }

    render() {
        const self = this;
        const TrainList = this.state.TRAINS.map(function(result, key) {
            return (
                <Train
                    id={key}
                    data={result}
                    ondropFunc={self.dropOnTrain}
                    allowDropFunc={self.allowDrop}
                />
            );
        });

        return (
            <div>
                <center>
                    <p>Build Trains here</p>
                    <div id="div1" style={outerContainerStyle}>
                        <div className="row" style={TrainListStyle}>
                            {TrainList}
                        </div>
                        <div style={dragDropAreaStyle} onDrop={this.drop} onDragOver={this.allowDrop}>
                            <p>Drag Drop Elements here to create train</p>
                        </div>
                    </div>
                </center>
                <br />
                <center>
                    <img
                        id="locomotive"
                        src="./locomotive.png"
                        draggable="true"
                        onDragStart={this.drag}
                        width="60"
                        height="60"
                        style={{ margin: '10px' }}
                    />
                    <img
                        id="carriage"
                        src="./carriage.png"
                        draggable="true"
                        onDragStart={this.drag}
                        width="60"
                        height="60"
                        style={{ margin: '10px' }}
                    />
                </center>
                <div className="row">
                    <center>
                        <button onClick={this.addbuttonClicked}>Add train</button>
                        <button onClick={this.calculateTrackClicked}>Calculate tracks</button>
                    </center>
                </div>
            </div>
        );
    }
};

export default TrainList;