export class Todo {
    constructor(title, description, dueDate, priority, project, checklist) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.checklist = checklist;

        this.completed = false;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }

    updateTodo(details) {
        Object.assign(this, details);
    }
}