export const sidebarToggle = () => {
    const sidebar = document.getElementById('todo-sidebar');
    const toggleBtns = document.querySelectorAll('.logo__btn, .hide__wheel');
    
    // toggle logic for the menu buttons
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sidebar.classList.toggle('active'); 
        });
    });

    // Select all your main navigation buttons
    sidebar.addEventListener('click', (e) => {
        if (e.target.closest('button')) {
            sidebar.classList.remove('active');
        }
    });
};