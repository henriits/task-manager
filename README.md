# Task Manager Application

This is a **Task Manager Application** built using **React**, **TypeScript**, and **Vite**. The application allows users to manage their tasks efficiently by adding, editing, deleting, and marking tasks as completed. It also includes features like a calendar view, progress tracking, and task filtering.

## Features

- **Add Tasks**: Create new tasks with a title, due date, priority, and additional details.
- **Edit Tasks**: Modify existing tasks.
- **Delete Tasks**: Remove tasks from the list.
- **Mark Tasks as Completed**: Toggle the status of tasks between "Pending" and "Completed".
- **Task Filtering**: Filter tasks by various criteria such as "Today", "Upcoming", "Completed", etc.
- **Calendar View**: Visualize tasks on a calendar with day, week, and month views.
- **Progress Tracking**: Track overall, daily, and weekly progress using progress bars.
- **Mobile-Friendly Design**: The application is responsive and works well on mobile devices.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Vite**: A fast build tool and development server.
- **Material-UI (MUI)**: A React component library for building modern UIs.
- **Zustand**: A lightweight state management library.
- **FullCalendar**: A JavaScript library for creating interactive calendars.
- **Recharts**: A charting library for visualizing data.

## Project Structure

The project is organized as follows:

```
src/
├── components/         # React components
│   ├── AddTaskDialog.tsx
│   ├── Dashboard.tsx
│   ├── EditTaskDialog.tsx
│   ├── ProgressBars.tsx
│   ├── TaskCalendar.tsx
│   ├── TaskDetailsDialog.tsx
│   ├── TaskList.tsx
│   ├── TasksPerDayChart.tsx
├── store/              # Zustand store for state management
│   ├── taskStore.ts
├── types/              # TypeScript types and interfaces
│   ├── TaskTypes.ts
├── App.tsx             # Main application component
```

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/henriits/task-manager.git
   cd task-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Building for Production

To create a production build, run:

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist/` directory.

## Future Enhancements

- Add user authentication.
- Implement task categories or tags.
- Add notifications for upcoming or overdue tasks.
- Connect to database instead of localStorage.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
