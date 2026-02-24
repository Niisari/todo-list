export const initProjects = () => {
    const sidebarProjects = document.getElementById('sidebar-projects');
    const addProjectBtn = document.getElementById('add-project-btn');
    const hideProjectBtn = document.getElementById('hide-project-btn');

    // Create the project list container
    const projectList = document.createElement('div');
    projectList.id = 'project-list-container';
    projectList.className = 'project__list--container';
    sidebarProjects.appendChild(projectList);

    // 1. Toggle Visibility Logic
    hideProjectBtn.addEventListener('click', () => {
        projectList.classList.toggle('hidden');
        hideProjectBtn.style.transform = projectList.classList.contains('hidden') 
            ? 'rotate(-90deg)' 
            : 'rotate(0deg)';
    });

    // 2. Add Project via Form
    addProjectBtn.addEventListener('click', () => {
        // If form already exists, don't create another
        if (document.getElementById('project__form')) return;
        
        showProjectForm(projectList);
    });
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

    container.prepend(form); // Show form at the top of the list
    document.getElementById('project-input').focus();

    // Handle Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('project-input').value;
        createProjectElement(name, container);
        form.remove();
    });

    // Handle Cancel
    form.querySelector('.proj__cancel').addEventListener('click', () => {
        form.remove();
    });
};

const createProjectElement = (name, container) => {
    const projectBtn = document.createElement('button');
    projectBtn.className = 'project__item--btn';
    projectBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
        </svg>
        <span>${name}</span>
    `;

    projectBtn.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('filterProject', { detail: name }));
    });

    container.appendChild(projectBtn);
};