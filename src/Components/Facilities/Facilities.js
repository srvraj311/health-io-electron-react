import React, {Component} from 'react';
import "./Facilities.css"
class Facilities extends Component {
    render() {
        return (
            <div className = "main-container">
                <div className="heading-main">Facilities</div>
                <div className="details-container">
                    <div className="details-item">
                        <div className = "label"> X-RAY Units </div>
                        <input type = "number" className="fraction-box" value="200" />
                        <div className = "label"> MRI Units </div>
                        <input type = "number" className="fraction-box" value="200" />
                        <div className = "label"> ECG Units </div>
                        <input type = "number" className="fraction-box" value="200" />
                        <div className = "label"> Ultra Sound </div>
                        <input type = "number" className="fraction-box" value="200" />
                        <div className = "label"> Ambulance </div>
                        <input type = "number" className="fraction-box" value="200" />
                         {/*TODO : Add More fields here*/}
                    </div>
                </div>
                <button className="save-button" > Save </button>
            </div>
        );
    }
}

export default Facilities;