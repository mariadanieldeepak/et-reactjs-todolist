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

        this.addItemItemInput = React.createRef();

        this.onAddItemInputChange = this.onAddItemInputChange.bind(this);
        // Bind `this` to bind processSubmit to bind to the context of Todolist.
        this.processSubmit = this.processSubmit.bind(this);

        this.onItemDescriptionChange = this.onItemDescriptionChange.bind(this);
        this.onItemRemoveBtnClick = this.onItemRemoveBtnClick.bind(this);

        this.handleShowAllItems = this.handleShowAllItems.bind(this);
        this.handleShowCompletedItems = this.handleShowCompletedItems.bind(this);
        this.handleShowIncompleteItems = this.handleShowIncompleteItems.bind(this);

        this.onItemCompleteChange = this.onItemCompleteChange.bind(this);

        this.state = {
            currentItem: new Todo(),
            items: [],
            filter: [
                {label: "All", value: "all", selected: true},
                {label: "Completed", value: "complete", selected: false},
                {label: "In-complete", value: "incomplete", selected: false},
            ],
            selectedFilter: "all"
        }
    }

    /**
     * Sets the user input as Current Item.
     */
    onAddItemInputChange(e) {
        let currentItem = new Todo();
        currentItem.description = e.target.value;

        console.log(currentItem);

        // Assignment uses ES6 shorthand notation.
        this.setState({currentItem: currentItem});
    }

    /**
     * Adds the current Item to the existing Items.
     */
    processSubmit(e) {
        e.preventDefault();

        let currentItemDescription = this.addItemItemInput.current.value || '',
            currentItem = new Todo();

        // Do not add empty tasks.
        if (currentItemDescription.trim() === '') {
            return;
        }

        currentItem.id = ++id;
        currentItem.description = currentItemDescription;

        this.setState((prevState, props) => {
            return {items: prevState.items.concat([currentItem])};
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log("Test: " + prevState.items);
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
        let updatedItems = this.state.items;
        console.log("Total: " + this.state.items.length);
        this.setState({
            items: updatedItems,
            displayItems: null
        });
    }

    handleShowCompletedItems() {
        let completedItems = this.state.items.filter((item, itemIndex) => {if (item.isComplete) {return item}});
        console.log(completedItems);
        this.setState({
            displayItems: completedItems
        });
    }

    handleShowIncompleteItems() {
        let completedItems = this.state.items.filter((item, itemIndex) => {if (! item.isComplete) {return item}});
        console.log(completedItems);
        this.setState({
            displayItems: completedItems
        });
    }

    onItemCompleteChange(id, isComplete) {
        let itemIndex,
            todoListItems = [];

        this.state.items.forEach((item, index, items) => {
            if (item.id === id) {
                todoListItems = items;
                itemIndex = index;
            }
        });

        todoListItems[itemIndex].isComplete = isComplete;
        this.setState({items: todoListItems});
    }

    onFilterMenuClick(value) {
        let resetFilter = this.state.filter;

        resetFilter.forEach((item, index, array) => {
            if (array[index].value.trim() === value.trim()) {
                array[index].selected = true;
            } else {
                array[index].selected = false;
            }
        });

        this.setState({filter: resetFilter});

    }

    getSelectedFilter() {
        for(let filter of this.state.filter) {
            if (filter.selected) {
                return filter.value;
            }
        }
    }

    // Every Component must render()
    render() {
        // Render() must return something or should return `null`;

        let items = this.state.items.filter(item => {
            if (this.getSelectedFilter() === 'all') {
                return item;
            } else if (this.getSelectedFilter() === 'complete' && item.isComplete) {
                return item;
            } else if (this.getSelectedFilter() === 'incomplete' && ! item.isComplete) {
                return item;
            }
        });

        return (
            // Return must contain only one parent element.
            <div className="Todolist">
                <div className="Todolist-header">Hello! Check out the tasks you've added.</div>
                <div className="Todolist-body">
                    <div className="Todolist-add-item-container">
                        <form onSubmit={this.processSubmit}>
                            <input className="Todolist-add-item" defaultValue={this.state.currentItem.description} type="text" ref={this.addItemItemInput} />
                            <button type="submit">Submit</button>
                        </form>
                        {/*<span className="Todolist-current-item">{this.state.currentItem}</span>*/}
                    </div>
                    <br />
                    {this.state.filter.map((item, index, array) => (
                        <span><a href="#" onClick={this.onFilterMenuClick.bind(this, item.value)}>{item.label}</a>&nbsp;</span>
                    ))}

                    <ul className="Todolist-items">
                        {items.map((item, index) => (
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
