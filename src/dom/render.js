import { format, parseISO } from "date-fns";

const createTodoElement = (todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo__item");
    todoItem.classList.add(`priority__${todo.priority.toLowerCase()}`);
    todoItem.dataset.id = todo.id; 

    const formattedDate = todo.dueDate 
        ? format(parseISO(todo.dueDate), "MMM do, p") 
        : "No date set";

    todoItem.innerHTML = `
        <div class="todo__item--left">
            <input type="checkbox" class="todo__checkbox" ${todo.completed ? "checked" : ""}>
            <div class="todo__item--text">
                <p class="todo__item--title ${todo.completed ? "completed" : ""}">${todo.title}</p>
                <small class="todo__item--project">${todo.project}</small>
            </div>
        </div>
        <div class="todo__item--right">
            <span class="todo__item--date">${formattedDate}</span>
            <button class="js__delete--todo" title="Delete Task">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                </svg>
            </button>
        </div>
    `;

    return todoItem;
};