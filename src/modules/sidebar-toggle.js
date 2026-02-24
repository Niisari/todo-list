export const sidebarToggle = () => {
    const sidebar = document.getElementById("todo-sidebar");
    const sidebarBtn = document.querySelectorAll(".hide__wheel");
        sidebarBtn.forEach(btn => {
                btn.addEventListener("click", () => {
                    sidebar.classList.toggle("active");
                });
            });
};