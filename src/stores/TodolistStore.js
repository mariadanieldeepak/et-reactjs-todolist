import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/dispatcher.js';
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
        }
    }

    // Adds a new item to the list and emits a CHANGED event.
    _addNewTodo(item) {
        _todolistState.push(item);
        this.emit(CHANGE);
    }

    // Returns the current store's state.
    getAllItems() {
        return _walletState;
    }


    // Calculate the total budget.
    getTotalBudget() {
        let totalBudget = 0;

        _walletState.forEach((item) => {
            totalBudget += parseFloat(item.amount);
        });

        return totalBudget;
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

export default new WalletStore();