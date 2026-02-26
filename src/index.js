import "./styles/reset.css";
import "./styles/global.css";

import { sidebarToggle } from "./modules/sidebar-toggle.js";
import { Todo } from "./modules/todo.js";
import { AddTodo } from "./modules/add-todo.js";
import { renderTodoList } from "./dom/render.js";
import {
  getTodayTasks,
  getTomorrowTasks,
  getWeekTasks,
} from "./modules/dateLogic.js";
import { initProjects } from "./modules/project.js";
import { userProjects } from "./modules/project.js";
import { saveToLocalStorage, loadFromLocalStorage } from "./modules/storage.js";

/* -----------------------------------------------------------
   1. App State
----------------------------------------------------------- */

let currentViewTitle = "All Tasks";
let currentViewFilter = () => allTodos;

initProjects();
sidebarToggle();

// Load from storage or start with an empty array
let allTodos = loadFromLocalStorage() || [];

// Check if it's the first time running (array is empty)
if (allTodos.length === 0) {
  allTodos.push(
    new Todo(
      "Complete Odin Project",
      "Logic",
      "2026-02-24T14:00",
      "High",
      "Inbox",
    ),
  );
  allTodos.push(
    new Todo("Gym Session", "Legs", "2026-02-25T10:00", "Medium", "Inbox"),
  );

  // Save these defaults immediately so they aren't added again next refresh
  saveToLocalStorage(allTodos);
}

// Initial Render
renderTodoList(currentViewTitle, currentViewFilter());

/* -----------------------------------------------------------
   2. Sidebar Navigation Listeners
----------------------------------------------------------- */

document.getElementById("inbox__btn").addEventListener("click", () => {
  currentViewTitle = "Inbox";
  currentViewFilter = () => allTodos.filter((t) => t.project === "Inbox");
  renderTodoList(currentViewTitle, currentViewFilter());
});

document.getElementById("today__btn").addEventListener("click", () => {
  currentViewTitle = "Today";
  currentViewFilter = () => getTodayTasks(allTodos);
  renderTodoList(currentViewTitle, currentViewFilter());
});

document.getElementById("tomorrow__btn").addEventListener("click", () => {
  currentViewTitle = "Tomorrow";
  currentViewFilter = () => getTomorrowTasks(allTodos);
  renderTodoList(currentViewTitle, currentViewFilter());
});

document.getElementById("week__btn").addEventListener("click", () => {
  currentViewTitle = "This Week";
  currentViewFilter = () => getWeekTasks(allTodos);
  renderTodoList(currentViewTitle, currentViewFilter());
});

document.getElementById("all__btn").addEventListener("click", () => {
  currentViewTitle = "All Tasks";
  currentViewFilter = () => allTodos;
  renderTodoList(currentViewTitle, currentViewFilter());
});

document.addEventListener("filterProject", (e) => {
  const projectName = e.detail;
  currentViewTitle = projectName;
  currentViewFilter = () => allTodos.filter((t) => t.project === projectName);
  renderTodoList(currentViewTitle, currentViewFilter());

  document.getElementById("todo-sidebar").classList.remove("active");
});

document.getElementById("finished__btn").addEventListener("click", () => {
  currentViewTitle = "Finished Todos";
  currentViewFilter = () => allTodos.filter((t) => t.completed === true);
  renderTodoList(currentViewTitle, currentViewFilter());
});

document.getElementById("todo-content").addEventListener("click", (e) => {
  const itemElement = e.target.closest(".todo__item");
  if (!itemElement) return;

  const id = itemElement.dataset.id;
  const todoIndex = allTodos.findIndex((t) => t.id === id);
  const selectedTodo = allTodos[todoIndex];

  // 1. Delete Todo (Handles SVG)
  if (e.target.closest(".todo__item--delete-btn")) {
    if (confirm("Delete this task?")) {
      allTodos.splice(todoIndex, 1);
      saveAndRefresh();
    }
    return;
  }

  // 2. Edit Todo (Handles SVG + calls Modal)
  if (e.target.closest(".todo__item--edit-btn")) {
    // We pass userProjects here so the modal dropdown has your projects
    AddTodo(
      userProjects,
      () => {
        saveAndRefresh();
      },
      selectedTodo,
    );
    return;
  }

  // 3. Checkbox Logic
  if (e.target.closest(".todo__item--checkbox")) {
    selectedTodo.toggleCompleted();
    saveAndRefresh();
  }
});

function saveAndRefresh() {
  saveToLocalStorage(allTodos);
  renderTodoList(currentViewTitle, currentViewFilter());
}

/* -----------------------------------------------------------
   4. Modal Listeners
----------------------------------------------------------- */
document.getElementById("add-todo--btn").addEventListener("click", () => {
  console.log("Modal opening...");
});

document.getElementById("add-todo--btn").addEventListener("click", () => {
  AddTodo(userProjects, (newTodo) => {
    allTodos.push(newTodo);

    saveToLocalStorage(allTodos);
    renderTodoList(currentViewTitle, currentViewFilter());
  });
});

document.addEventListener("filterProject", (e) => {
  const projectName = e.detail;
  // Logic to filter allTodos by e.detail...
  console.log(`Filtering by project: ${projectName}`);
});
