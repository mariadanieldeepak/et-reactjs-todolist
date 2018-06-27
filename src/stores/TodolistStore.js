import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants';

const CHANGE = 'CHANGE';
let _todolistState = [];

class TodolistStore extends EventEmitter {

    constructor() {
        super();

        // Registers action handler with the Dispatcher.
        Dispatcher.register(this._registerToActions.bind(this));
    }

    // Switches over the action's type when an action is dispatched.
    _registerToActions(action) {
        switch(action.actionType) {
            case ActionTypes.ADD_NEW_TODO:
                this._addNewTodo(action.payload);
                break;
            case ActionTypes.EDIT_TODO_BY_ID:
                this._editTodoById(action.id, action.description);
                break;
            case ActionTypes.DELETE_TODO_BY_ID:
                this._deleteTodoById(action.id);
                break;
        }
    }

    // Adds a new item to the list and emits a CHANGED event.
    _addNewTodo(item) {
        _todolistState.push(item);
        this.emit(CHANGE);
    }

    _editTodoById(id, description) {
        let index = _todolistState.findIndex((item) => item.id === id);
        _todolistState[index].description = description;
        this.emit(CHANGE);
    }

    _deleteTodoById(id) {
        _todolistState = _todolistState.filter(item => item.id !== id);
        this.emit(CHANGE);
    }

    // Returns the current store's state.
    getAllItems() {
        return _todolistState;
    }

    // Hooks a React component's callback to the CHANGED event.
    addChangeListener(callback) {
        this.on(CHANGE, callback);
    }

    // Removes the listener from the CHANGED event.
    removeChangeListener(callback) {
        this.removeListener(CHANGE, callback);
    }
}

export default new TodolistStore();