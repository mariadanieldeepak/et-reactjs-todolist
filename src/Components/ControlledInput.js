import React, { Component } from 'react';

class ControlledInput extends Component {
    constructor(props) {
        super(props);

        this.state = {inputVal: ''};
    }

    handleInputOnChange(e) {
        this.setState({
            inputVal: e.target.value
        });
    }

    render() {
        return (
            <div>
                Controlled Input: &nbsp; <input type="text" value={this.state.inputVal} onChange={this.handleInputOnChange.bind(this)} />
                <br />
                Input value: &nbsp; <span>{this.state.inputVal}</span>
            </div>
        );
    }
}

export default ControlledInput;
