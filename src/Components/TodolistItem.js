import React, { Component } from 'react';
import Button from './Button';

class TodolistItem extends Component {
    constructor(props) {
        super(props);

        this.processItemTextOnChange = this.processItemTextOnChange.bind(this);
        this.onItemEditBtnClick = this.onItemEditBtnClick.bind(this);
        this.onItemRemoveBtnClick = this.onItemRemoveBtnClick.bind(this);
        this.handleItemCompleteOnChange = this.handleItemCompleteOnChange.bind(this);

        this.state = {isEdit: false, isComplete:this.props.isComplete}
    }

    processItemTextOnChange(e) {
        this.props.onItemChange(e.target.value, this.props.itemIndex);
    }

    onItemEditBtnClick() {
        if (this.state.isEdit) {
            this.setState({isEdit: false});
        } else {
            this.setState({isEdit: true});
        }
    }

    onItemRemoveBtnClick() {
        // Remove an item.
        this.props.onItemRemove(this.props.itemIndex);
    }

    handleItemCompleteOnChange(e) {
        let itemIndex = this.props.itemIndex,
            isChecked = e.target.checked;
        this.props.onItemCompleteChange(itemIndex, isChecked);
    }

    render() {
        let editItemFieldDisplay = this.state.isEdit ? "inline": "none";
        let itemLabelFieldDisplay = this.state.isEdit ? "none": "inline";

        return (
            <li>
                <span><input type="checkbox"
                             defaultChecked={this.props.isComplete ? true: false}
                             onChange={this.handleItemCompleteOnChange} /></span>
                &nbsp;
                <span>
                    <span style={{display: itemLabelFieldDisplay}}>{this.props.item}</span>
                    <input type="text"
                           style={{"display": editItemFieldDisplay}}
                           value={this.props.item}
                           onChange={this.processItemTextOnChange} />
                </span> &nbsp;
                <Button label="Edit" onClick={this.onItemEditBtnClick} />
                <Button label="Remove" onClick={this.onItemRemoveBtnClick} />
            </li>
        );
    }
}

export default TodolistItem;
