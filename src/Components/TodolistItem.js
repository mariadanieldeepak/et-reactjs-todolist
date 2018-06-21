import React, { Component } from 'react';
import Button from './Button';

class TodolistItem extends Component {
    constructor(props) {
        super(props);

        this.processItemTextOnChange = this.processItemTextOnChange.bind(this);
        this.onItemEditBtnClick = this.onItemEditBtnClick.bind(this);
        this.onItemRemoveBtnClick = this.onItemRemoveBtnClick.bind(this);
        this.state = {isEdit: false}
    }

    processItemTextOnChange(e) {
        console.log(e.target.value);
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

    render() {
        let editItemField;
        if (this.state.isEdit) {
            editItemField = <span>
                                <input type="text"
                                       value={this.props.item}
                                       onChange={this.processItemTextOnChange} />
                            </span>;
        } else {
            editItemField = <span>
                                <span>{this.props.item}</span>
                                <input type="text"
                                       hidden
                                       value={this.props.item}
                                       onChange={this.processItemTextOnChange} />
                            </span>;
        }

        return (
            <li>
                {editItemField} &nbsp;
                <Button label="Edit" onClick={this.onItemEditBtnClick} />
                <Button label="Remove" onClick={this.onItemRemoveBtnClick} />
            </li>
        );
    }
}

export default TodolistItem;
