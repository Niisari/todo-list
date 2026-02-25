import { format, parseISO } from "date-fns";

const createTodoElement = (todo) => {
    const todoItem = document.createElement("div");
    // Applying BEM class and priority modifier
    todoItem.className = `todo__item todo__item--${todo.priority.toLowerCase()}`;
    todoItem.dataset.id = todo.id; 

    const dateDisplay = todo.dueDate 
        ? format(parseISO(todo.dueDate), "MMM do") 
        : "No date";

    todoItem.innerHTML = `
        <div class="todo__item--left">

            <div class="todo__item--priority ${todo.completed ? "todo__item--completed" : ""}">
                <span class="priority__text ${todo.priority.toLowerCase()}">${todo.priority}</span>
                <span class="todo__item--date">${dateDisplay}</span>
            </div>

            <div class="todo__item--text">
                <input type="checkbox" class="todo__item--checkbox" ${todo.completed ? "checked" : ""}>
                <span class="todo__item--title ${todo.completed ? "todo__item--completed" : ""}">${todo.title}</span>
            </div>

        </div>
            <div class="todo__item--description ${todo.completed ? "todo__item--completed" : ""}">${todo.description}</div>
        <div class="todo__item--right">
            <button class="todo__item--delete-btn">
                🗑️
            </button>
        </div>
    `;

    return todoItem;
};

export const renderTodoList = (title, todoArray) => {
    const renderArea = document.getElementById("todo-render-area");
    if (!renderArea) return;

    renderArea.innerHTML = "";

    const heading = document.createElement("h2");
    heading.className = "content__title";
    heading.textContent = title;
    renderArea.appendChild(heading);

    const listWrapper = document.createElement("div");
    listWrapper.className = "todo__list--wrapper";

    // Logic fix: Now correctly using the helper function
    todoArray.forEach(todo => {
        const item = createTodoElement(todo);
        listWrapper.appendChild(item);
    });

    renderArea.appendChild(listWrapper);
};