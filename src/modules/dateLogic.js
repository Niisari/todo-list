import { isToday, isTomorrow, isThisWeek, parseISO, compareAsc, startOfToday } from "date-fns";

/**
 * FILTERING LOGIC
 */

export const getTodayTasks = (todos) => {
    return todos.filter(todo => {
        if (!todo.dueDate) return false;
        return isToday(parseISO(todo.dueDate));
    });
};

export const getTomorrowTasks = (todos) => {
    return todos.filter(todo => {
        if (!todo.dueDate) return false;
        return isTomorrow(parseISO(todo.dueDate));
    });
};

export const getWeekTasks = (todos) => {
    return todos.filter(todo => {
        if (!todo.dueDate) return false;
        // isThisWeek checks if the date falls within the current calendar week
        return isThisWeek(parseISO(todo.dueDate), { weekStartsOn: 1 }); // Starts on Monday
    });
};

/**
 * SORTING LOGIC
 * Tasks in chronological order (soonest first)
 */
export const sortByDate = (todos) => {
    return [...todos].sort((a, b) => {
        // Handle tasks without dates by pushing them to the bottom
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        
        return compareAsc(parseISO(a.dueDate), parseISO(b.dueDate));
    });
};

/**
 * UTILITY
 * Check if a task is overdue
 */
export const isOverdue = (todo) => {
    if (!todo.dueDate || todo.completed) return false;
    return parseISO(todo.dueDate) < startOfToday();
};