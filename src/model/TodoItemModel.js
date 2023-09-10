let todoIdx = 0;

export class TodoItemModel {
    id;
    title;
    completed;
    isEdit;

    constructor({ title, completed, isEdit}) {
        this.id = todoIdx++;
        this.title = title;
        this.completed = completed;
        this.isEdit = isEdit;
    }

}
