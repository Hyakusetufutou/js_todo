import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
    #items;

    constructor(items = []) {
        super();
        this.#items = items;
    }

    getTotalTodoCount() {
        return this.#items.length;
    }

    getIncompleteTodoCount() {
        let incompleteTodo = this.#items.filter((todo) => {
            return todo.completed === false;
        });
        return incompleteTodo.length;
    }

    getCompleteTodoCount() {
        let completeTodo = this.#items.filter((todo) => {
            return todo.completed === true;
        });
        return completeTodo.length;
    }

    getTodoItems() {
        return this.#items;
    }

    onChange(listener) {
        this.addEventListener("change", listener);
    }

    emitChange() {
        this.emit("change");
    }

    addTodo(todoItem) {
        this.#items.push(todoItem);
        this.emitChange();
    }

    updateTodo({ id, completed, isEdit }) {
        const todoItem = this.#items.find(todo => todo.id === id);
        if (!todoItem) {
            return;
        }
        todoItem.completed = completed;
        todoItem.isEdit = isEdit;
        this.emitChange();
    }

    deleteTodo({id}) {
        this.#items = this.#items.filter(todo => {
            return todo.id !== id;
        });
        this.emitChange();
    }

    editTodo({ id, title, isEdit }) {
        const todoItem = this.#items.find(todo => todo.id === id)
        if (!todoItem) {
            return;
        }
        todoItem.title = title;
        todoItem.isEdit = isEdit;
        this.emitChange();
    }

}