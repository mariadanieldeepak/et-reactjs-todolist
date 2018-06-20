import React, { Component } from 'react';
import jQuery from 'jquery';

class Button extends Component {
    render() {
        return (
            <button type="button" onClick={this.props.onClick}>
                {this.props.label}
            </button>
        );
    }
}

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
            editItemField = <input type="text"
                                  value={this.props.item}
                                  onChange={this.processItemTextOnChange} />;
        } else {
            editItemField = <input type="text"
                                  hidden
                                  value={this.props.item}
                                  onChange={this.processItemTextOnChange} />;
        }

        return (
            <li>
                <span>{this.props.item}</span>
                {editItemField}
                <Button label="Edit" onClick={this.onItemEditBtnClick} />
                 |
                <Button label="Remove" onClick={this.onItemRemoveBtnClick} />
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
        this.handleItemRemoveBtnClick = this.handleItemRemoveBtnClick.bind(this);

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

    processOnItemChange(updatedItem, index) {
        let modifiedItems = this.state.items;
        modifiedItems[index] = updatedItem;

        this.setState({items: modifiedItems});
    }

    handleItemRemoveBtnClick(index) {
        let updatedItems = this.state.items.filter((item, itemIndex) => itemIndex !== index);
        this.setState({
            items: updatedItems
        })
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
                            <TodolistItem key={index}
                                          itemIndex={index}
                                          item={item}
                                          onItemChange={this.processOnItemChange}
                                          onItemRemove={this.handleItemRemoveBtnClick} />
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Todolist;
