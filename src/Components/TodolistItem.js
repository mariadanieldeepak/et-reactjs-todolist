import React, { Component } from 'react';
import Button from './Button';

class TodolistItem extends Component {
    constructor(props) {
        super(props);

        this.state = {isEdit: false, isComplete:this.props.isComplete}

        this.onItemEditBtnClick = this.onItemEditBtnClick.bind(this);
        this.onItemDescriptionChange = this.onItemDescriptionChange.bind(this);

        this.onItemRemoveBtnClick = this.onItemRemoveBtnClick.bind(this);
        this.handleItemCompleteOnChange = this.handleItemCompleteOnChange.bind(this);
    }

    onItemDescriptionChange(e) {
        this.props.onItemDescriptionChange(e.target.value, this.props.itemId);
    }

    /**
     * Toggles the Edit Input on Item.
     */
    onItemEditBtnClick() {
        if (this.state.isEdit) {
            this.setState({isEdit: false});
        } else {
            this.setState({isEdit: true});
        }
    }

    onItemRemoveBtnClick() {
        // Remove an item.
        this.props.onItemRemoveBtnClick(this.props.itemId);
    }

    /**
     * Executes when an item is checked on/off.
     */
    handleItemCompleteOnChange(e) {
        this.props.onItemCompleteChange(this.props.itemId, e.target.checked);
    }

    render() {
        let editItemFieldDisplay = this.state.isEdit ? "inline": "none";
        let itemLabelFieldDisplay = this.state.isEdit ? "none": "inline";

        return (
            <li data-itemindex={this.props.itemIndex}>
                <span><input type="checkbox"
                             defaultChecked={this.props.isComplete ? true: false}
                             onChange={this.handleItemCompleteOnChange} /></span>
                &nbsp;
                <span>
                    <span style={{display: itemLabelFieldDisplay}}>{this.props.item}</span>
                    <input type="text"
                           style={{"display": editItemFieldDisplay}}
                           value={this.props.item}
                           onChange={this.onItemDescriptionChange} />
                </span> &nbsp;
                <Button label="Edit" onClick={this.onItemEditBtnClick} />
                <Button label="Remove" onClick={this.onItemRemoveBtnClick} />
            </li>
        );
    }
}

export default TodolistItem;
