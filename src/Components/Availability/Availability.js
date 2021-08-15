import React, {Component} from 'react';
import './Availibility.css'
import axios from "axios";

class Availability extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url : props.url,
            email:props.email,
            licence_id:props.licence_id,
            vacant_bed : "",
            no_of_bed : "",
            vacant_icu : "",
            icu : "",
            vacant_ccu : "",
            ccu : "",
            vacant_ventilators : "",
            ventilators : "",
            oxygen_cylinders : "",
            vacant_oxygen_cylinders : "",
            updateStatus : ""
        }
    }
    componentWillMount() {
        let hospital = JSON.parse(localStorage.getItem("hospital"))
        this.setState({
            vacant_bed : hospital.vacant_bed,
            no_of_bed : hospital.no_of_bed,
            vacant_icu : hospital.vacant_icu,
            icu : hospital.icu,
            vacant_ccu : hospital.vacant_ccu,
            ccu : hospital.ccu,
            vacant_ventilators : hospital.vacant_ventilators,
            ventilators : hospital.ventilators,
            oxygen_cylinders : hospital.oxygen_cylinders,
            vacant_oxygen_cylinders : hospital.vacant_oxygen_cylinders
        })

    }
    saveData(){
        let details = {
            email:this.state.email,
            licence_id: this.state.licence_id,
            vacant_bed : this.state.vacant_bed,
            no_of_bed : this.state.no_of_bed,
            vacant_icu : this.state.vacant_icu,
            icu : this.state.icu,
            vacant_ccu : this.state.vacant_ccu,
            ccu : this.state.ccu,
            vacant_ventilators : this.state.vacant_ventilators,
            ventilators : this.state.ventilators,
            oxygen_cylinders : this.state.oxygen_cylinders,
            vacant_oxygen_cylinders : this.state.vacant_oxygen_cylinders,
        }
        axios.defaults.headers.post["Content-Type"] = "application/json";
        axios({
            method:"post",
            url: `${this.state.url}admin/hospitals/updateAvailability`,
            data: JSON.stringify(details)
        }).then((response) => {
            this.updateLastUpdated()
            this.setState({
                updateStatus : "image-checked"
            })
            window.setTimeout(() => {
                this.setState({
                    updateStatus : ""
                })
            }, 1000)
        }).catch((error)=>{
            console.log(error)

            this.setState({
                updateStatus : "image-error"
            })
        });
    }


    updateLastUpdated(){
        let date = new Date()
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const finalTime = hour + ":" + minutes + ":" + seconds + " - " + day + "/" + month + "/" + year;
        localStorage.setItem("last_updated", finalTime)
    }
    render() {
        return (
            <div className = "main-container">
                <div className="heading-main">Availabilities</div>
                <div className="details-container">
                    <div className="details-item">
                        <div className="label">Beds Available : </div>
                        <div className="fraction-box-holder">
                            <p>Available</p>
                            <input type="number"  className="fraction-box" value={this.state.vacant_bed} onChange={(event) => {
                                this.setState({
                                    vacant_bed : event.target.value
                                })
                            }}/>
                            <p>Out-of</p>
                            <input type ="number" className="fraction-box" value={this.state.no_of_bed} onChange={(event) => {
                                this.setState({
                                    no_of_bed : event.target.value
                                })
                            }}/>
                            <p>Total</p>
                        </div>
                    </div>
                    <div className="details-item">
                        <div className="label">ICU Available : </div>
                        <div className="fraction-box-holder">
                            <p>Available</p>
                            <input className="fraction-box" type ="number" value={this.state.vacant_icu} onChange={(event) => {
                                this.setState({
                                    vacant_icu : event.target.value
                                })
                            }}/>
                            <p>Out-of</p>
                            <input className="fraction-box" type ="number" value={this.state.icu} onChange={(event) => {
                                this.setState({
                                    icu : event.target.value
                                })
                            }}/>
                            <p>Total</p>
                        </div>
                    </div>
                    <div className="details-item">
                        <div className="label">CCU Available : </div>
                        <div className="fraction-box-holder">
                            <p>Available</p>
                            <input className="fraction-box" type ="number" value={this.state.vacant_ccu} onChange={(event) => {
                                this.setState({
                                    vacant_ccu : event.target.value
                                })
                            }}/>
                            <p>Out-of</p>
                            <input className="fraction-box" type ="number" value={this.state.ccu} onChange={(event) => {
                                this.setState({
                                    ccu : event.target.value
                                })
                            }}/>
                            <p>Total</p>
                        </div>
                    </div>
                    <div className="details-item">
                        <div className="label">Ventilator Available : </div>
                        <div className="fraction-box-holder">
                            <p>Available</p>
                            <input className="fraction-box" type ="number" value={this.state.vacant_ventilators} onChange={(event) => {
                                this.setState({
                                    vacant_ventilators : event.target.value
                                })
                            }}/>
                            <p>Out-of</p>
                            <input className="fraction-box" type ="number" value={this.state.ventilators} onChange={(event) => {
                                this.setState({
                                    ventilators : event.target.value
                                })
                            }}/>
                            <p>Total</p>
                        </div>
                    </div>
                    <div className="details-item">
                        <div className="label">Oxygen Cylinder's Available : </div>
                        <div className="fraction-box-holder">
                            <p>Available</p>
                            <input className="fraction-box" type ="number" value={this.state.vacant_oxygen_cylinders} onChange={(event) => {
                                this.setState({
                                    vacant_oxygen_cylinders : event.target.value
                                })
                            }}/>
                            <p>Out-of</p>
                            <input className="fraction-box" type ="number" value={this.state.oxygen_cylinders} onChange={(event) => {
                                this.setState({
                                    oxygen_cylinders : event.target.value
                                })
                            }}/>
                            <p>Total</p>
                        </div>
                    </div>
                </div>
                <button className="save-button" onClick={(event) => this.saveData()}> Save </button>
                <div className={this.state.updateStatus}/>
            </div>
        );
    }
}

export default Availability;