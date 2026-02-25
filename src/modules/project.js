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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--Buttons-Icons)" stroke-width="2">
                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
            </svg>
            <span>${name}</span>
        </button>
        <div class="project__item--actions">
            <button class="edit__proj--btn" title="Edit Name">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="var(--Sidebar-Cards)"/>
            </svg>
            </button>
            <button class="delete__proj--btn" title="Delete Project">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 11V17" stroke="var(--Sidebar-Cards)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 11V17" stroke="var(--Sidebar-Cards)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 7H20" stroke="var(--Sidebar-Cards)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="var(--Sidebar-Cards)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="var(--Sidebar-Cards)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </button>
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