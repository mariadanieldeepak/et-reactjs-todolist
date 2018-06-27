import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/index';

class TodolistActions {
    addNewTodo(item) {
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_NEW_TODO,
            payload: item
        });
    }
}

export default new TodolistActions();