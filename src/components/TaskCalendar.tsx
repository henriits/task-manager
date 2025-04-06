import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Task } from "../types/TaskTypes"; // Updated import

interface TaskCalendarProps {
  tasks: Task[];
  onViewDetails: (task: Task) => void;
}

const TaskCalendar = ({ tasks, onViewDetails }: TaskCalendarProps) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      height="auto"
      firstDay={1} // Start the week from Monday
      events={tasks.map((task) => ({
        title: `${task.status === "Completed" ? "✔ " : ""}${task.title} (${
          task.priority
        })`,
        start: task.dueDate,
        backgroundColor:
          task.priority === "High"
            ? "#ff5252" // Bright red for high priority
            : task.priority === "Medium"
            ? "#ffa500" // Bright orange for medium priority
            : "#4caf50", // Green for low priority
        textColor: task.priority === "Medium" ? "#000" : "#fff", // Black text for orange background
        extendedProps: {
          id: task.id,
          details: task.details,
          priority: task.priority,
          status: task.status,
        },
      }))}
      eventClick={(info) =>
        onViewDetails({
          id: info.event.extendedProps.id,
          title: info.event.title,
          dueDate: info.event.start?.toISOString() || "",
          details: info.event.extendedProps.details,
          priority: info.event.extendedProps.priority,
          status: info.event.extendedProps.status,
        } as Task)
      }
      eventContent={(eventInfo) => (
        <div style={{ cursor: "pointer" }}>{eventInfo.event.title}</div> // Added cursor style
      )}
    />
  );
};

export default TaskCalendar;
