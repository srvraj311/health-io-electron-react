import React, { Component } from "react";
import "./Home.css";
import PrimaryItems from "../PrimaryItems/PrimaryItems";
import Availability from "../Availability/Availability";
import { Redirect } from "react-router-dom";
import axios from "axios";
import BloodBank from "../BloodBank/BloodBank";
import Facilities from "../Facilities/Facilities";
import Emergency from "../Emergency/Emergency";
import CustomDialog from "../../UiComponents/CustomDialog";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      licence_id: props.licence_id,
      email: props.email,
      url: "",
      componentNumber: 1,
      primaryDetails: "selected",
      availabilities: "",
      facilities: "",
      bloodBank: "",
      emergency: "",
      logout: "",
      lastUpdated: "",
    };
  }
  // Function to get URL , EMAIL, LICENCE_ID from localstorage and then save to state and retrieve them
  UNSAFE_componentWillMount() {
    // Get Hospital and Save to localStorage
    try {
      let licence_id = JSON.parse(localStorage.getItem("userdata")).licence_id;
      let email = JSON.parse(localStorage.getItem("userdata")).email;
      let url = JSON.parse(localStorage.getItem("userdata")).url;
      this.setState({
        lastUpdated: localStorage.getItem("last_updated"),
      });
      this.updateStateWithBaseData(licence_id, email, url);
    } catch (error) {
      console.log(error);
      this.logout();
    }
  }

  updateStateWithBaseData(licence_id, email, url) {
    this.setState({
      url: url,
      licence_id: licence_id,
      email: email,
    });
  }

  // Make a connection and Get hospital Initially
  componentDidMount() {
    const finalUrl =
      this.state.url + "admin/hospitals/getHospital/" + this.state.licence_id;
    axios
      .get(finalUrl)
      .then((response) => {
        this.saveHospital(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  saveHospital = (data) => {
    localStorage.setItem("hospital", JSON.stringify(data));
  };
  setComponent = (view) => {
    switch (view) {
      case 1:
        return (
          <PrimaryItems
            url={this.state.url}
            licence_id={this.state.licence_id}
            email={this.state.email}
          />
        );
      case 2:
        return (
          <Availability
            url={this.state.url}
            licence_id={this.state.licence_id}
            email={this.state.email}
          />
        );
      case 3:
        return (
          <Facilities
            url={this.state.url}
            licence_id={this.state.licence_id}
            email={this.state.email}
          />
        );
      case 4:
        return (
          <BloodBank
            url={this.state.url}
            licence_id={this.state.licence_id}
            email={this.state.email}
          />
        );
      case 5:
        return (
          <Emergency
            url={this.state.url}
            licence_id={this.state.licence_id}
            email={this.state.email}
          />
        );
      default:
        return <PrimaryItems />;
    }
  };
  logout = () => {
      localStorage.clear();
      this.setState({
        logout: "true",
      });
  };

  render() {
    if (localStorage.length === 0) {
      return <Redirect to="/" />;
    }
    this.state.lastUpdated = localStorage.getItem("last_updated");

    return (
      <div className="container-homeScreen">
        <div className="menuBar">
          <div className="heading"> Health.IO </div>
          <div className="sub-heading"> Live Your Choices </div>
          <div className="menu-container">
            <div
              className={"menu-item " + this.state.primaryDetails}
              onClick={(event) => {
                this.setState({
                  componentNumber: 1,
                  primaryDetails: "selected",
                  availabilities: "",
                  facilities: "",
                  bloodBank: "",
                  emergency: "",
                });
              }}
            >
              Primary Details
            </div>
            <div
              className={"menu-item " + this.state.availabilities}
              onClick={(event) => {
                this.setState({
                  componentNumber: 2,
                  primaryDetails: "",
                  availabilities: "selected",
                  facilities: "",
                  bloodBank: "",
                  emergency: "",
                });
              }}
            >
              Availabilities
            </div>
            <div
              className={"menu-item " + this.state.facilities}
              onClick={(event) => {
                this.setState({
                  componentNumber: 3,
                  primaryDetails: "",
                  availabilities: "",
                  facilities: "selected",
                  bloodBank: "",
                  emergency: "",
                });
              }}
            >
              Facilities
            </div>
            <div
              className={"menu-item " + this.state.bloodBank}
              onClick={(event) => {
                this.setState({
                  componentNumber: 4,
                  primaryDetails: "",
                  availabilities: "",
                  facilities: "",
                  bloodBank: "selected",
                  emergency: "",
                });
              }}
            >
              Blood Bank
            </div>
            <div
              className={"menu-item " + this.state.emergency}
              onClick={(event) => {
                this.setState({
                  componentNumber: 5,
                  primaryDetails: "",
                  availabilities: "",
                  facilities: "",
                  bloodBank: "",
                  emergency: "selected",
                });
              }}
            >
              {" "}
              Emergency{" "}
            </div>
          </div>
          <div style={{textAlign:"center"}}>
            <CustomDialog color={"white"} buttonTitle={"Logout"} title={"Confirm Logout"} body={"Are you sure you want to logout ?"} callback={this.logout}/>
          </div>

          <div className="menu-info-item">
            Last Updated : {this.state.lastUpdated} <br/> Hospital Licence ID :{" "}
            {this.state.licence_id}
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
