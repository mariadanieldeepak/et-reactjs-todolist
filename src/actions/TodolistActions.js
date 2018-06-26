import { Dispatcher } from '../dispatcher';
import { ActionTypes } from '../constants';

class TodolistActions {
    addTodo(item) {
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_NEW_TODO,
            payload: item
        });
    }
}

export default new TodolistActions();