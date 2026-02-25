import { parseISO, isToday, isTomorrow, isThisWeek, isAfter, startOfToday } from 'date-fns';

// Function to safely parse a date string
const safeParse = (dateString) => {
    if (!dateString || typeof dateString !== 'string') {
        return null;
    }
    try {
        return parseISO(dateString);
    } catch (e) {
        return null;
    }
};

export const getTodayTasks = (allTodos) => {
    return allTodos.filter(todo => {
        const date = safeParse(todo.dueDate);
        return date ? isToday(date) : false;
    });
};

export const getTomorrowTasks = (allTodos) => {
    return allTodos.filter(todo => {
        const date = safeParse(todo.dueDate);
        return date ? isTomorrow(date) : false;
    });
};

export const getWeekTasks = (allTodos) => {
    return allTodos.filter(todo => {
        const date = safeParse(todo.dueDate);
        // isThisWeek checks if the date is within the current week
        return date ? isThisWeek(date, { weekStartsOn: 1 }) : false;
    });
};

export const getUpcomingTasks = (allTodos) => {
    const today = startOfToday();
    return allTodos.filter(todo => {
        const date = safeParse(todo.dueDate);
        return date ? isAfter(date, today) : false;
    });
};

// Function to get tasks for a specific project
export const getProjectTasks = (allTodos, projectName) => {
    return allTodos.filter(todo => todo.project === projectName);
};

// Function to get finished tasks
export const getFinishedTasks = (allTodos) => {
    return allTodos.filter(todo => todo.completed === true);
};