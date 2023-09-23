import { element } from "./html-util.js";

export class TodoItemView {
  createTodoItemElement(item, { onUpdateTodo, onDeleteTodo }) {
    const todoItemElement = item.completed
      ? element`<li><input type="checkbox" id="checkbox-id${item.id}" class="checkbox" checked>${item.title}<button id="edit-id${item.id}" class="edit">編集</button><button id="delete-id${item.id}" class="delete">削除</button></li>`
      : element`<li><input type="checkbox" id="checkbox-id${item.id}" class="checkbox">${item.title}<button id="edit-id${item.id}" class="edit">編集</button><button id="delete-id${item.id}" class="delete">削除</button></li>`;

    const inputCheckboxElement = todoItemElement.querySelector(
      `#checkbox-id${item.id}`
    );
    inputCheckboxElement.addEventListener("change", () => {
      onUpdateTodo({
        id: item.id,
        completed: !item.completed,
        isEdit: item.isEdit,
      });
    });

    const deleteButtonElement = todoItemElement.querySelector(
      `#delete-id${item.id}`
    );
    deleteButtonElement.addEventListener("click", () => {
      if (window.confirm("本当に削除してもよろしいですか？")) {
        onDeleteTodo({
          id: item.id,
        });
      }
    });

    const editButtonElement = todoItemElement.querySelector(
      `#edit-id${item.id}`
    );
    editButtonElement.addEventListener("click", () => {
      console.log("aaa");
      onUpdateTodo({
        id: item.id,
        completed: item.completed,
        isEdit: !item.isEdit,
      });
    });

    return todoItemElement;
  }

  createTodoItemEditElement(item, { onEditTodo }) {
    const todoItemElement = element`<li><input type="text" id="edit-form-id${item.id}" class="todo-edit-form" value="${item.title}"><button id="save-id${item.id}" class="edit-save">保存</button></li>`;

    const saveButtonElement = todoItemElement.querySelector(
      `#save-id${item.id}`
    );
    const editFormElement = todoItemElement.querySelector(
      `#edit-form-id${item.id}`
    );

    saveButtonElement.addEventListener("click", () => {
      onEditTodo({
        id: item.id,
        title: editFormElement.value,
        isEdit: !item.isEdit,
      });
    });

    return todoItemElement;
  }
}
