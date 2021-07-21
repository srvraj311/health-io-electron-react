import React, {Component} from 'react';
import './Emergency.css'

class Emergency extends Component {

    render() {
        return (
            <div className = "main-container">
                <div className="heading-main">Emergency Cases</div>
                <div className="details-container">
                    <div></div>
                </div>
                <div className="emergency-card-holder">
                    <div className="emergency-card">

                    </div>
                    <div className="emergency-card">

                    </div>
                    <div className="emergency-card">

                    </div>
                </div>
            </div>
        );
    }
}

export default Emergency;