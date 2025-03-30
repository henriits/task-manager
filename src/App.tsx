import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Typography,
  Box,
  LinearProgress,
  TextField,
} from "@mui/material";
import { Home, CheckCircle, Event, Settings } from "@mui/icons-material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const tasks = [
  { id: 1, title: "Task 1", status: "Pending", dueDate: "2025-03-30" },
  { id: 2, title: "Task 2", status: "In Progress", dueDate: "2025-03-30" },
  { id: 3, title: "Task 3", status: "Completed", dueDate: "2025-03-31" },
];

const App = () => {
  const [selectedPage, setSelectedPage] = useState("Home");
  const [taskList, setTaskList] = useState(tasks);
  const [newTask, setNewTask] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  const toggleTaskStatus = (id: number) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "Completed" ? "Pending" : "Completed",
            }
          : task
      )
    );
  };

  const addTask = () => {
    if (newTask && newDueDate) {
      setTaskList([
        ...taskList,
        {
          id: Date.now(),
          title: newTask,
          status: "Pending",
          dueDate: newDueDate,
        },
      ]);
      setNewTask("");
      setNewDueDate("");
    }
  };

  const completedTasks = taskList.filter(
    (task) => task.status === "Completed"
  ).length;
  const progress = (completedTasks / taskList.length) * 100;

  return (
    <Box display="flex">
      <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
        <List>
          {["Home", "My Tasks", "Calendar", "Settings"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <Button
                fullWidth
                onClick={() => setSelectedPage(text)}
                sx={{
                  justifyContent: "flex-start",
                  backgroundColor:
                    selectedPage === text
                      ? "rgba(0, 0, 0, 0.08)"
                      : "transparent",
                }}
              >
                <ListItemIcon>
                  {[<Home />, <CheckCircle />, <Event />, <Settings />][index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </Button>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box p={3} flex={1}>
        <Typography variant="h4">{selectedPage}</Typography>

        {selectedPage === "Home" && (
          <Box>
            <Typography variant="h6">
              Total Tasks Left: {taskList.length - completedTasks}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ my: 2 }}
            />
            <Button
              variant="contained"
              onClick={() => setSelectedPage("Calendar")}
            >
              Go to Calendar
            </Button>
          </Box>
        )}

        {selectedPage === "My Tasks" && (
          <Box>
            <Box display="flex" gap={2} my={2}>
              <TextField
                label="Task Title"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <TextField
                label="Due Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
              />
              <Button variant="contained" onClick={addTask}>
                Add Task
              </Button>
            </Box>
            {taskList.map((task) => (
              <ListItem key={task.id}>
                <Checkbox
                  checked={task.status === "Completed"}
                  onChange={() => toggleTaskStatus(task.id)}
                />
                <ListItemText
                  primary={task.title}
                  secondary={`Due: ${task.dueDate}`}
                />
              </ListItem>
            ))}
          </Box>
        )}

        {selectedPage === "Calendar" && (
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={taskList.map((task) => ({
              title: task.title,
              date: task.dueDate,
            }))}
          />
        )}
      </Box>
    </Box>
  );
};

export default App;
