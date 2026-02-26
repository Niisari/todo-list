export const sidebarToggle = () => {
  const sidebar = document.getElementById("todo-sidebar");

  // 1. Select the toggle wheels (one in sidebar, one in content area)
  const toggleWheels = document.querySelectorAll(
    ".hide__wheel, .hide__wheel--content",
  );

  // 2. Select all navigation task buttons + finished button
  const navButtons = [
    document.getElementById("inbox__btn"),
    document.getElementById("today__btn"),
    document.getElementById("tomorrow__btn"),
    document.getElementById("week__btn"),
    document.getElementById("all__btn"),
    document.getElementById("finished__btn"),
    document.getElementById("project-btn"),
  ];

  const allowedTriggers = [...toggleWheels, ...navButtons];

  allowedTriggers.forEach((trigger) => {
    if (trigger) {
      trigger.addEventListener("click", () => {
        sidebar.classList.toggle("active");
      });
    }
  });
};
