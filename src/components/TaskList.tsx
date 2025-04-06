import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { Add, Info, Edit, Delete } from "@mui/icons-material";
import { TaskListProps } from "../types/TaskTypes"; // Updated import

const TaskList = ({
  tasks,
  onAddTask,
  onEditTask,
  onRemoveTask,
  onMarkTaskAsDone,
  onViewDetails,
}: TaskListProps) => {
  return (
    <Box
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        padding: 3,
        backgroundColor: "#fff",
        mb: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          alignItems: "center",
          color: "#333",
        }}
      >
        My Tasks
        <IconButton onClick={onAddTask} sx={{ ml: 2 }}>
          <Add />
        </IconButton>
      </Typography>

      {tasks.length === 0 ? (
        <Typography color="textSecondary">There are no tasks</Typography>
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="info"
                    onClick={() => onViewDetails(task)}
                  >
                    <Info />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => onEditTask(task)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onRemoveTask(task.id)}
                  >
                    <Delete />
                  </IconButton>
                </>
              }
              sx={{
                backgroundColor:
                  task.priority === "High"
                    ? "#ffcccc"
                    : task.priority === "Medium"
                    ? "#ffe5b4"
                    : "#d4edda",
                mb: 1,
                borderRadius: 1,
                color: task.priority === "Medium" ? "#000" : "#333",
              }}
            >
              <Checkbox
                checked={task.status === "Completed"}
                onChange={() => onMarkTaskAsDone(task.id)}
              />
              <ListItemText
                primary={task.title}
                secondary={`Due: ${new Date(task.dueDate).toLocaleString(
                  "en-US",
                  {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )} | Priority: ${task.priority}`}
                sx={{
                  textDecoration:
                    task.status === "Completed" ? "line-through" : "none",
                  color: "#333",
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default TaskList;
