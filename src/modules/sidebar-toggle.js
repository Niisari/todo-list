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
    const navButtons = document.querySelectorAll('.inbox__btn, .today__btn, .tomorrow__btn, .week__btn, .all__btn');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove the active class to slide the sidebar away
            sidebar.classList.remove('active'); 
        });
    });
};