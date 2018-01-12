import React, { Component } from 'react';

const TrainELemStyle = {
    height: '30px',
    width: '800px',
    textAlign: 'left',
    border: '1px solid #aaaaaa'
};

const inputBoxStyle = {
    display: 'inline-block',
    width: '60px',
    height: '15px',
    margin: '5px',
    border: '1px solid #3333'
};

class Train extends Component {
    render() {
        const {id, data, ondropFunc, allowDropFunc} = this.props;
        const key = id + 1;
        const trainData = data;
        const ArrivalId = 'Arrival' + key;
        const DepartureId = 'Departure' + key;
        if (!trainData.locomotive && !trainData.carriage) {
            return null;
        }
        return (
            <div
                className="TrainELem"
                id={key}
                style={TrainELemStyle}
                onDrop={ondropFunc}
                onDragOver={allowDropFunc}
            >
                <span>
                    Train Number {key}({trainData.locomotive} locomotives and {trainData.carriage} carriages)
                </span>
                <span style={{ float: 'right' }}>
                  <input type="text" style={inputBoxStyle} id={ArrivalId} />
                  <input type="text" style={inputBoxStyle} id={DepartureId} />
                </span>
            </div>
        );
    }
}

export default Train;