import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

interface Task {
  id: number;
  title: string;
  status: string;
  dueDate: string;
  details: string;
  priority: string;
}

interface TaskDetailsDialogProps {
  task: Task | null;
  onClose: () => void;
  onMarkTaskAsDone: (id: number) => void;
}

const TaskDetailsDialog = ({
  task,
  onClose,
  onMarkTaskAsDone,
}: TaskDetailsDialogProps) => {
  if (!task) return null;

  return (
    <Dialog open={!!task} onClose={onClose}>
      <DialogTitle>{task.title}</DialogTitle>
      <DialogContent>
        <Typography variant="body2">
          <strong>Status:</strong> {task.status}
        </Typography>
        <Typography variant="body2">
          <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleString()}
        </Typography>
        <Typography variant="body2">
          <strong>Details:</strong> {task.details}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color:
              task.priority === "High"
                ? "#ff5252"
                : task.priority === "Medium"
                ? "#ffa500"
                : "#4caf50",
          }}
        >
          <strong>Priority:</strong> {task.priority}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onMarkTaskAsDone(task.id);
            onClose();
          }}
          color={task.status === "Completed" ? "secondary" : "primary"}
        >
          {task.status === "Completed" ? "Mark Pending" : "Mark Done"}
        </Button>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetailsDialog;
