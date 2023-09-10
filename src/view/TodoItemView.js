import { element } from "./html-util.js";

export class TodoItemView {

    createTodoItemElement(item, {onUpdateTodo, onDeleteTodo}) {
        const todoItemElement = item.completed
        ? element`<li><input type="checkbox" class="checkbox" checked>${item.title}<button class="edit">編集</button><button class="delete">削除</button></li>`
        : element`<li><input type="checkbox" class="checkbox">${item.title}<button class="edit">編集</button><button class="delete">削除</button></li>`;

        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        inputCheckboxElement.addEventListener("change", () => {
            onUpdateTodo({
                id: item.id,
                completed: !item.completed,
                isEdit: item.isEdit
            });
        });

        const deleteButtonElement = todoItemElement.querySelector(".delete");
        deleteButtonElement.addEventListener("click", () => {
            if (window.confirm("本当に削除してもよろしいですか？")) {
                onDeleteTodo({
                    id: item.id
                });
            }
        });

        const editButtonElement = todoItemElement.querySelector(".edit");
        editButtonElement.addEventListener("click", () => {
            onUpdateTodo({
                id: item.id,
                completed: item.completed,
                isEdit: !item.isEdit
            });
        });

        return todoItemElement;
    }

    createTodoItemEditElement(item, { onEditTodo }) {
        const todoItemElement = element`<li><input type="text" class="todo-edit-form" value="${item.title}"><button class="edit-save">保存</button></li>`

        const saveButtonElement = todoItemElement.querySelector(".edit-save");
        const editFormElement = todoItemElement.querySelector(".todo-edit-form");

        saveButtonElement.addEventListener("click", () => {
            onEditTodo({
                id: item.id,
                title: editFormElement.value,
                isEdit: !item.isEdit
            });
        });

        return todoItemElement;
    }
}