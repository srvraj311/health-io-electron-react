import React, {Component} from 'react';
import axios from "axios";

class BloodBank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            a_positive : "",
            a_negative : "",
            b_positive : "",
            b_negative : "",
            o_positive : "",
            o_negative : "",
            ab_positive : "",
            ab_negative : "",
            url : this.props.url,
            email : this.props.email,
            licence_id : this.props.licence_id,
            updateStatus : ""
        }
    }

    // Fetch Functions Below
    UNSAFE_componentWillMount() {
        let hospital = JSON.parse(localStorage.getItem("hospital"))
        this.setState({
            a_positive : hospital.blood_bank.a_positive,
            a_negative : hospital.blood_bank.a_negative,
            b_positive : hospital.blood_bank.b_positive,
            b_negative : hospital.blood_bank.b_negative,
            o_positive : hospital.blood_bank.o_positive,
            o_negative : hospital.blood_bank.o_negative,
            ab_positive : hospital.blood_bank.ab_positive,
            ab_negative : hospital.blood_bank.ab_negative
        })
    }

    // Handlers Below
    aposHandler(e){
        this.setState({
            a_positive : e.target.value
        })
    }
    anegHandler(e){
        this.setState({
            a_negative : e.target.value
        })
    }
    bposHandler(e){
        this.setState({
            b_positive : e.target.value
        })
    }
    bnegHandler(e){
        this.setState({
            b_negative : e.target.value
        })
    }
    abposHandler(e){
        this.setState({
            ab_positive : e.target.value
        })
    }
    abnegHandler(e){
        this.setState({
            ab_negative : e.target.value
        })
    }
    oposHandler(e){
        this.setState({
            o_positive : e.target.value
        })
    }
    onegHandler(e){
        this.setState({
            o_negative : e.target.value
        })
    }

    // Update Function Below
    saveData(){
        let details = this.state;
        axios.defaults.headers.post["Content-Type"] = "application/json";
        axios({
            method:"post",
            url: `${this.state.url}admin/hospitals/updateBloodBank`,
            data: JSON.stringify(details)
        }).then((response) => {
            console.log(response.data)
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
            <div className = "main-container">
                <div className="heading-main">Blood Bank</div>
                <div className="details-container">
                    <div className="details-item">
                        <div className = "label"> A-Negative </div>
                        <input type = "number" className="fraction-box" value={this.state.a_negative} onChange={(e) => this.anegHandler(e)}/>
                        <div className = "label"> A-Positive </div>
                        <input type = "number" className="fraction-box" value={this.state.a_positive} onChange={(e) => this.aposHandler(e)}/>
                        <div className = "label"> B-Positive </div>
                        <input type = "number" className="fraction-box" value={this.state.b_positive} onChange={(e) => this.bposHandler(e)}/>
                        <div className = "label"> B-Negative </div>
                        <input type = "number" className="fraction-box" value={this.state.b_negative} onChange={(e) => this.bnegHandler(e)}/>
                        <div className = "label"> AB-Positive </div>
                        <input type = "number" className="fraction-box" value={this.state.ab_positive} onChange={(e) => this.abposHandler(e)}/>
                        <div className = "label"> AB-Negative </div>
                        <input type = "number" className="fraction-box" value={this.state.ab_negative} onChange={(e) => this.abnegHandler(e)} />
                        <div className = "label"> O-Positive </div>
                        <input type = "number" className="fraction-box" value={this.state.o_positive} onChange={(e) => this.oposHandler(e)}/>
                        <div className = "label"> O-Negative </div>
                        <input type = "number" className="fraction-box" value={this.state.o_negative} onChange={(e) => this.onegHandler(e)}/>
                    </div>
                </div>
                <button className="save-button" onClick={(e) => this.saveData()}> Save </button>
                <div className={this.state.updateStatus}/>
            </div>
        );
    }
}

export default BloodBank;