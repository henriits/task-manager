import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Task } from "../types/TaskTypes";
import { useMediaQuery, Box, ButtonGroup, Button } from "@mui/material";
import { useState, useRef } from "react";

interface TaskCalendarProps {
  tasks: Task[];
  onViewDetails: (task: Task) => void;
}

const TaskCalendar = ({ tasks, onViewDetails }: TaskCalendarProps) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [currentView, setCurrentView] = useState("timeGridWeek");
  const calendarRef = useRef<FullCalendar | null>(null); // Reference to the calendar instance

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(view); // Change the calendar view programmatically
    }
  };

  return (
    <Box>
      {/* Button group for selecting Day, Week, Month views */}
      <ButtonGroup
        variant="contained"
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: isMobile ? "center" : "flex-end",
        }}
      >
        <Button
          onClick={() => handleViewChange("timeGridDay")}
          color={currentView === "timeGridDay" ? "primary" : "inherit"}
        >
          Day
        </Button>
        <Button
          onClick={() => handleViewChange("timeGridWeek")}
          color={currentView === "timeGridWeek" ? "primary" : "inherit"}
        >
          Week
        </Button>
        <Button
          onClick={() => handleViewChange("dayGridMonth")}
          color={currentView === "dayGridMonth" ? "primary" : "inherit"}
        >
          Month
        </Button>
      </ButtonGroup>

      <FullCalendar
        ref={calendarRef} // Attach the calendar instance to the ref
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={currentView} // Use the selected view
        height="auto"
        firstDay={1} // Start the week from Monday
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "", // Remove default view buttons
        }}
        slotMinTime="00:00:00" // Start timetable at 12:00 AM
        slotMaxTime="24:00:00" // End timetable at 12:00 AM (full day)
        events={tasks.map((task) => ({
          title: `${task.status === "Completed" ? "✔ " : ""}${task.title} (${
            task.priority
          })`,
          start: task.dueDate, // Ensure the task's due date includes the time
          backgroundColor:
            task.priority === "High"
              ? "#ff5252"
              : task.priority === "Medium"
              ? "#ffa500"
              : "#4caf50",
          textColor: task.priority === "Medium" ? "#000" : "#fff",
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
          <div style={{ cursor: "pointer" }}>{eventInfo.event.title}</div>
        )}
      />
    </Box>
  );
};

export default TaskCalendar;
