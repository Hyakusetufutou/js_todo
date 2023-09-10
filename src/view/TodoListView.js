import { element } from "./html-util.js";
import { TodoItemView } from "./TodoItemView.js";

export class TodoListView {
    createElement(todoItems, { onUpdateTodo, onDeleteTodo, onEditTodo }) {
        const todoListElement   = element`<ul></ul>`;

        todoItems.forEach(item => {
            const todoItemView = new TodoItemView();
            const todoItemElement = !item.isEdit 
                                    ? todoItemView.createTodoItemElement(item, {onUpdateTodo, onDeleteTodo}) 
                                    : todoItemView.createTodoItemEditElement(item, {onEditTodo});
            todoListElement.appendChild(todoItemElement);
        });

        return todoListElement;
    }
}