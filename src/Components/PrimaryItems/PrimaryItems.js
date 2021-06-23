import React, {Component} from 'react';
import './PrimaryItems.css'

class PrimaryItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            licence_id:"",
            name : "",
            description: "",
            address : "",
            city_name :"",
            state_name:"",
            geolocation:"",
            is_24_hr_service:false,
            opening_time:"",
            closing_time:"",
            days:""
        }
    }



    render() {

        return (
            <div className="main-container">
                <div className="heading-main"> Primary Details </div>
                <div className="details-container">
                    <div className="details-item">
                        <div className="label">Name:</div>
                        <input type="text" placeholder="Hospital name" required="true"/>
                    </div>
                    <div className="details-item">
                        <div className="label">Description:</div>
                        <input type="text" placeholder="Hospital Description" required = "true"/>
                    </div>
                </div>
                <button className="save-button"> Save </button>
                <div className="details-container">
                    <div className="details-item">
                        <div className="label">Address : </div>
                        <input type="text" placeholder="Address" required="true"/>
                    </div>
                    <div className="details-item-ltr">
                        <div className="base">
                            <div className="label">City : </div>
                            <input type="text" placeholder="Hospital Description" required = "true"/>
                        </div>
                        <div className="base2">
                            <div className="label"> State :</div>
                            <input type="text" placeholder="Hospital Description" required = "true"/>
                        </div>

                    </div>
                    <div className="details-item">
                        <div className="label">Exact Location : </div>
                        <div className= "ltr-item">
                            <button className="location-button">O</button>
                            <input className="text-box-right" type="text" placeholder="Latitude , Longitude"/>
                        </div>
                    </div>
                </div>
                <button className="save-button"> Save </button>
                <div className="details-container">
                    <div className="details-item-radio">
                        <div className="label">Timing :</div>
                        <div className="radio-holder">
                            <div className="label">24 Hours</div>
                            <div>
                                <form>
                                    <input type="radio" id="yes" name="24_hour" value="Yes"/>
                                    <label htmlFor="yes">Yes</label><br/>
                                    <input type="radio" id="no" name="24_hour" value="No"/>
                                    <label htmlFor="no">No</label><br/>
                                </form>
                            </div>


                        </div>
                        <div className="radio-holder">
                            <div className="label">Days :</div>
                            <div>
                                <form className="days-form">
                                    <input type="checkbox" value="all"/> All
                                    <input type="checkbox" value="M"/> Monday
                                    <input type="checkbox" value="T"/> Tuesday
                                    <input type="checkbox" value="W"/> Thursday <br/>
                                    <input type="checkbox" value="T"/> Wednesday
                                    <input type="checkbox" value="F"/> Thursday
                                    <input type="checkbox" value="S"/> Friday
                                    <input type="checkbox" value="S"/> Saturday
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
                <button className="save-button"> Save </button>
            </div>
        );
    }
}

export default PrimaryItems;