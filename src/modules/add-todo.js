// modules/todo-factory.js
import { Todo } from "./todo.js";

export const AddTodo = (callback) => {
    // Create Modal Element
    const modal = document.createElement("dialog");
    modal.className = "todo__modal";
    modal.innerHTML = `
        <form id="todo-form" method="dialog" class="modal__form">
            <textarea type="text" id="todo-title" class="modal__title" placeholder="Todo Title" required></textarea>
            <textarea type="text" id="todo-description" class="modal__description" placeholder="Todo Description" required></textarea>
            <input type="date" id="todo-date" required>
            <select id="todo-priority">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <div class="modal__actions">
                <button type="button" id="modal-cancel" class="modal__cancel">Cancel</button>
                <button type="submit" id="modal-add" class="modal__add">Add Task</button>
            </div>
        </form>
    `;

    document.body.appendChild(modal);
    modal.showModal();

    // Handle Form Submission
    modal.querySelector("form").addEventListener("submit", (e) => {
        const title = document.getElementById("todo-title").value;
        const description = document.getElementById("todo-description").value;
        const date = document.getElementById("todo-date").value;
        const priority = document.getElementById("todo-priority").value;

        const newTodo = new Todo(title, description, date, priority, "Inbox");
        
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