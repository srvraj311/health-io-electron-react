import React, {Component} from 'react';
import './Home.css'
import PrimaryItems from "../PrimaryItems/PrimaryItems";
import Availability from "../Availability/Availability";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            componentNumber : 1
        }
    }
    setComponent = (view) => {
        switch (view){
            case 1:
                return <PrimaryItems/>
            case 2:
                return <Availability/>
            default:
                return <PrimaryItems/>
        }
    }
    render() {
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