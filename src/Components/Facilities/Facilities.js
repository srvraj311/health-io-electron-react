import React, {Component} from 'react';
import "./Facilities.css"
import axios from "axios";
class Facilities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xray : "",
            mri : "",
            ecg : "",
            ultrasound: "",
            ambulance : "",
            url : this.props.url,
            email : this.props.email,
            licence_id : this.props.licence_id,
            updateStatus : ""
        }
    }
    // fetch Function below

    UNSAFE_componentWillMount() {
        let hospital = JSON.parse(localStorage.getItem("hospital"))
        try {
            this.setState({
                xray: hospital.x_ray,
                mri: hospital.mri,
                ecg: hospital.ecg,
                ultrasound: hospital.ultra_sound,
                ambulance: hospital.vacant_ambulance
            })
        } catch (err) {
            console.log(err)
        }
    }

    // Handlers Below
    xrayHandler(event){
        this.setState({
            xray : event.target.value
        })
    }

    mriHandler(event){
        this.setState({
            mri : event.target.value
        })
    }

    ecgHandler(event){
        this.setState({
            ecg : event.target.value
        })
    }

    ultraSoundHandler(event){
        this.setState({
            ultrasound : event.target.value
        })
    }

    ambulanceHandler(event){
        this.setState({
            ambulance : event.target.value
        })
    }
    // Update Function below
    saveDetails(){
        axios.defaults.headers.post["Content-Type"] = "application/json";
        let details = this.state
        axios({
            method:"post",
            url: `${this.state.url}admin/hospitals/updateFacility`,
            data: JSON.stringify(details)
        }).then((res) => {
            this.setState({
                updateStatus : "image-checked"
            })

            window.setTimeout(() => {
                this.setState({
                    updateStatus : ""
                })
            }, 1000)
        }).catch((err) => {
            console.log("Error")
        })

    }
    render() {
        console.log(this.state)
        return (
            <div className = "main-container">
                <div className="heading-main">Facilities</div>
                <div className="details-container">
                    <div className="details-item">
                        <div className = "label"> X-RAY Units </div>
                        <input type = "number" className="fraction-box" value={this.state.xray} onChange={ (event) => this.xrayHandler(event)}/>
                        <div className = "label"> MRI Units </div>
                        <input type = "number" className="fraction-box" value={this.state.mri} onChange={ (event) => this.mriHandler(event)}/>
                        <div className = "label"> ECG Units </div>
                        <input type = "number" className="fraction-box" value={this.state.ecg} onChange={ (event) => this.ecgHandler(event)} />
                        <div className = "label"> Ultra Sound </div>
                        <input type = "number" className="fraction-box" value={this.state.ultrasound} onChange={ (event) => this.ultraSoundHandler(event)}/>
                        <div className = "label"> Ambulance </div>
                        <input type = "number" className="fraction-box" value={this.state.ambulance} onChange={ (event) => this.ambulanceHandler(event)}/>
                         {/*TODO : Add More fields here*/}
                    </div>
                </div>
                <button className="save-button" onClick={(e) => this.saveDetails()} > Save </button>
                <div className={this.state.updateStatus}/>
            </div>
        );
    }
}

export default Facilities;