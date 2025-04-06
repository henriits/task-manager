import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  useMediaQuery,
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
  sx, // Accept the sx property
}: TaskListProps) => {
  const isTabletOrMobile = useMediaQuery("(max-width: 768px)"); // Check for tablet or mobile screen size

  return (
    <Box
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        padding: 3,
        backgroundColor: "#fff",
        mb: 3,
        ...sx, // Spread the sx property to allow custom styles
      }}
    >
      <Typography
        variant={isTabletOrMobile ? "h6" : "h5"} // Adjust text size for smaller screens
        sx={{
          display: "flex",
          alignItems: "center",
          color: "#333",
          mb: isTabletOrMobile ? 1 : 2, // Adjust margin for smaller screens
        }}
      >
        My Tasks
        <IconButton
          onClick={onAddTask}
          sx={{
            ml: 2,
            cursor: "pointer",
            fontSize: isTabletOrMobile ? "1rem" : "1.5rem", // Adjust icon size
          }}
        >
          <Add />
        </IconButton>
      </Typography>

      {tasks.length === 0 ? (
        <Typography
          color="textSecondary"
          sx={{
            fontSize: isTabletOrMobile ? "0.9rem" : "1rem", // Adjust text size
            textAlign: "center", // Center align for better layout
          }}
        >
          There are no tasks
        </Typography>
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem
              key={task.id}
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
                flexDirection: "column", // Stack content vertically
                alignItems: "flex-start", // Align items to the start
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Checkbox
                  checked={task.status === "Completed"}
                  onChange={() => onMarkTaskAsDone(task.id)}
                  sx={{
                    cursor: "pointer",
                    mr: 2,
                  }}
                />
                <ListItemText
                  primary={task.title}
                  secondary={
                    <>
                      {`Due: ${new Date(task.dueDate).toLocaleString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                      <br /> {/* Move Priority to a new line */}
                      {`Priority: ${task.priority}`}
                    </>
                  }
                  sx={{
                    textDecoration:
                      task.status === "Completed" ? "line-through" : "none",
                    color: "#333",
                    fontSize: isTabletOrMobile ? "0.9rem" : "1rem", // Adjust text size
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end", // Align buttons to the right
                  gap: isTabletOrMobile ? 1 : 2, // Adjust spacing between buttons
                  width: "100%", // Ensure buttons span the full width
                  mt: 1, // Add margin above the buttons
                }}
              >
                <IconButton
                  edge="end"
                  aria-label="info"
                  onClick={() => onViewDetails(task)}
                  sx={{
                    cursor: "pointer",
                    fontSize: isTabletOrMobile ? "1rem" : "1.5rem",
                  }}
                >
                  <Info />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => onEditTask(task)}
                  sx={{
                    cursor: "pointer",
                    fontSize: isTabletOrMobile ? "1rem" : "1.5rem",
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onRemoveTask(task.id)}
                  sx={{
                    cursor: "pointer",
                    fontSize: isTabletOrMobile ? "1rem" : "1.5rem",
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default TaskList;
