import React, { Component } from 'react';

class UnControlledInput extends Component {
    constructor(props) {
        super(props);

        this.state = {label: ""}

        this.handleUCInputSubmit = this.handleUCInputSubmit.bind(this);
    }

    handleUCInputSubmit(e) {
        e.preventDefault();
        this.setState({label: this.name.value});
    }

    render() {
        return (
            <div>
                UnControlled Input: &nbsp; <input type="text" ref={(input) => this.name = input} />
                <br />
                <button type="submit" onClick={this.handleUCInputSubmit}>Read value from Input</button>
                <br />
                Input value: &nbsp; <span>{this.state.label}</span>
            </div>
        );
    }
}

export default UnControlledInput;
