import { saveProjectsToLocalStorage, loadProjectsFromLocalStorage } from './storage.js';

export const userProjects = loadProjectsFromLocalStorage();

/**
 * RENDER PROJECT BUTTON
 * Includes Edit and Delete actions
 */
const renderProjectButton = (name, container) => {
    const projectItem = document.createElement('div');
    projectItem.className = 'project__item';
    
    projectItem.innerHTML = `
        <button class="project__item--btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
            </svg>
            <span>${name}</span>
        </button>
        <div class="project__item--actions">
            <button class="edit__proj--btn" title="Edit Name">✎</button>
            <button class="delete__proj--btn" title="Delete Project">×</button>
        </div>
    `;

    // Select Project
    projectItem.querySelector('.project__item--btn').addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('filterProject', { detail: name }));
    });

    // Delete Project
    projectItem.querySelector('.delete__proj--btn').addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm(`Delete "${name}"?`)) {
            const index = userProjects.indexOf(name);
            if (index > -1) {
                userProjects.splice(index, 1);
                saveProjectsToLocalStorage(userProjects);
                projectItem.remove();
            }
        }
    });

    // Edit Project
    projectItem.querySelector('.edit__proj--btn').addEventListener('click', (e) => {
        e.stopPropagation();
        handleEditProject(name, projectItem, container);
    });

    container.appendChild(projectItem);
};

/**
 * HANDLE EDIT PROJECT
 */
const handleEditProject = (oldName, element, container) => {
    const span = element.querySelector('span');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = oldName;
    input.className = 'project__edit--input';
    
    span.replaceWith(input);
    input.focus();

    const saveEdit = () => {
        const newName = input.value.trim();
        if (newName && newName !== oldName && !userProjects.includes(newName)) {
            const index = userProjects.indexOf(oldName);
            userProjects[index] = newName;
            saveProjectsToLocalStorage(userProjects);
            
            // Refresh the sidebar list
            container.innerHTML = '';
            userProjects.forEach(proj => renderProjectButton(proj, container));
        } else {
            input.replaceWith(span);
        }
    };

    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') saveEdit(); });
    input.addEventListener('blur', saveEdit);
};

/**
 * CREATE PROJECT ELEMENT
 */
const createProjectElement = (name, container) => {
    if (userProjects.includes(name)) return;
    userProjects.push(name);
    saveProjectsToLocalStorage(userProjects);
    renderProjectButton(name, container);
};

/**
 * SHOW PROJECT FORM
 */
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

    form.querySelector('.proj__cancel').addEventListener('click', () => form.remove());
};

/**
 * INIT PROJECTS
 * This is the main function called by index.js
 */
export const initProjects = () => {
    const sidebarProjects = document.getElementById('sidebar-projects');
    const addProjectBtn = document.getElementById('add-project-btn');
    const hideProjectBtn = document.getElementById('hide-project-btn');

    if (!sidebarProjects) return;

    const projectListContainer = document.createElement('div');
    projectListContainer.id = 'project-list-container';
    projectListContainer.className = 'project__list--container';
    sidebarProjects.appendChild(projectListContainer);

    // Load existing
    userProjects.forEach(name => renderProjectButton(name, projectListContainer));

    // Toggle logic
    hideProjectBtn.addEventListener('click', () => {
        projectListContainer.classList.toggle('hidden');
        hideProjectBtn.style.transform = projectListContainer.classList.contains('hidden') 
            ? 'rotate(-90deg)' : 'rotate(0deg)';
    });

    // Add button logic
    addProjectBtn.addEventListener('click', () => {
        if (document.getElementById('project-form')) return;
        showProjectForm(projectListContainer);
    });
};