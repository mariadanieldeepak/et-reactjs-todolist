import React, { Component } from 'react';
import TodolistItem from './TodolistItem';
import Button from "./Button";

class Todolist extends Component {
    constructor(props) {
        super(props);
        // Bind `this` to bind processSubmit to bind to the context of Todolist.
        this.processSubmit = this.processSubmit.bind(this);
        this.processAddItem = this.processAddItem.bind(this);
        this.handleOnItemChange = this.handleOnItemChange.bind(this);
        this.handleItemRemoveBtnClick = this.handleItemRemoveBtnClick.bind(this);

        this.state = {currentItem: "", items: []}
    }

    processSubmit(e) {
        e.preventDefault();

        // Do not add empty tasks.
        if (this.state.currentItem.trim() === '') {
            return;
        }

        this.setState((prevState, props) => ({
            items: prevState.items.concat([this.state.currentItem]),
            currentItem: ""
        }));
    }

    processAddItem(e) {
        this.setState({
            currentItem: e.target.value
        });
    }

    handleOnItemChange(updatedItem, index) {
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

    handleShowAllItems() {

    }

    handleShowCompletedItems() {

    }

    handleShowIncompleteItems() {

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
                            <input className="Todolist-add-item" value={this.state.currentItem} type="text" onChange={this.processAddItem} />
                            <button type="submit">Submit</button>
                        </form>
                        {/*<span className="Todolist-current-item">{this.state.currentItem}</span>*/}
                    </div>
                    <br />
                    <a onClick={this.handleShowAllItems.bind(this)} href="#">All</a>
                    |
                    <a onClick={this.handleShowCompletedItems.bind(this)}>Completed</a>
                    |
                    <a onClick={this.handleShowIncompleteItems.bind(this)}>In-complete</a>
                    <br />
                    <ul className="Todolist-items">
                        {this.state.items.map((item, index) => (
                            // Key should be specified here and not in the TodolistItem component.
                            <TodolistItem key={index}
                                          itemIndex={index}
                                          item={item}
                                          onItemChange={this.handleOnItemChange}
                                          onItemRemove={this.handleItemRemoveBtnClick} />
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Todolist;
