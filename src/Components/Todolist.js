import React, { Component } from 'react';
import TodolistItem from './TodolistItem';
import Button from "./Button";

class Todo {
    constructor() {
        this.id;
        this.description = "";
        this.isComplete = false;
    }
}

var id = 0;

class Todolist extends Component {
    constructor(props) {
        super(props);

        this.onAddItemInputChange = this.onAddItemInputChange.bind(this);
        // Bind `this` to bind processSubmit to bind to the context of Todolist.
        this.processSubmit = this.processSubmit.bind(this);

        this.onItemDescriptionChange = this.onItemDescriptionChange.bind(this);
        this.onItemRemoveBtnClick = this.onItemRemoveBtnClick.bind(this);

        this.handleShowAllItems = this.handleShowAllItems.bind(this);
        this.handleShowCompletedItems = this.handleShowCompletedItems.bind(this);
        this.handleShowIncompleteItems = this.handleShowIncompleteItems.bind(this);

        this.onItemCompleteChange = this.onItemCompleteChange.bind(this);

        this.state = {currentItem: {}, items: []}
    }

    /**
     * Sets the user input as Current Item.
     */
    onAddItemInputChange(e) {
        let currentItem = new Todo();
        currentItem.description = e.target.value;

        // Assignment uses ES6 shorthand notation.
        this.setState({
            currentItem
        });
    }

    /**
     * Adds the current Item to the existing Items.
     */
    processSubmit(e) {
        e.preventDefault();

        // Do not add empty tasks.
        if (this.state.currentItem.description.trim() === '') {
            return;
        }

        let currentItem = this.state.currentItem;
        currentItem.id = ++id;

        this.setState((prevState, props) => ({
            items: prevState.items.concat([currentItem]),
            currentItem: {},
        }));
    }

    /**
     * Updates the item description on Edit.
     */
    onItemDescriptionChange(description, id) {
        let itemIndex,
            todoListItems = [];

        this.state.items.forEach((item, index, items) => {
           if (item.id === id) {
               todoListItems = items;
               itemIndex = index;
           }
        });

        todoListItems[itemIndex].description = description;
        this.setState({items: todoListItems});
    }

    /**
     * Removes the Item by Item Id.
     */
    onItemRemoveBtnClick(itemId) {
        let updatedItems = this.state.items.filter((item, itemIndex) => item.id !== itemId);
        this.setState({
            items: updatedItems
        })
    }

    handleShowAllItems() {
        let updatedItems = this.state.originalItems;
        console.log("Total: " + this.state.items.length);
        this.setState({
            items: updatedItems
        });
    }

    handleShowCompletedItems() {
        let updatedItems = this.state.items.filter((item, itemIndex) => item.isComplete);
        this.setState({
            items: updatedItems
        });
    }

    handleShowIncompleteItems() {
        let updatedItems = this.state.items.filter((item, itemIndex) => ! item.isComplete);
        this.setState({
            items: updatedItems
        });
    }

    onItemCompleteChange(index, isChecked) {
        let modifiedItems = this.state.items;
        modifiedItems[index].isComplete = isChecked;
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
                            <input className="Todolist-add-item" value={this.state.currentItem.description} type="text" onChange={this.onAddItemInputChange} />
                            <button type="submit">Submit</button>
                        </form>
                        {/*<span className="Todolist-current-item">{this.state.currentItem}</span>*/}
                    </div>
                    <br />
                    <a onClick={this.handleShowAllItems.bind(this)} href="#">All</a>
                    |
                    <a onClick={this.handleShowCompletedItems.bind(this)} href="#">Completed</a>
                    |
                    <a onClick={this.handleShowIncompleteItems.bind(this)} href="#">In-complete</a>
                    <br />
                    <ul className="Todolist-items">
                        {this.state.items.map((item, index) => (
                            // Key should be specified here and not in the TodolistItem component.
                            <TodolistItem key={item.id}
                                          itemId={item.id}
                                          item={item.description}
                                          isComplete={item.isComplete}
                                          onItemDescriptionChange={this.onItemDescriptionChange}
                                          onItemRemoveBtnClick={this.onItemRemoveBtnClick}
                                          onShowAllItems={this.handleShowAllItems}
                                          onShowCompletedItems={this.handleShowCompletedItems}
                                          onShowIncompleteItems={this.handleShowIncompleteItems}
                                          onItemCompleteChange={this.onItemCompleteChange} />
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Todolist;
