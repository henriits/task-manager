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
import { EditTaskDialogProps } from "../types/TaskTypes"; // Updated import

const EditTaskDialog = ({
  open,
  onClose,
  onEditTask,
  newTask,
  setNewTask,
  newDueDate,
  setNewDueDate,
  newDetails,
  setNewDetails,
  newPriority,
  setNewPriority,
}: EditTaskDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
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
        <Button onClick={onEditTask} color="primary" sx={{ cursor: "pointer" }}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;
