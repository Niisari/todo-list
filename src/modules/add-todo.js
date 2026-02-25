import { Todo } from "./todo.js";

/**
 * AddTodo Factory
 * @param {Array} projectList - Array of project names
 * @param {Function} callback - Function to run after saving
 * @param {Object} existingTodo - (Optional) The todo object to edit
 */
export const AddTodo = (projectList = [], callback, existingTodo = null) => {
    const modal = document.createElement("dialog");
    modal.className = "todo__modal";

    // Generate project options and mark the current one as selected if editing
    const projectOptions = projectList
        .map(proj => `<option value="${proj}" ${existingTodo?.project === proj ? 'selected' : ''}>${proj}</option>`)
        .join("");

    modal.innerHTML = `
        <form id="todo-form" method="dialog" class="modal__form">
            <textarea id="todo-title" class="modal__title" placeholder="Todo Title" required>${existingTodo ? existingTodo.title : ''}</textarea>
            <textarea id="todo-description" class="modal__description" placeholder="Todo Description" required>${existingTodo ? existingTodo.description : ''}</textarea>
            <input type="date" id="todo-date" value="${existingTodo ? existingTodo.dueDate : ''}" required>
            <select id="todo-priority">
                <option value="Low" ${existingTodo?.priority === 'Low' ? 'selected' : ''}>Low</option>
                <option value="Medium" ${existingTodo?.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                <option value="High" ${existingTodo?.priority === 'High' ? 'selected' : ''}>High</option>
            </select>
            <select id="todo-project">
                <option value="Inbox">Inbox</option>
                ${projectOptions}
            </select>
            <div class="modal__actions">
                <button type="button" id="modal-cancel" class="modal__cancel">Cancel</button>
                <button type="submit" id="modal-add" class="modal__add">${existingTodo ? "Update Task" : "Add Task"}</button>
            </div>
        </form>
    `;

    document.body.appendChild(modal);
    modal.showModal();

    modal.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        
        const title = modal.querySelector("#todo-title").value;
        const description = modal.querySelector("#todo-description").value;
        const date = modal.querySelector("#todo-date").value;
        const priority = modal.querySelector("#todo-priority").value;
        const project = modal.querySelector("#todo-project").value;

        if (existingTodo) {
            // Update existing object
            existingTodo.title = title;
            existingTodo.description = description;
            existingTodo.dueDate = date;
            existingTodo.priority = priority;
            existingTodo.project = project;
            callback(existingTodo);
        } else {
            // Create new object
            const newTodo = new Todo(title, description, date, priority, project);
            callback(newTodo);
        }

        modal.close();
        modal.remove();
    });

    modal.querySelector("#modal-cancel").addEventListener("click", () => {
        modal.close();
        modal.remove();
    });
};