import React, {Component} from 'react';
import './Home.css'
import PrimaryItems from "../PrimaryItems/PrimaryItems";
import Availability from "../Availability/Availability";
import {Redirect} from "react-router-dom";
import axios from "axios";
import classNames from "classnames";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            licence_id: props.licence_id,
            email:props.email,
            url:"",
            componentNumber : 1,
            primaryDetails : "selected",
            availabilities : "",
            facilities : "",
            bloodBank : "",
            emergency : ""
        }

    }
    // Function to get URL , EMAIL, LICENCE_ID from localstorage and then save to state and retrieve them
    UNSAFE_componentWillMount(){
        // Get Hospital and Save to localStorage
        try {
            let licence_id = JSON.parse(localStorage.getItem("userdata")).licence_id
            let email = JSON.parse(localStorage.getItem("userdata")).email
            let url = JSON.parse(localStorage.getItem("userdata")).url
            this.updateStateWithBaseData(licence_id, email, url)
        } catch (error){
            console.log(error)
            this.logout();
        }

    }
    updateStateWithBaseData(licence_id, email, url){
        this.setState({
            url:url,
            licence_id:licence_id,
            email:email
        })
    }

    // Make a connection and Get hospital Initially
     componentDidMount(){
        const finalUrl = this.state.url + "admin/hospitals/getHospital/" + this.state.licence_id
        axios.get(finalUrl).then((response) => {
            this.saveHospital(response.data);
        }).catch((error) =>{
            console.log(error);
        });
    }

    saveHospital = (data) => {
        localStorage.setItem("hospital", JSON.stringify(data))
    }
    setComponent = (view) => {
        switch (view){
            case 1:
                return <PrimaryItems url = {this.state.url} licence_id = {this.state.licence_id} email = {this.state.email} />
            case 2:
                return <Availability {...this.state}/>
            default:
                return <PrimaryItems/>
        }
    }
    logout = () => {
        localStorage.clear();
        Window.event.reload();
    }

    render() {
        if(localStorage.length === 0){
           return  <Redirect to="/"  />
        }
        return (
            <div className="container-homeScreen">
                <div className="menuBar">
                    <div className="heading"> Health.IO </div>
                    <div className="sub-heading"> Live Your Choices </div>
                    <div className="menu-container">
                        {/*TODO : Change Selected Clause here*/}
                        <div className={"menu-item " + this.state.primaryDetails } onClick={(event) => {
                            this.setState({
                                componentNumber : 1,
                                primaryDetails : "selected",
                                availabilities : "",
                                facilities : "",
                                bloodBank : "",
                                emergency : ""
                            })
                        }}>Primary Details</div>
                        <div className={"menu-item " + this.state.availabilities} onClick={(event)=> {
                            this.setState({
                                componentNumber : 2,
                                primaryDetails : "",
                                availabilities : "selected",
                                facilities : "",
                                bloodBank : "",
                                emergency : ""
                            })
                        }}>Availabilities</div>

                        <div className="menu-item">Facilities</div>
                        <div className="menu-item">Blood-Bank</div>
                        <div className="menu-item last">Emergency</div>
                    </div>
                </div>

                <div className="body-container">
                    {this.setComponent(this.state.componentNumber)}
                </div>
            </div>
        );
    }
}

export default Home;