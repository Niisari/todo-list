import { Todo } from './todo.js'; // Ensure the path matches your project

export const saveToLocalStorage = (allTodos) => {
    localStorage.setItem('allTodos', JSON.stringify(allTodos));
};

export const loadFromLocalStorage = () => {
    const data = localStorage.getItem('allTodos');
    if (!data) return [];

    const parsedData = JSON.parse(data);
    
    return parsedData.map(t => {
        // Convert the string back into a Date object
        const dueDate = t.dueDate ? new Date(t.dueDate) : null;
        
        return new Todo(
            t.title, 
            t.description, 
            dueDate, // Pass the actual Date object here
            t.priority, 
            t.completed
        );
    });
}

export const saveProjectsToLocalStorage = (projects) => {
    localStorage.setItem('projectList', JSON.stringify(projects));
};

export const loadProjectsFromLocalStorage = () => {
    const data = localStorage.getItem('projectList');
    return data ? JSON.parse(data) : ['Inbox']; // Safety: returns ['Inbox'] if empty
};