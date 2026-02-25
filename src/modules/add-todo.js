// modules/todo-factory.js
import { Todo } from "./todo.js";

// Added 'projectName' as a parameter to fix the ReferenceError
export const AddTodo = (projectList, callback) => {
    const modal = document.createElement("dialog");
    modal.className = "todo__modal";

    const projectOptions = projectList
        .map(proj => `<option value="${proj}">${proj}</option>`)
        .join("");
    
    // Cleaned up the HTML and used the projectName variable
    modal.innerHTML = `
        <form id="todo-form" method="dialog" class="modal__form">
            <textarea id="todo-title" class="modal__title" placeholder="Todo Title" required></textarea>
            <textarea id="todo-description" class="modal__description" placeholder="Todo Description" required></textarea>
            <input type="date" id="todo-date" required>
            <select id="todo-priority">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <select id="todo-project">
                <option value="Inbox">Inbox</option>
                ${projectOptions}</select>
            <div class="modal__actions">
                <button type="button" id="modal-cancel" class="modal__cancel">Cancel</button>
                <button type="submit" id="modal-add" class="modal__add">Add Task</button>
            </div>
        </form>
    `;

    document.body.appendChild(modal);
    modal.showModal();

    const form = modal.querySelector("form");

    form.addEventListener("submit", (e) => {
        // Use the modal reference to find inputs safely
        const title = modal.querySelector("#todo-title").value;
        const description = modal.querySelector("#todo-description").value;
        const date = modal.querySelector("#todo-date").value;
        const priority = modal.querySelector("#todo-priority").value;
        const project = modal.querySelector("#todo-project").value;

        const newTodo = new Todo(title, description, date, priority, project);
        
        callback(newTodo);
        
        modal.close();
        modal.remove(); 
    });

    modal.querySelector("#modal-cancel").addEventListener("click", () => {
        modal.close();
        modal.remove();
    });
};