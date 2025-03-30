import { useState } from "react";
import {
  Checkbox,
  Button,
  Typography,
  Box,
  LinearProgress,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { Delete, Info, Edit, ChevronRight } from "@mui/icons-material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

const tasks = [
  {
    id: 1,
    title: "Task 1",
    status: "Pending",
    dueDate: "2025-03-30T10:00",
    details: "Complete the first module.",
  },
  {
    id: 2,
    title: "Task 2",
    status: "In Progress",
    dueDate: "2025-03-30T14:00",
    details: "Work on project report.",
  },
  {
    id: 3,
    title: "Task 3",
    status: "Completed",
    dueDate: "2025-03-31T09:00",
    details: "Submit assignment.",
  },
];

const Dashboard = () => {
  const [taskList, setTaskList] = useState(tasks);
  const [newTask, setNewTask] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newDetails, setNewDetails] = useState(""); // State for additional details
  const [taskDetails, setTaskDetails] = useState<{
    id: number;
    title: string;
    status: string;
    dueDate: string;
    details: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("Today");
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [openEditTaskDialog, setOpenEditTaskDialog] = useState(false); // State for the edit dialog
  const [editingTask, setEditingTask] = useState<{
    id: number;
    title: string;
    status: string;
    dueDate: string;
    details: string;
  } | null>(null); // State for the task being edited

  const today = new Date().toISOString().split("T")[0];

  const filteredTasks = taskList
    .filter((task) => {
      if (filter === "Today") return task.dueDate.startsWith(today);
      if (filter === "Upcoming") return task.dueDate > today;
      if (filter === "Later") return task.dueDate > today + 7;
      if (filter === "All") return true;
      if (filter === "Completed") return task.status === "Completed";
      if (filter === "Not Completed") return task.status !== "Completed";
      if (filter === "Overdue") return task.dueDate < today;
      if (filter === "Due Today") return task.dueDate.startsWith(today);
      if (filter === "Due Tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDate = tomorrow.toISOString().split("T")[0];
        return task.dueDate.startsWith(tomorrowDate);
      }
      if (filter === "Due This Week") {
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date();
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        const startOfWeekDate = startOfWeek.toISOString().split("T")[0];
        const endOfWeekDate = endOfWeek.toISOString().split("T")[0];
        return task.dueDate >= startOfWeekDate && task.dueDate <= endOfWeekDate;
      }
      if (filter === "Due Next Week") {
        const startOfNextWeek = new Date();
        startOfNextWeek.setDate(startOfNextWeek.getDate() + 7);
        const endOfNextWeek = new Date();
        endOfNextWeek.setDate(endOfNextWeek.getDate() + 13);
        const startOfNextWeekDate = startOfNextWeek.toISOString().split("T")[0];
        const endOfNextWeekDate = endOfNextWeek.toISOString().split("T")[0];
        return (
          task.dueDate >= startOfNextWeekDate &&
          task.dueDate <= endOfNextWeekDate
        );
      }
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const addTask = () => {
    if (newTask && newDueDate) {
      setTaskList([
        ...taskList,
        {
          id: Date.now(),
          title: newTask,
          status: "Pending",
          dueDate: newDueDate,
          details: newDetails || "No details for this task.", // Default if no details
        },
      ]);
      setNewTask("");
      setNewDueDate("");
      setNewDetails(""); // Reset the details input
      setOpenAddTaskDialog(false); // Close dialog after adding task
    }
  };

  const removeTask = (id: number) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  const openEditDialog = (task: {
    id: number;
    title: string;
    status: string;
    dueDate: string;
    details: string;
  }) => {
    setEditingTask(task);
    setNewTask(task.title);
    setNewDueDate(task.dueDate);
    setNewDetails(task.details);
    setOpenEditTaskDialog(true);
  };

  const editTask = () => {
    setTaskList(
      taskList.map((task) =>
        editingTask && task.id === editingTask.id
          ? {
              ...task,
              title: newTask,
              dueDate: newDueDate,
              details: newDetails,
            }
          : task
      )
    );
    setOpenEditTaskDialog(false);
    setEditingTask(null); // Reset editing task
    setNewTask(""); // Reset fields
    setNewDueDate("");
    setNewDetails("");
  };

  return (
    <Box display="flex" p={3}>
      <Box flex={2} mr={2}>
        <Typography variant="h4">Dashboard</Typography>
        <TextField
          fullWidth
          placeholder="Search task..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ my: 2 }}
        />
        <Typography variant="h6">My Tasks</Typography>
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
          <MenuItem value="Due Today">Due Today</MenuItem>
          <MenuItem value="Due Tomorrow">Due Tomorrow</MenuItem>
          <MenuItem value="Due This Week">Due This Week</MenuItem>
          <MenuItem value="Due Next Week">Due Next Week</MenuItem>
        </Select>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: 3, // Modern shadow
            borderRadius: 2, // Rounded corners
            padding: 2, // Padding for spacing
            backgroundColor: "#fff", // Background color
            mb: 3, // Margin-bottom to separate from other content
          }}
        >
          <Typography variant="body2" color="textSecondary">
            Progress:{" "}
            {(
              (taskList.filter((t) => t.status === "Completed").length /
                taskList.length) *
              100
            ).toFixed(0)}
            %
          </Typography>
          <LinearProgress
            variant="determinate"
            value={
              (taskList.filter((t) => t.status === "Completed").length /
                taskList.length) *
              100
            }
            sx={{ width: "80%", height: 10, borderRadius: 5 }}
          />
        </Box>

        <Box maxHeight={300} overflow="auto">
          <List>
            {filteredTasks.map((task) => (
              <ListItem
                key={task.id}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="info"
                      onClick={() => setTaskDetails(task)}
                    >
                      <Info />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => openEditDialog(task)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => removeTask(task.id)}
                    >
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <Checkbox
                  checked={task.status === "Completed"}
                  onChange={() =>
                    setTaskList(
                      taskList.map((t) =>
                        t.id === task.id
                          ? {
                              ...t,
                              status:
                                t.status === "Completed"
                                  ? "Pending"
                                  : "Completed",
                            }
                          : t
                      )
                    )
                  }
                />
                <ListItemText
                  primary={task.title}
                  secondary={`Due: ${task.dueDate}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            boxShadow: 3, // Modern shadow effect
            borderRadius: 2, // Rounded corners for the container
            padding: 3, // Padding around the content
            backgroundColor: "#121212", // Darker background for the container (dark mode look)
            mb: 3, // Margin-bottom to space out from other content
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: "#fff" }}>
            Today's Tasks
          </Typography>
          {taskList.filter((task) => task.dueDate.startsWith(today)).length ===
          0 ? (
            <Typography color="textSecondary">
              No tasks left for today.
            </Typography> // Light gray text for no tasks
          ) : (
            taskList
              .filter((task) => task.dueDate.startsWith(today))
              .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
              .map((task) => (
                <Box
                  key={task.id}
                  sx={{
                    p: 2,
                    bgcolor: "#e0f7fa", // Light Teal background for each task (modern, calm color)
                    borderRadius: 1,
                    mb: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: 1, // Subtle shadow for each task
                  }}
                >
                  <Typography variant="body1" sx={{ color: "#333" }}>
                    {task.title} ({new Date(task.dueDate).toLocaleTimeString()})
                  </Typography>
                  <IconButton
                    onClick={() => setTaskDetails(task)}
                    sx={{
                      backgroundColor: "#2196f3", // Modern blue color for the button
                      color: "#fff", // White icon
                      "&:hover": {
                        backgroundColor: "#1976d2", // Darker blue on hover
                      },
                    }}
                  >
                    <ChevronRight /> {/* A simple Chevron icon */}
                  </IconButton>
                </Box>
              ))
          )}
        </Box>
      </Box>

      <Box flex={3}>
        <Typography variant="h5">Calendar</Typography>
        <Button
          variant="contained"
          onClick={() => setOpenAddTaskDialog(true)} // Open Add Task Dialog
          sx={{ my: 2 }}
        >
          Add Task
        </Button>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          height="auto"
          events={taskList.map((task) => ({
            title: `${task.status === "Completed" ? "✔ " : ""}${task.title}`,
            date: task.dueDate,
            backgroundColor:
              task.status === "Completed" ? "#4caf50" : "#2196f3",
            textColor: "#fff",
            extendedProps: { details: task.details },
          }))}
          eventClick={(info) =>
            setTaskDetails(
              info.event.extendedProps as {
                id: number;
                title: string;
                status: string;
                dueDate: string;
                details: string;
              }
            )
          }
        />
      </Box>

      {/* Add Task Dialog */}
      <Dialog
        open={openAddTaskDialog}
        onClose={() => setOpenAddTaskDialog(false)}
      >
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Task Title"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            type="datetime-local"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            label="Additional Details (Optional)"
            value={newDetails}
            onChange={(e) => setNewDetails(e.target.value)}
            sx={{ my: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddTaskDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={addTask} color="primary">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog
        open={openEditTaskDialog}
        onClose={() => setOpenEditTaskDialog(false)}
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Task Title"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            type="datetime-local"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            sx={{ my: 2 }}
          />
          <TextField
            fullWidth
            label="Additional Details (Optional)"
            value={newDetails}
            onChange={(e) => setNewDetails(e.target.value)}
            sx={{ my: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditTaskDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={editTask} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Task Details Dialog */}
      <Dialog open={!!taskDetails} onClose={() => setTaskDetails(null)}>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          <Typography>{taskDetails?.details}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTaskDetails(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
