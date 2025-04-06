import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { AddTaskDialogProps } from "../types/TaskTypes"; // Updated import

const AddTaskDialog = ({
  open,
  onClose,
  onAddTask,
  newTask,
  setNewTask,
  newDueDate,
  setNewDueDate,
  newDetails,
  setNewDetails,
  newPriority,
  setNewPriority,
}: AddTaskDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
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
        <Select
          fullWidth
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          sx={{ my: 2 }}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" sx={{ cursor: "pointer" }}>
          Cancel
        </Button>
        <Button onClick={onAddTask} color="primary" sx={{ cursor: "pointer" }}>
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
