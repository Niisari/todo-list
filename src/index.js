import "./styles/reset.css";
import "./styles/global.css";

import { sidebarToggle } from "./modules/sidebar-toggle.js";
import { Todo } from "./modules/todo.js";
import { renderTodoList } from "./dom/render.js";
//import { getTodayTasks, getWeekTasks } from "./modules/dateLogic.js";

/* -----------------------------------------------------------
   1. App State & Initial Setup
----------------------------------------------------------- */
const allTodos = [];

// Initializing the Sidebar toggle functionality
sidebarToggle();

// Dummy data for testing (Remove this once your "Add Todo" form works)
allTodos.push(new Todo("Complete Odin Project", "Finish the logic", "2026-02-24T14:00", "High"));
allTodos.push(new Todo("Gym Session", "Leg day", "2026-02-25T10:00", "Medium"));

// Initial View: Show all tasks when the app loads
// Note: Ensure you added <div id="todo-render-area"></div> to your HTML!
renderTodoList("All Tasks", allTodos);

/* -----------------------------------------------------------
   2. Sidebar Navigation Listeners
----------------------------------------------------------- */
// Mapping directly to your HTML IDs (inbox__btn, today__btn, etc.)

document.getElementById('inbox__btn').addEventListener('click', () => {
    const inboxTasks = allTodos.filter(t => t.project === 'Inbox');
    renderTodoList("Inbox", inboxTasks);
});

document.getElementById('today__btn').addEventListener('click', () => {
    renderTodoList("Today", getTodayTasks(allTodos));
});

document.getElementById('tomorrow__btn').addEventListener('click', () => {
    // Requires a getTomorrowTasks in your dateLogic.js
    const tomorrowTasks = allTodos.filter(t => {
        const date = new Date(t.dueDate);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return date.toDateString() === tomorrow.toDateString();
    });
    renderTodoList("Tomorrow", tomorrowTasks);
});

document.getElementById('week__btn').addEventListener('click', () => {
    renderTodoList("This Week", getWeekTasks(allTodos));
});

document.getElementById('all__btn').addEventListener('click', () => {
    renderTodoList("All Tasks", allTodos);
});

/* -----------------------------------------------------------
   3. Content Interactions (Event Delegation)
----------------------------------------------------------- */
// We listen on the parent 'todo-content' for clicks on items
// that are generated dynamically inside the 'todo-render-area'

document.getElementById('todo-content').addEventListener('click', (e) => {
    // Find the closest todo item container to get the ID
    const itemElement = e.target.closest('.todo__item');
    if (!itemElement) return;

    const id = itemElement.dataset.id;
    const todoIndex = allTodos.findIndex(t => t.id === id);

    // Toggle Complete Logic
    if (e.target.classList.contains('todo__item--checkbox')) {
        allTodos[todoIndex].toggleComplete();
        
        // Update the UI styling immediately
        const titleSpan = itemElement.querySelector('.todo__item--title');
        titleSpan.classList.toggle('todo__item--completed');
    }

    // Delete Logic
    if (e.target.classList.contains('todo__item--delete-btn')) {
        allTodos.splice(todoIndex, 1);
        
        // Re-render the current list to reflect the removal
        // (For now, we'll just show "Updated List")
        renderTodoList("Current Tasks", allTodos);
    }
});

/* -----------------------------------------------------------
   4. Project/Todo Creation (Upcoming)
----------------------------------------------------------- */
document.getElementById('add-todo--btn').addEventListener('click', () => {
    console.log("This should open your modal/form!");
    // Logic for opening your New Todo modal goes here
});