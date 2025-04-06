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

interface AddTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onAddTask: () => void;
  newTask: string;
  setNewTask: (value: string) => void;
  newDueDate: string;
  setNewDueDate: (value: string) => void;
  newDetails: string;
  setNewDetails: (value: string) => void;
  newPriority: string;
  setNewPriority: (value: string) => void;
}

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
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onAddTask} color="primary">
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
