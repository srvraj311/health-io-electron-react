import React, {Component} from 'react';
import './Home.css'
import PrimaryItems from "../PrimaryItems/PrimaryItems";
import Availability from "../Availability/Availability";
import {Redirect} from "react-router-dom";
import axios from "axios";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            licence_id: props.licence_id,
            email:props.email,
            url:"",
            componentNumber : 1
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
            switch (response.status){
                case 500:
                    console.alert("There is an Error, Kindly Check your LICENCE ID or contact Developer with code ERR_ID_MISMATCH_ADMIN_SIDE");
                    break;
                case 404:
                    console.alert("Network Error, Check Internet");
                    break;
                case 400:
                    console.alert("Bad Request, You need to Login Again");
                    this.logout();
                    break;
                case 200:
                    this.saveHospital(response.data);
                    break;
                default:
                    console.log("Unable To fetch Hospital, Try Again After Some Time");
                    break;
            }
        }).catch((error) =>{
            console.log(error.data);
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
    // Function to get Hospital beforehand and Store onto


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
                        <div className="menu-item" onClick={(event) => {
                            this.setState({
                                componentNumber : 1
                            })
                        }}>Primary Details</div>

                        <div className="menu-item" onClick={(event)=> {
                            this.setState({
                                componentNumber : 2
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