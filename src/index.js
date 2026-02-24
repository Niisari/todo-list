// src/index.js
import "./styles/reset.css";
import "./styles/global.css";

import { sidebarToggle } from "./modules/sidebar-toggle.js";
import { Todo } from "./modules/todo.js";
import { renderTodoList } from "./dom/render.js";
import { 
    getTodayTasks, 
    getTomorrowTasks, 
    getWeekTasks 
} from "./modules/dateLogic.js";

/* -----------------------------------------------------------
   1. App State & Initial Setup
----------------------------------------------------------- */
const allTodos = [];

// Initialize the sidebar functionality ONCE
sidebarToggle();

// Dummy data for testing
allTodos.push(new Todo("Complete Odin Project", "Finish the logic", "2026-02-24T14:00", "High", "Inbox"));
allTodos.push(new Todo("Gym Session", "Leg day", "2026-02-25T10:00", "Medium", "Inbox"));

// Initial Render
renderTodoList("All Tasks", allTodos);

/* -----------------------------------------------------------
   2. Sidebar Navigation Listeners
----------------------------------------------------------- */

document.getElementById('inbox__btn').addEventListener('click', () => {
    const inboxTasks = allTodos.filter(t => t.project === 'Inbox');
    renderTodoList("Inbox", inboxTasks);
});

document.getElementById('today__btn').addEventListener('click', () => {
    const todayTasks = getTodayTasks(allTodos);
    renderTodoList("Today", todayTasks);
});

document.getElementById('tomorrow__btn').addEventListener('click', () => {
    const tomorrowTasks = getTomorrowTasks(allTodos);
    renderTodoList("Tomorrow", tomorrowTasks);
});

document.getElementById('week__btn').addEventListener('click', () => {
    const weekTasks = getWeekTasks(allTodos);
    renderTodoList("This Week", weekTasks);
});

document.getElementById('all__btn').addEventListener('click', () => {
    renderTodoList("All Tasks", allTodos);
});

/* -----------------------------------------------------------
   3. Content Interactions (Event Delegation)
----------------------------------------------------------- */

document.getElementById('todo-content').addEventListener('click', (e) => {
    const itemElement = e.target.closest('.todo__item');
    if (!itemElement) return;

    const id = itemElement.dataset.id;
    const todoIndex = allTodos.findIndex(t => t.id === id);

    // Toggle Complete
    if (e.target.classList.contains('todo__item--checkbox')) {
        allTodos[todoIndex].toggleComplete();
        const titleSpan = itemElement.querySelector('.todo__item--title');
        titleSpan.classList.toggle('todo__item--completed');
    }

    // Delete
    if (e.target.classList.contains('todo__item--delete-btn')) {
        allTodos.splice(todoIndex, 1);
        renderTodoList("Current Tasks", allTodos);
    }
});

/* -----------------------------------------------------------
   4. Modal / Creation Listeners
----------------------------------------------------------- */
document.getElementById('add-todo--btn').addEventListener('click', () => {
    console.log("Opening Add Todo Modal...");
});