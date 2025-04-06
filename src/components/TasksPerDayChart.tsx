import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography } from "@mui/material";

interface ChartData {
  name: string;
  count: number;
}

interface TasksPerDayChartProps {
  data: ChartData[];
}

const TasksPerDayChart = ({ data }: TasksPerDayChartProps) => {
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
      <Typography variant="h6" sx={{ mb: 2, color: "#333" }}>
        Tasks Added Per Day
      </Typography>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TasksPerDayChart;
