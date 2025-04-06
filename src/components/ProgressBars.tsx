import { Box, Typography, LinearProgress } from "@mui/material";
import { ProgressBarsProps } from "../types/TaskTypes"; // Updated import

const ProgressBars = ({
  overallProgress,
  todayProgress,
  thisWeekProgress,
}: ProgressBarsProps) => {
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
      <Typography variant="body2" color="textSecondary">
        Overall Progress: {overallProgress.toFixed(0)}%
      </Typography>
      <LinearProgress
        variant="determinate"
        value={overallProgress}
        sx={{ width: "100%", height: 10, borderRadius: 5, mb: 2 }}
      />
      <Typography variant="body2" color="textSecondary">
        Today's Progress: {todayProgress.toFixed(0)}%
      </Typography>
      <LinearProgress
        variant="determinate"
        value={todayProgress}
        sx={{ width: "100%", height: 10, borderRadius: 5, mb: 2 }}
      />
      <Typography variant="body2" color="textSecondary">
        This Week's Progress: {thisWeekProgress.toFixed(0)}%
      </Typography>
      <LinearProgress
        variant="determinate"
        value={thisWeekProgress}
        sx={{ width: "100%", height: 10, borderRadius: 5 }}
      />
    </Box>
  );
};

export default ProgressBars;
