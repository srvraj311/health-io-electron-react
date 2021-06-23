import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './Components/Login/App';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./Components/HomePage/Home";
class Index extends Component{
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path = "/home" component={Home} />
                    <Route exact path="/" component={App}/>
                    {/*<Route path="/create" component={}/>*/}
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render( <Index/>, document.getElementById('root'));

