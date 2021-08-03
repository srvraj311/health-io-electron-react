import React, {Component} from 'react';
import './PrimaryItems.css'
import axios from "axios";



class PrimaryItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url : props.url,
            email:props.email,
            licence_id:props.licence_id,
            name : "",
            description: "",
            address : "",
            city_name :"",
            state_name:"",
            geolocation:"",
            is_24_hr_service: "",
            opening_time:"",
            closing_time:"",
            days:"",
            updateStatus : ""
        }
    }

    UNSAFE_componentWillMount() {
        let hospital = JSON.parse(localStorage.getItem("hospital"));
        try {
            this.setState({
                name: hospital.name,
                description: hospital.description,
                address: hospital.address,
                city_name: hospital.city_name,
                state_name: hospital.state_name,
                geolocation: hospital.geolocation,
                is_24_hr_service: hospital.is_24_hr_service,
                opening_time: hospital.opening_time,
                closing_time: hospital.closing_time,
                days: hospital.days
            })
        }catch(error){
            console.log(error)
        }
    }

    serviceTimeHandler = (event) => {
        let val = true;
        val = event.target.value === "true";
        this.setState({
            is_24_hr_service : val
        })
    }

    geoLocationHandler = (event) => {
        this.setState({
            geolocation : event.target.value
        })
    }

    stateNameHandler = (event) => {
        this.setState({
            state_name : event.target.value
        })
    }

    cityNameHandler = (event) => {
        this.setState({
            city_name : event.target.value
        })
    }

    addressHandler = (event) => {
        this.setState({
            address : event.target.value
        })
    }

    descriptionHandler = (event) => {
        this.setState({
            description : event.target.value
        })
    }

    nameHandler = (event) => {
        this.setState({
            name : event.target.value
        })
    }
    daysArr = {
        "Mon":false,
        "Tue":false,
        "Wed":false,
        "Thu":false,
        "Fri":false,
        "Sat":false,
        "Sun":false
    }
    saveDays = () => {
        let days = ""
        for(let prop in this.daysArr){
            if(this.daysArr[prop] === true){
                days += " " + prop.toString()
            }
        }
        this.setState({
            days : days
        })
    }

    toggleAllDays = (val) => {
        if(this.state.days === val){
            this.setState({
                days : ""
            })
        }else {
            this.setState({
                days: val
            })
        }
    }


    onSave = () => {
        axios.defaults.headers.post["Content-Type"] = "application/json";
        const details = {
            email:this.state.email,
            licence_id: this.state.licence_id,
            name : this.state.name,
            description: this.state.description,
            address : this.state.address,
            city_name :this.state.city_name,
            state_name:this.state.state_name,
            geolocation:this.state.geolocation,
            is_24_hr_service:this.state.is_24_hr_service,
            opening_time:this.state.opening_time,
            closing_time:this.state.closing_time,
            days:this.state.days
        }
        axios({
            method:"post",
            url: `${this.state.url}admin/hospitals/updatePrimary`,
            data: JSON.stringify(details)
        }).then((response) => {
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



    render() {
        return (
            <div className="main-container">
                <div className="heading-main"> Primary Details </div>
                <div className="details-container">
                    <div className="details-item">
                        <div className="label">Name:</div>
                        <input type="text" value={this.state.name}
                               onChange={(event) => this.nameHandler(event)} placeholder="Hospital name"  required="true"/>
                    </div>
                    <div className="details-item">
                        <div className="label">Description:</div>
                        <input type="text" value={this.state.description}
                               onChange={(event)=>this.descriptionHandler(event)} placeholder="Hospital Description" required = "true"/>
                    </div>
                </div>
                <button className="save-button" onClick={(event) => this.onSave()}> Save </button>
                <div className="details-container">
                    <div className="details-item">
                        <div className="label">Address : </div>
                        <input type="text" value={this.state.address}
                               onChange={(event)=>this.addressHandler(event)} placeholder="Address" required="true"/>
                    </div>
                    <div className="details-item-ltr">
                        <div className="base">
                            <div className="label">City : </div>
                            <input type="text" value={this.state.city_name}
                                   onChange={(event)=>this.cityNameHandler(event)} placeholder="City" required = "true"/>
                        </div>
                        <div className="base2">
                            <div className="label"> State :</div>
                            <input type="text" value={this.state.state_name}
                                   onChange={(event)=>this.stateNameHandler(event)} placeholder="State" required = "true"/>
                        </div>
                    </div>
                    <div className="details-item">
                        <div className="label">Exact Location : </div>
                        <div className= "ltr-item">
                            <button className="location-button">O</button>
                            <input className="text-box-right" value={this.state.geolocation}
                                   onChange={(event)=>this.geoLocationHandler(event)} type="text" placeholder="Latitude , Longitude"/>
                        </div>
                    </div>
                </div>
                <button className="save-button" onClick={(event) => this.onSave()}> Save </button>
                <div className="details-container">
                    <div className="details-item-radio">
                        <div className="label">Timing :</div>
                        <div className="radio-holder">
                            <div className="label">24 Hours</div>
                            <div>
                                <form>
                                    <input type="radio" id="yes" name="24_hour" value={true}
                                           onChange={(event)=> this.serviceTimeHandler(event)} checked={!!this.state.is_24_hr_service}/>
                                    <label htmlFor="yes">Yes</label><br/>
                                    <input type="radio" id="no" name="24_hour" value={false}
                                           onChange={(event)=> this.serviceTimeHandler(event)} checked={!this.state.is_24_hr_service}/>
                                    <label htmlFor="no">No</label><br/>
                                </form>
                            </div>


                        </div>
                        <div className="radio-holder">
                            <div className="label">Days :</div>
                            <div>
                                <form className="days-form">
                                    <input type="checkbox"  value="All Days Open" onChange={(event) => this.toggleAllDays(event.target.value)} /> All
                                    <input type="checkbox" onChange={(event) => this.daysArr.Mon = !this.daysArr.Mon} value="M" /> Monday
                                    <input type="checkbox" onChange={(event) => this.daysArr.Tue = !this.daysArr.Tue} value="T"/> Tuesday
                                    <input type="checkbox" onChange={(event) => this.daysArr.Wed = !this.daysArr.Wed} value="W"/> Wednesday
                                    <input type="checkbox" onChange={(event) => this.daysArr.Thu = !this.daysArr.Thu} value="T"/> Thursday
                                    <input type="checkbox" onChange={(event) => this.daysArr.Fri = !this.daysArr.Fri} value="F"/> Friday
                                    <input type="checkbox" onChange={(event) => this.daysArr.Sat = !this.daysArr.Sat} value="S"/> Saturday
                                    <input type="checkbox" onChange={(event) => this.daysArr.Sun = !this.daysArr.Mon} value="S"/> Saturday
                                </form>
                            </div>
                            <div className="label"> Days Selected :</div>
                            <div className="label-small">{this.state.days}</div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="save-button" onClick={(event) => {this.saveDays(); this.onSave()}}> Save </button>
                <div className={this.state.updateStatus}/>
            </div>
        );
    }
}


export default PrimaryItems;