import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './Components/Login/App';
import {HashRouter, Switch, Route} from "react-router-dom";
import Home from "./Components/HomePage/Home";
class Index extends Component{
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path = "/home" component={Home} />
                    <Route exact path="/" component={App}/>
                    {/*<Route path="/create" component={}/>*/}
                </Switch>
            </HashRouter>
        );
    }
}

ReactDOM.render( <Index/>, document.getElementById('root'));

