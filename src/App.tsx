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
import { Delete, Info } from "@mui/icons-material";
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
  const today = new Date().toISOString().split("T")[0];

  const filteredTasks = taskList
    .filter((task) => {
      if (filter === "Today") return task.dueDate.startsWith(today);
      if (filter === "Upcoming") return task.dueDate > today;
      if (filter === "Later") return task.dueDate > today + 7;
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
          details: "No details available.",
        },
      ]);
      setNewTask("");
      setNewDueDate("");
      setOpenAddTaskDialog(false); // Close dialog after adding task
    }
  };

  const removeTask = (id: number) => {
    setTaskList(taskList.filter((task) => task.id !== id));
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
          <MenuItem value="Today">Today</MenuItem>
          <MenuItem value="Upcoming">Upcoming</MenuItem>
          <MenuItem value="Later">Later</MenuItem>
        </Select>

        <LinearProgress
          variant="determinate"
          value={
            (taskList.filter((t) => t.status === "Completed").length /
              taskList.length) *
            100
          }
          sx={{ my: 2, height: 10, borderRadius: 5 }}
        />

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
        <Box my={3}>
          <Typography variant="h6">Today's Tasks</Typography>
          {taskList
            .filter((task) => task.dueDate.startsWith(today))
            .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
            .map((task) => (
              <Box key={task.id} p={2} bgcolor="yellow" borderRadius={2} my={1}>
                <Typography>
                  {task.title} ({new Date(task.dueDate).toLocaleTimeString()})
                </Typography>
                <Button size="small" onClick={() => setTaskDetails(task)}>
                  Toggle Details
                </Button>
              </Box>
            ))}
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
