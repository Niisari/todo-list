import { Todo } from "./todo.js";

export const saveToLocalStorage = (allTodos) => {
  localStorage.setItem("allTodos", JSON.stringify(allTodos));
};

export const loadFromLocalStorage = () => {
  const data = localStorage.getItem("allTodos");
  if (!data) return [];

  const plainArray = JSON.parse(data);

  // RE-HYDRATION: Converting plain JSON back into Todo Class Instances
  return plainArray.map((item) => {
    const todoInstance = new Todo(
      item.title,
      item.description,
      item.dueDate,
      item.priority,
      item.project,
      item.checklist,
    );

    // Restore the original ID so we don't get a new one on every refresh
    if (item.id) todoInstance.id = item.id;

    // Restore the completion status
    todoInstance.completed = item.completed;

    return todoInstance;
  });
};

// --- Project Storage ---
export const saveProjectsToLocalStorage = (projects) => {
  localStorage.setItem("projectList", JSON.stringify(projects));
};

export const loadProjectsFromLocalStorage = () => {
  const data = localStorage.getItem("projectList");
  return data ? JSON.parse(data) : ["Inbox"];
};
