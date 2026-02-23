export const sidebarToggle = () => {
    const sidebar = document.getElementById("todo-sidebar");
    const sidebarBtn = document.getElementById("hide-wheel");
    sidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });
};