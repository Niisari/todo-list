// modules/todo-factory.js
import { Todo } from "./todo.js";

export const AddTodo = (callback) => {
    // Create Modal Element
    const modal = document.createElement("dialog");
    modal.className = "todo__modal";
    modal.innerHTML = `
        <form id="todo-form" method="dialog">
            <h3>Add New Task</h3>
            <input type="text" id="todo-title" placeholder="What needs to be done?" required>
            <input type="date" id="todo-date" required>
            <select id="todo-priority">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <div class="modal__actions">
                <button type="button" id="modal-cancel">Cancel</button>
                <button type="submit">Add Task</button>
            </div>
        </form>
    `;

    document.body.appendChild(modal);
    modal.showModal();

    // Handle Form Submission
    modal.querySelector("form").addEventListener("submit", (e) => {
        const title = document.getElementById("todo-title").value;
        const date = document.getElementById("todo-date").value;
        const priority = document.getElementById("todo-priority").value;

        const newTodo = new Todo(title, "Description", date, priority, "Inbox");
        
        // Pass the new todo back to index.js
        callback(newTodo);
        
        modal.close();
        modal.remove(); // Clean up the DOM
    });

    // Handle Cancel
    modal.querySelector("#modal-cancel").addEventListener("click", () => {
        modal.close();
        modal.remove();
    });
};