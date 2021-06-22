import React, {Component} from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = {
            someData: "Hello World"
        }
    }

    render() {
        return(
            <div>
                <h2> {this.state.someData}</h2>
            </div>
        )
    }

}
export default App;
