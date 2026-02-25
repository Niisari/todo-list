import { saveProjectsToLocalStorage, loadProjectsFromLocalStorage } from './storage.js';

// 1. Load the array from storage immediately
export const userProjects = loadProjectsFromLocalStorage();

const renderProjectButton = (name, container) => {
    const projectBtn = document.createElement('button');
    projectBtn.className = 'project__item--btn';
    projectBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--Buttons-Icons)" stroke-width="2">
            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
        </svg>
        <span>${name}</span>
    `;
 
    projectBtn.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('filterProject', { detail: name }));
    });

    container.appendChild(projectBtn);
};

const createProjectElement = (name, container) => {
    // Prevent duplicates
    if (userProjects.includes(name)) return;

    userProjects.push(name);
    
    // Save the array to LocalStorage
    saveProjectsToLocalStorage(userProjects);
    
    // Use our "Stamp" to show it in the UI
    renderProjectButton(name, container);
};

const showProjectForm = (container) => {
    const form = document.createElement('form');
    form.id = 'project-form';
    form.className = 'project__form';
    form.innerHTML = `
        <input type="text" id="project-input" placeholder="Project Name..." required autocomplete="off">
        <div class="project__form--btns">
            <button type="submit" class="proj__add">Add</button>
            <button type="button" class="proj__cancel">Cancel</button>
        </div>
    `;

    container.prepend(form); 
    const input = document.getElementById('project-input');
    input.focus();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = input.value.trim();
        if (name) {
            createProjectElement(name, container);
            form.remove();
        }
    });

    form.querySelector('.proj__cancel').addEventListener('click', () => {
        form.remove();
    });
};

export const initProjects = () => {
    const sidebarProjects = document.getElementById('sidebar-projects');
    const addProjectBtn = document.getElementById('add-project-btn');
    const hideProjectBtn = document.getElementById('hide-project-btn');

    if (!sidebarProjects) return;

    // Create the container for the list
    const projectListContainer = document.createElement('div');
    projectListContainer.id = 'project-list-container';
    projectListContainer.className = 'project__list--container';
    sidebarProjects.appendChild(projectListContainer);

    // RE-HYDRATION: Build the UI for all saved projects
    userProjects.forEach(name => {
        renderProjectButton(name, projectListContainer);
    });

    // Toggle Visibility
    hideProjectBtn.addEventListener('click', () => {
        projectListContainer.classList.toggle('hidden');
        hideProjectBtn.style.transform = projectListContainer.classList.contains('hidden') 
            ? 'rotate(-90deg)' 
            : 'rotate(0deg)';
    });

    // Add Project Click
    addProjectBtn.addEventListener('click', () => {
        if (document.getElementById('project-form')) return;
        showProjectForm(projectListContainer);
    });
};