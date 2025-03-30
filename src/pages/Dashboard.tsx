import React, { useState } from "react";
import { Button, Typography, LinearProgress, Box } from "@mui/material";

const Dashboard: React.FC = () => {
  const [tasksLeft, setTasksLeft] = useState<number>(5); // Example dynamic count
  const [progress, setProgress] = useState<number>(60); // Example progress percentage

  const handleCalendarNavigation = (): void => {
    // Logic to navigate to the Calendar page
    console.log("Navigating to Calendar Page...");
  };

  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        Tasks Left Today: {tasksLeft}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCalendarNavigation}
        sx={{ marginBottom: "16px" }}
      >
        Go to Calendar
      </Button>
      <Typography variant="h6" gutterBottom>
        Task Progress
      </Typography>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
};

export default Dashboard;
