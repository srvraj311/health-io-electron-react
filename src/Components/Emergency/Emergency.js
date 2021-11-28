import React, {Component} from 'react';
import './Emergency.css'
import axios from "axios";
import EmergencyComponent from "./EmergencyComponent";

class Emergency extends Component {

    constructor(props) {
        super(props);
        this.state = {
            licence_id : this.props.licence_id,
            url : this.props.url,
            email : this.props.email,
            emergencyList : []
        }
    }
    // Fetch and send to Component
    UNSAFE_componentWillMount() {
        this.fetchEmergency()
    }
    fetchEmergency(){
        // axios.defaults.headers.post["Content-Type"] = "application/json";
        let urlFetch = `${this.state.url}hospitals/emergency/${this.state.licence_id}`
        axios({
            method:"get",
            url: urlFetch
        }).then((r) => {
           this.setState({
               emergencyList : r.data
           })
            console.log("Emergency Data Fetched and Saved to Variable")
        }).catch((err) => {
            console.log("Error in Fetching Emergency Data")
        })
    }
    render() {
        console.log("Working")
        return (
            <div className = "main-container">
                <div className="heading-main">Emergency Cases</div>
                <div className="details-container">
                    <div></div>
                </div>
                <div className="emergency-card-holder">
                    <EmergencyComponent emergencyList = {this.state.emergencyList}/>
                </div>
            </div>
        );
    }
}

export default Emergency;