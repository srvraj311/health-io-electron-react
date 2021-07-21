import React, {Component} from 'react';

class BloodBank extends Component {
    render() {
        return (
            <div className = "main-container">
                <div className="heading-main">Blood Bank</div>
                <div className="details-container">
                    <div className="details-item">
                        <div className = "label"> A-Negative </div>
                        <input type = "number" className="fraction-box" value="200" />
                        <div className = "label"> A-Positive </div>
                        <input type = "number" className="fraction-box" value="200" />
                        <div className = "label"> B-Positive </div>
                        <input type = "number" className="fraction-box" value="200" />
                        <div className = "label"> B-Negative </div>
                        <input type = "number" className="fraction-box" value="200" />
                        <div className = "label"> AB-Positive </div>
                        <input type = "number" className="fraction-box" value="200" />
                        <div className = "label"> AB-Negative </div>
                        <input type = "number" className="fraction-box" value="200" />
                        <div className = "label"> O-Positive </div>
                        <input type = "number" className="fraction-box" value="200" />
                        <div className = "label"> O-Negative </div>
                        <input type = "number" className="fraction-box" value="200" />
                    </div>
                </div>
                <button className="save-button" > Save </button>
            </div>
        );
    }
}

export default BloodBank;