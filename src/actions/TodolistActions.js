import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/index';

class TodolistActions {
    addNewTodo(item) {
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_NEW_TODO,
            payload: item
        });
    }

    editTodoById(itemId, itemDescription) {
        Dispatcher.dispatch({
            actionType: ActionTypes.EDIT_TODO_BY_ID,
            id: itemId,
            description: itemDescription
        });
    }

    deleteTodoById(itemId) {
        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_TODO_BY_ID,
            id: itemId
        });
    }
}

export default new TodolistActions();