import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import ProgressBars from "./ProgressBars";
import TaskList from "./TaskList";
import AddTaskDialog from "./AddTaskDialog";
import EditTaskDialog from "./EditTaskDialog";
import TaskDetailsDialog from "./TaskDetailsDialog";
import TaskCalendar from "./TaskCalendar";
import TasksPerDayChart from "./TasksPerDayChart";
import { Task, EditTask } from "../types/TaskTypes";
import { useTaskStore } from "../store/taskStore"; // Import the zustand store

const Dashboard = () => {
  const isMobile = useMediaQuery("(max-width: 600px)"); // Check if the screen size is mobile

  const {
    taskList,
    setTaskList,
    addTask,
    updateTask,
    removeTask,
    toggleTaskStatus,
  } = useTaskStore(); // Access the store

  const [newTask, setNewTask] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newDetails, setNewDetails] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [taskDetails, setTaskDetails] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("Today");
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [openEditTaskDialog, setOpenEditTaskDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<EditTask | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const todayTasks = taskList.filter((task) => task.dueDate.startsWith(today));
  const todayProgress =
    todayTasks.length > 0
      ? (todayTasks.filter((t) => t.status === "Completed").length /
          todayTasks.length) *
        100
      : 0;

  const startOfWeek = new Date();
  startOfWeek.setDate(
    startOfWeek.getDate() -
      (startOfWeek.getDay() === 0 ? 6 : startOfWeek.getDay() - 1)
  ); // Adjust to Monday
  const endOfWeek = new Date();
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Ensure Sunday is included
  const startOfWeekDate = startOfWeek.toISOString().split("T")[0];
  const endOfWeekDate = endOfWeek.toISOString().split("T")[0];

  const thisWeekTasks = taskList.filter(
    (task) => task.dueDate >= startOfWeekDate && task.dueDate <= endOfWeekDate
  );
  const thisWeekProgress =
    thisWeekTasks.length > 0
      ? (thisWeekTasks.filter((t) => t.status === "Completed").length /
          thisWeekTasks.length) *
        100
      : 0;

  // Load tasks from local storage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTaskList(JSON.parse(savedTasks));
    }
  }, [setTaskList]);

  // Save tasks to local storage whenever taskList changes
  useEffect(() => {
    if (taskList.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(taskList));
    }
  }, [taskList]);

  const filteredTasks = taskList
    .filter((task) => {
      if (filter === "Today") return task.dueDate.startsWith(today);
      if (filter === "Upcoming") return task.dueDate > today;
      if (filter === "Later") return task.dueDate > today + 7;
      if (filter === "All") return true;
      if (filter === "Completed") return task.status === "Completed";
      if (filter === "Not Completed") return task.status !== "Completed";
      if (filter === "Overdue") return task.dueDate < today;
      if (filter === "Due Tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return task.dueDate.startsWith(tomorrow.toISOString().split("T")[0]);
      }
      if (filter === "Due This Week") {
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date();
        endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
        const startOfWeekDate = startOfWeek.toISOString().split("T")[0];
        const endOfWeekDate = endOfWeek.toISOString().split("T")[0];
        return task.dueDate >= startOfWeekDate && task.dueDate <= endOfWeekDate;
      }
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleAddTask = () => {
    if (newTask && newDueDate) {
      const newTaskObj: Task = {
        id: Date.now(),
        title: newTask,
        status: "Pending", // Ensure status is included
        dueDate: newDueDate,
        details: newDetails || "No details for this task.",
        priority: newPriority,
      };
      addTask(newTaskObj);
      setNewTask("");
      setNewDueDate("");
      setNewDetails("");
      setNewPriority("Medium");
      setOpenAddTaskDialog(false);
    }
  };

  const handleEditTask = () => {
    if (editingTask && newTask && newDueDate) {
      updateTask({
        ...editingTask,
        title: newTask,
        dueDate: newDueDate,
        details: newDetails || "No details for this task.",
        priority: newPriority,
        status: editingTask.status, // Ensure status is preserved
      });
      setOpenEditTaskDialog(false);
      setEditingTask(null);
      setNewTask("");
      setNewDueDate("");
      setNewDetails("");
      setNewPriority("Medium");
    }
  };

  const taskAdditionData = taskList.reduce(
    (acc: Record<string, number>, task) => {
      const date = task.dueDate.split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {}
  );

  const chartData = Object.keys(taskAdditionData).map((date) => ({
    name: date,
    count: taskAdditionData[date],
  }));

  const overallProgress =
    taskList.length > 0
      ? (taskList.filter((t) => t.status === "Completed").length /
          taskList.length) *
        100
      : 0;

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"} // Stack components vertically on mobile
      p={3}
      sx={{ backgroundColor: "#999", minHeight: "100vh" }}
    >
      <Box flex={2} mr={isMobile ? 0 : 2} mb={isMobile ? 2 : 0}>
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            padding: 3,
            backgroundColor: "#fff",
            mb: 3,
          }}
        >
          <Typography variant="h4" sx={{ color: "#333" }}>
            Dashboard
          </Typography>
          <TextField
            fullWidth
            placeholder="Search task..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ my: 2 }}
          />
        </Box>
        <TaskList
          tasks={filteredTasks}
          onAddTask={() => setOpenAddTaskDialog(true)}
          onEditTask={(task) => {
            setEditingTask({
              id: task.id,
              title: task.title,
              dueDate: task.dueDate,
              details: task.details,
              priority: task.priority,
              status: task.status, // Include status when setting editingTask
            });
            setNewTask(task.title);
            setNewDueDate(task.dueDate);
            setNewDetails(task.details);
            setNewPriority(task.priority || "Medium");
            setOpenEditTaskDialog(true);
          }}
          onRemoveTask={removeTask}
          onMarkTaskAsDone={toggleTaskStatus}
          onViewDetails={setTaskDetails}
          sx={{ cursor: "pointer" }} // Added cursor style
        />
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            padding: 3,
            backgroundColor: "#fff",
            mb: 3,
          }}
        >
          <Select
            fullWidth
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ my: 2 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Today">Today</MenuItem>
            <MenuItem value="Upcoming">Upcoming</MenuItem>
            <MenuItem value="Later">Later</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Not Completed">Not Completed</MenuItem>
            <MenuItem value="Overdue">Overdue</MenuItem>
            <MenuItem value="Due Tomorrow">Due Tomorrow</MenuItem>
            <MenuItem value="Due This Week">Due This Week</MenuItem>
          </Select>
        </Box>

        <ProgressBars
          overallProgress={overallProgress}
          todayProgress={todayProgress}
          thisWeekProgress={thisWeekProgress}
        />

        <TasksPerDayChart data={chartData} />
      </Box>

      <Box
        flex={3}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          padding: 3,
          backgroundColor: "#fff",
          mb: isMobile ? 2 : 0, // Add margin on mobile
        }}
      >
        <TaskCalendar tasks={taskList} onViewDetails={setTaskDetails} />
      </Box>

      <AddTaskDialog
        open={openAddTaskDialog}
        onClose={() => setOpenAddTaskDialog(false)}
        onAddTask={handleAddTask}
        newTask={newTask}
        setNewTask={setNewTask}
        newDueDate={newDueDate}
        setNewDueDate={setNewDueDate}
        newDetails={newDetails}
        setNewDetails={setNewDetails}
        newPriority={newPriority}
        setNewPriority={setNewPriority}
      />

      <EditTaskDialog
        open={openEditTaskDialog}
        onClose={() => setOpenEditTaskDialog(false)}
        onEditTask={handleEditTask}
        newTask={newTask}
        setNewTask={setNewTask}
        newDueDate={newDueDate}
        setNewDueDate={setNewDueDate}
        newDetails={newDetails}
        setNewDetails={setNewDetails}
        newPriority={newPriority}
        setNewPriority={setNewPriority}
      />

      <TaskDetailsDialog
        task={taskDetails}
        onClose={() => setTaskDetails(null)}
        onMarkTaskAsDone={toggleTaskStatus}
      />
    </Box>
  );
};

export default Dashboard;
