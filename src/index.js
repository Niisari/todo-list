import "./styles/reset.css";
import "./styles/global.css";

import { sidebarToggle } from "./modules/sidebar-toggle.js";
import { Todo } from "./modules/todo.js";
import { AddTodo } from "./modules/add-todo.js";
import { renderTodoList } from "./dom/render.js";
import { 
    getTodayTasks, 
    getTomorrowTasks, 
    getWeekTasks 
} from "./modules/dateLogic.js";
import { initProjects } from "./modules/project.js";

/* -----------------------------------------------------------
   1. App State
----------------------------------------------------------- */
const allTodos = [];

let currentViewTitle = "All Tasks";
let currentViewFilter = () => allTodos;

initProjects();
sidebarToggle();

// Dummy data for testing
allTodos.push(new Todo("Complete Odin Project", "Logic", "2026-02-24T14:00", "High", "Inbox"));
allTodos.push(new Todo("Gym Session", "Legs", "2026-02-25T10:00", "Medium", "Inbox"));

// Initial Render
renderTodoList(currentViewTitle, currentViewFilter());

/* -----------------------------------------------------------
   2. Sidebar Navigation Listeners
----------------------------------------------------------- */

document.getElementById('inbox__btn').addEventListener('click', () => {
    currentViewTitle = "Inbox";
    currentViewFilter = () => allTodos.filter(t => t.project === 'Inbox');
    renderTodoList(currentViewTitle, currentViewFilter());
});

document.getElementById('today__btn').addEventListener('click', () => {
    currentViewTitle = "Today";
    currentViewFilter = () => getTodayTasks(allTodos);
    renderTodoList(currentViewTitle, currentViewFilter());
});

document.getElementById('tomorrow__btn').addEventListener('click', () => {
    currentViewTitle = "Tomorrow";
    currentViewFilter = () => getTomorrowTasks(allTodos);
    renderTodoList(currentViewTitle, currentViewFilter());
});

document.getElementById('week__btn').addEventListener('click', () => {
    currentViewTitle = "This Week";
    currentViewFilter = () => getWeekTasks(allTodos);
    renderTodoList(currentViewTitle, currentViewFilter());
});

document.getElementById('all__btn').addEventListener('click', () => {
    currentViewTitle = "All Tasks";
    currentViewFilter = () => allTodos;
    renderTodoList(currentViewTitle, currentViewFilter());
});

document.addEventListener('filterProject', (e) => {
    const projectName = e.detail; 
    currentViewTitle = projectName;
    currentViewFilter = () => allTodos.filter(t => t.project === projectName);
    renderTodoList(currentViewTitle, currentViewFilter());

    document.getElementById('todo-sidebar').classList.remove('active');
});

document.getElementById('finished__btn').addEventListener('click', () => {
    currentViewTitle = "Finished Todos";
    currentViewFilter = () => allTodos.filter(t => t.completed === true);
    renderTodoList(currentViewTitle, currentViewFilter());
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
        
        // Re-render the current view so items move in/out of "Finished" correctly
        renderTodoList(currentViewTitle, currentViewFilter());
    }

    // Delete Todo
    if (e.target.classList.contains('todo__item--delete-btn')) {
        allTodos.splice(todoIndex, 1);
        renderTodoList(currentViewTitle, currentViewFilter());
    }
});

/* -----------------------------------------------------------
   4. Modal Listeners
----------------------------------------------------------- */
document.getElementById('add-todo--btn').addEventListener('click', () => {
    console.log("Modal opening...");
});

document.getElementById('add-todo--btn').addEventListener('click', () => {
    // We pass a function to AddTodo that tells it what to do with the result
    AddTodo((newTodo) => {
        allTodos.push(newTodo);
        renderTodoList(currentViewTitle, currentViewFilter());
    });
});

document.addEventListener('filterProject', (e) => {
    const projectName = e.detail;
    // Logic to filter allTodos by e.detail...
    console.log(`Filtering by project: ${projectName}`);
});