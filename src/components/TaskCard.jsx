import { Card, CardContent, Typography, Chip } from "@mui/material";
import { useState } from "react";
import TaskForm from "./TaskForm";

const priorityColors = {
  Low: "#2ECC71",
  Medium: "#F1C40F",
  High: "#E74C3C",
};

const TaskCard = ({ task, updateTask }) => {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <TaskForm
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        addTask={updateTask}
        isEditing
        taskData={task}
      />

      <Card
        onClick={() => setOpenEdit(true)}
        sx={{
          p: 2,
          cursor: "pointer",
          borderLeft: `6px solid ${priorityColors[task.priority]}`,
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {task.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#ddd", mt: 1 }}>
            {task.description}
          </Typography>
          <Typography variant="caption" sx={{ display: "block", color: "#aaa", mt: 1 }}>
            Due: {task.dueDate}
          </Typography>
          <Chip
            label={task.priority}
            sx={{ mt: 1, backgroundColor: priorityColors[task.priority], color: "#fff" }}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default TaskCard;
