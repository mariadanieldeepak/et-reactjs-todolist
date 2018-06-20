import React, { Component } from 'react';
import jQuery from 'jquery';

class TodolistItem extends Component {
    constructor(props) {
        super(props);

        this.processItemTextOnChange = this.processItemTextOnChange.bind(this);
        this.onItemEditBtnChange = this.onItemEditBtnChange.bind(this);
        this.state = {isEdit: false}
    }

    processItemTextOnChange(e) {
        console.log(e.target.value);
        this.props.onItemChange(e.target.value, this.props.itemIndex);
    }

    onItemEditBtnChange() {
        if (this.state.isEdit) {
            this.setState({isEdit: false});
        } else {
            this.setState({isEdit: true});
        }
    }

    render() {
        let editItemField;
        if (this.state.isEdit) {
            editItemField = <input type="text"
                                  defaultValue={this.props.item}
                                  onChange={this.processItemTextOnChange} />;
        } else {
            editItemField = <input type="text"
                                  hidden
                                  defaultValue={this.props.item}
                                  onChange={this.processItemTextOnChange} />;
        }

        return (
            <li>
                <span>{this.props.item}</span>
                {editItemField}
                <button type="button" onClick={this.onItemEditBtnChange}>
                    Edit
                </button> |
                <button type="button">
                    Remove
                </button>
            </li>
        );
    }
}

class Todolist extends Component {
    constructor(props) {
        super(props);
        // Bind `this` to bind processSubmit to bind to the context of Todolist.
        this.processSubmit = this.processSubmit.bind(this);
        this.processAddItem = this.processAddItem.bind(this);
        this.processOnItemChange = this.processOnItemChange.bind(this);

        this.state = {currentItem: "", items: []}
    }

    processSubmit(e) {
        e.preventDefault();

        // Do not add empty tasks.
        if (! this.state.items.length && ! this.state.currentItem) {
            return;
        }

        this.setState((prevState, props) => ({
            items: prevState.items.concat([this.state.currentItem])
        }));
    }

    processAddItem(e) {
        this.setState({
            currentItem: e.target.value
        });
    }

    processRemove(index) {
        // Verify if `index` is received.
        console.log("Remove: " + index);

        let updatedItems = this.state.items.filter((item, itemIndex) => itemIndex !== index);
        this.setState({
            items: updatedItems
        })
    }

    processEdit(index) {
        // Verify if `index` is received.
        console.log("Edit: " + index);

        jQuery('.Todolist-edit-item-' + index).show();
        jQuery('.Todolist-item-' + index).hide();
    }

    getClassNameFromTarget(elem) {
        return elem.className;
    }

    processItemEditOnChange(e) {
        console.log(e.target.value);

        let editInputClass = this.getClassNameFromTarget(e.target),
            itemIndex = jQuery('.' + editInputClass).data('index'),
            updatedItems = this.state.items;

        updatedItems[itemIndex] = e.target.value;

        this.setState({
            items: updatedItems
        });
    }

    processItemEditOnBlur(index) {
        jQuery('.Todolist-edit-item-' + index).hide();
        jQuery('.Todolist-item-' + index).show();
    }

    processOnItemChange(updatedItem, index) {
        let modifiedItems = this.state.items;
        modifiedItems[index] = updatedItem;

        this.setState({items: modifiedItems});
    }

    // Every Component must render()
    render() {
        // Render() must return something or should return `null`;
        return (
            // Return must contain only one parent element.
            <div className="Todolist">
                <div className="Todolist-header">Hello! Check out the tasks you've added.</div>
                <div className="Todolist-body">
                    <div className="Todolist-add-item-container">
                        <form onSubmit={this.processSubmit}>
                            <input className="Todolist-add-item" type="text" onChange={this.processAddItem} />
                            <button type="submit">Submit</button>
                        </form>
                        {/*<span className="Todolist-current-item">{this.state.currentItem}</span>*/}
                    </div>
                    <ul className="Todolist-items">
                        {this.state.items.map((item, index) => (
                            // Key should be specified here and not in the TodolistItem component.
                            <TodolistItem key={index} itemIndex={index} item={item} onItemChange={this.processOnItemChange} />
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Todolist;
