export interface Task {
  id: number;
  title: string;
  status: string;
  dueDate: string;
  details: string;
  priority: string;
}

export interface EditTask {
  id: number;
  title: string;
  dueDate: string;
  details: string;
  priority: string;
}

export interface ChartData {
  name: string;
  count: number;
}

export interface EditTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onEditTask: () => void;
  newTask: string;
  setNewTask: (value: string) => void;
  newDueDate: string;
  setNewDueDate: (value: string) => void;
  newDetails: string;
  setNewDetails: (value: string) => void;
  newPriority: string;
  setNewPriority: (value: string) => void;
}

export interface TaskCalendarProps {
  tasks: Task[];
  onViewDetails: (task: Task) => void;
}

export interface TaskDetailsDialogProps {
  task: Task | null;
  onClose: () => void;
  onMarkTaskAsDone: (id: number) => void;
}

export interface TasksPerDayChartProps {
  data: ChartData[];
}

export interface TaskListProps {
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onRemoveTask: (id: number) => void;
  onMarkTaskAsDone: (id: number) => void;
  onViewDetails: (task: Task) => void;
}

export interface AddTaskDialogProps {
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

export interface ProgressBarsProps {
  overallProgress: number;
  todayProgress: number;
  thisWeekProgress: number;
}
