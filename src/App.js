import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { render } from "./view/html-util.js";
import { TodoListView } from "./view/TodoListView.js";

export class App {
    #todoListModel = new TodoListModel();

    mount() {
        const saveButtonElement     = document.querySelector("#todo-save"   );
        const inputElement          = document.querySelector("#todo-input"  );
        const todoItemCountElement  = document.querySelector("#todo-count"  );
        const containerElement      = document.querySelector("#todo-list"   );


        this.#todoListModel.onChange(() => {
            const todoItems         = this.#todoListModel.getTodoItems();
            const todoListView = new TodoListView();

            const todoListElement = todoListView.createElement(todoItems, {
                onUpdateTodo: ({id, completed, isEdit}) => {
                    this.#todoListModel.updateTodo({id, completed, isEdit});
                },
                onDeleteTodo: ({id}) => {
                    this.#todoListModel.deleteTodo({id});
                },
                onEditTodo: ({id, title, isEdit}) => {
                    this.#todoListModel.editTodo({id, title, isEdit});
                }
            });

            render(todoListElement, containerElement);
            todoItemCountElement.textContent = `全てのタスク：${this.#todoListModel.getTotalTodoCount()} 
                                                完了済み：${this.#todoListModel.getCompleteTodoCount()} 
                                                未完了：${this.#todoListModel.getIncompleteTodoCount()}`;
        });

        saveButtonElement.addEventListener("click", () => {
            if (inputElement.value === "") {
                return;
            }

            this.#todoListModel.addTodo(new TodoItemModel({
                title: inputElement.value,
                completed: false,
                isEdit: false
            }));
            inputElement.value = "";
        });
    }

}