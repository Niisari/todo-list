import { format, parseISO, isValid } from 'date-fns';

const createTodoElement = (todo) => {
    const todoItem = document.createElement("div");
    // Applying BEM class and priority modifier
    todoItem.className = `todo__item todo__item--${todo.priority.toLowerCase()}`;
    todoItem.dataset.id = todo.id; 

        let dateDisplay = "No date";

        if (todo.dueDate) {
            // 1. If it's already a Date object, use it. 
            // 2. If it's a string, parse it into a Date object.
            const dateObj = todo.dueDate instanceof Date 
                ? todo.dueDate 
                : parseISO(todo.dueDate);

            // 3. Only format if the date is valid to prevent further crashes
            if (isValid(dateObj)) {
                dateDisplay = format(dateObj, "MMM do");
            }
        }

    todoItem.innerHTML = `
        <div class="todo__item--left">

            <div class="todo__item--priority ${todo.completed ? "todo__item--completed" : ""}">
                <span class="priority__text ${todo.priority.toLowerCase()}">${todo.priority}</span>
                <span class="todo__item--date">${dateDisplay}</span>
            </div>

            <div class="todo__item--text">
            <label class="checkbox__label">
                <input type="checkbox" class="todo__item--checkbox" ${todo.completed ? "checked" : ""}>
                <span class="checkbox__checkmark"></span>
                <span class="todo__item--title ${todo.completed ? "todo__item--completed" : ""}">${todo.title}</span>
            </label>
            </div>

        </div>
            <div class="todo__item--description ${todo.completed ? "todo__item--completed" : ""}">${todo.description}</div>
        <div class="todo__item--right">
            <button class="todo__item--edit-btn">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="var(--Sidebar-Cards)"/>
            </svg>
            </button>
            <button class="todo__item--delete-btn">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 11V17" stroke="var(--Sidebar-Cards)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 11V17" stroke="var(--Sidebar-Cards)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 7H20" stroke="var(--Sidebar-Cards)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="var(--Sidebar-Cards)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="var(--Sidebar-Cards)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </button>
        </div>
    `;

    return todoItem;
};

export const renderTodoList = (title, todoArray) => {
    const renderArea = document.getElementById("todo-render-area");
    if (!renderArea) return;

    renderArea.innerHTML = "";

    const header = document.createElement("div")
    header.className = "content__header";
    renderArea.appendChild(header);

    const heading = document.createElement("h2");
    heading.className = "content__title";
    heading.textContent = title;
    header.appendChild(heading);

    const listWrapper = document.createElement("div");
    listWrapper.className = "todo__list--wrapper";

    // Logic fix: Now correctly using the helper function
    todoArray.forEach(todo => {
        const item = createTodoElement(todo);
        listWrapper.appendChild(item);
    });

    renderArea.appendChild(listWrapper);
};