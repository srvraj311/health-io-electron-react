import React, {Component } from 'react';
import '../../CSS/App/App.css'
import axios from "axios";
import {Redirect} from "react-router-dom";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password:"",
            licence_id:"",
            message:"Log-In to Continue",
            color:"#18865e",
            url:"",
            redirect:null
        }
    }
    updateState = (url) => {
        this.setState({
            url : url
        })
    }

    UNSAFE_componentWillMount() {
        axios.get("https://raw.githubusercontent.com/srvraj311/health.io-API/main/url.json").then((response) => {
           this.updateState(response.data.url)
        }).catch((error)=>{
            this.updateState("http://15.206.123.255:8080/")
        })
        console.log("URL Updated")
    }
    updateMessage = (msg) => {
        this.setState({
            message: msg,
            color : "red"
        })
    }

    login = () => {
       if(this.checkInputs()){
           axios.defaults.headers.post["Content-Type"] = "application/json";
           const user = {
               email: this.state.email.toLowerCase(),
               password:this.state.password,
               licence_id:this.state.licence_id
           }

           axios({
               method:"post",
               url: `${this.state.url}feeder/login/`,
               data: JSON.stringify(user)
           }).then((response) => {
               if(response.status === 200){
                   if(response.data.error !== undefined){
                       console.log(response.data.error)
                       this.updateMessage(response.data.error)
                   }else{
                       console.log(response.data.status)
                       localStorage.setItem("userdata", JSON.stringify({
                           email: this.state.email.toLowerCase(),
                           licence_id:this.state.licence_id,
                           url:this.state.url
                       }))
                       console.log(JSON.parse(localStorage.getItem("userdata")))
                       this.setState({
                           redirect : "/home"
                       })
                   }
               }
               if(response.status === 500){
                   this.updateMessage("User Not Found with this Email")
               }

           }).catch((error) => {
               this.updateMessage("User Not Found with this Email or Licence ID")
           });
       }
    }
    checkInputs = () => {
        this.setState({
            message:"Login to Continue",
            color:"#18865e"
        })
        if(this.state.email === ""){
            this.setState({
                message:"Email cannot be Empty",
                color:"red"
            })
            return false;
        }
        if(this.state.password === ""){
            this.setState({
                message:"Password cannot be Empty",
                color:"red"
            })
            return false;
        }
        if(this.state.licence_id === ""){
            this.setState({
                message:"Licence-ID cannot be Empty",
                color:"red"
            })
            return false;
        }
        return true;
    }

    render() {// Checking If User Already Logged In
        if(JSON.parse(localStorage.getItem("userdata")) !== null){
            return <Redirect to="/home"/>
        }

        if(this.state.redirect) {
            return <Redirect to={this.state.redirect} {...this.state}/>
        }


        return(
            <div className="container-main">
                <div className="titleHolder">
                    <div className="title"> Health.IO </div>
                    <div className="tagline"> Live Your Choices </div>
                </div>
                <div className="inputHolder">
                    <div className="message" style={{color:this.state.color}} >{this.state.message}</div>
                    <input type="email" className="emailInputBox" placeholder="Email" required onChange={(event) => {
                        this.setState({email:event.target.value})
                    }}/>
                    <input type="password" className="passwordInputBox" placeholder='Passwords' required onChange={(event) => {
                        this.setState({password:event.target.value})
                    }}/>
                    <input type="text" className="licenceInputBox" placeholder="Licence-ID" required onChange={(event) => {
                        this.setState({licence_id:event.target.value})
                    }}/>
                </div>
                <button className="loginButton" onClick={this.login}>Login</button>
            </div>
        )
    }

}
export default App;
