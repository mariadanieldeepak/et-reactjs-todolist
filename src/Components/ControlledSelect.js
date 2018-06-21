import React, { Component } from 'react';

class ControlledSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {selectVal: ["strawberry", "vanilla"]};
    }

    handleSetFlavorBtn(e) {
        e.preventDefault();
        this.setState({selectVal: ["chocolate"]});
    }

    render() {
        return (
            <div>
                <select multiple={true} value={this.state.selectVal}>
                    <option value="vanilla">Vanilla</option>
                    <option value="strawberry" selected="selected">Strawberry</option>
                    <option value="chocolate">Chocolate</option>
                </select>
                <br />
                <button type="button" onClick={this.handleSetFlavorBtn.bind(this)}>Set Chocolate using React</button>
            </div>
        );
    }
}

export default ControlledSelect;
