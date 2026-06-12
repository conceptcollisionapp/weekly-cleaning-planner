# Build Decisions

## DECISIONS.md: React Habit Tracker Build Summary

This document synthesizes the key decisions, disagreements, and resolutions made during the development of a React habit tracker.

### What Was Built

A complete and runnable React habit tracker application, built with Vite and styled using Tailwind CSS (via CDN). It features:
*   **Habit Management:** Add, delete, and mark habits as complete for the current day.
*   **Daily Streaks:** Tracks both current and longest streaks, derived and persisted accurately.
*   **Habit Categories:** Organize habits into user-defined categories, with filtering capabilities.
*   **Persistence:** All habit and category data is stored in the browser's `localStorage`.
*   **UI/UX:** Modals for adding habits and confirming category deletions, a dedicated category filter, and visual feedback for streaks (flame icon with intensity scaling).

### Key Technical Decisions Made

1.  **Data Model:**
    *   **Habits:** Each habit object includes `id`, `name`, `categoryId` (can be `null`), `createdAt`, `completedDates` (an array of `YYYY-MM-DD` local-time strings), and `longestStreak` (integer).
    *   **Categories:** Each category object includes `id` and `name`.
    *   **Persistence:** Both habits and categories are stored as JSON strings in `localStorage`.

2.  **State Management:**
    *   A custom React hook (`useHabits`) was chosen over `useReducer` for its leaner boilerplate for this application's scope.
    *   State is **lazy-initialized** by reading and parsing `localStorage` directly within the `useState` initializer function (wrapped in `try/catch` for robustness), preventing data clobbering on initial render.
    *   A single `useEffect` is responsible for syncing state changes (habits and categories) back to `localStorage`.

3.  **Streak Logic:**
    *   **`currentStreak`** is dynamically derived at render time by iterating backward through the `completedDates` array.
    *   **`longestStreak`** is persisted as an integer and updated only when a new `currentStreak` exceeds its current value.
    *   **Date Handling:** All date comparisons and manipulations use `new Date().toLocaleDateString('en-CA')` for consistent `YYYY-MM-DD` local-time strings. Crucially, date decrement within the streak calculation explicitly constructs local `Date` objects (`new Date(year, monthIndex, day)`) to avoid UTC timezone drift bugs.
    *   **Streak Reset:** Streaks reset at local midnight.
    *   **Current Day Streak:** The `currentStreak` calculation accounts for the current day; if today's habit is not yet marked complete but yesterday was, the streak still shows as active until local midnight passes.

4.  **Category Management:**
    *   **Deletion Strategy:** Deleting a category **orphans** its associated habits (sets `categoryId: null`), moving them to an "Uncategorized" view, rather than destructively cascading deletion. A confirmation modal is used.
    *   **Filtering:** `CategoryFilter` supports `'all'` (show all habits), `null` (show only uncategorized habits), and specific category `id`s for filtering.
    *   **Category Creation:** An inline input in the `CategoryFilter` component allows users to add new categories.

5.  **Dependencies:**
    *   No external date libraries (e.g., `date-fns`) are used; all date operations rely on native JavaScript `Date` methods.
    *   Styling is managed with Tailwind CSS, integrated via a CDN for quick setup.

### Disagreements and Resolutions

1.  **State Management (`useReducer` vs. `useState` + custom hook):** Initially debated, it was agreed that for this scope, a custom hook wrapping `useState` was sufficiently clean and less boilerplate-heavy.
2.  **`longestStreak` Storage:** Resolved that `longestStreak` should be persisted as an integer and updated conditionally, while `currentStreak` should be derived on demand to prevent data staleness.
3.  **`localStorage` Clobber Bug:** A critical bug where empty state could overwrite existing `localStorage` data on mount was resolved by switching to **lazy `useState` initialization**.
4.  **Date Timezone Drift Bug:** A critical bug in `calculateCurrentStreak` due to `new Date('YYYY-MM-DD')` parsing as UTC was resolved by meticulously constructing `Date` objects in local time during the decrement process.
5.  **`currentStreak` UX (Today Not Checked):** The initial implementation's strict streak reset was refined to allow the streak to remain active throughout the current day, even if not yet completed.
6.  **`CategoryFilter` `null` Overload:** The `selectedCategory` state was clarified: `null` now explicitly filters for "Uncategorized" habits, and `'all'` is used as a distinct sentinel for displaying "All Habits."
7.  **Missing "Add Category" UI:** This critical functional gap was resolved by implementing an inline input field within the `CategoryFilter` component.
8.  **Duplicate Date Logic:** The `getToday` function was exported from `useHabits.jsx` and reused in `HabitCard.jsx` to ensure consistency and avoid redundancy.
9.  **Incomplete Code Deliveries:** Grok's initial partial deliveries were addressed, eventually providing all necessary files for a runnable application.

### Unresolved Concerns

1.  **Duplicate Category Names (Critical - Must Fix):** The `addCategory` function currently allows users to create multiple categories with the exact same name. This leads to a poor user experience and confusing UI as these categories are visually indistinguishable. This needs a check to prevent duplicates.
2.  **`CategoryFilter` Layout (Minor - Polish):** The inline "Add Category" input within the main filter row may become visually crowded and less ergonomic as the number of categories grows. This is a UI/UX polish item for future consideration.
3.  **Performance of `calculateCurrentStreak` (Minor):** `currentStreak` is re-computed for every habit on every render in `HabitList`. While acceptable for the current scale, for applications with a very large number of habits or extensive completion histories, this could be optimized (e.g., via `useMemo`).