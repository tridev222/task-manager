import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

const TaskForm = ({ open, handleClose, addTask, isEditing = false, taskData = {} }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    if (isEditing && taskData) {
      setTitle(taskData.title || "");
      setDescription(taskData.description || "");
      setDueDate(taskData.dueDate || "");
      setPriority(taskData.priority || "Medium");
    }
  }, [isEditing, taskData]);

  const today = new Date().toISOString().split("T")[0]; 

  const handleSubmit = () => {
    if (!title.trim()) return;
    const updatedTask = { ...taskData, title, description, dueDate, priority };
    addTask(updatedTask);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          width: 400,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
          {isEditing ? "Edit Task" : "New Task"}
        </Typography>

        <TextField label="Title" fullWidth sx={{ mb: 2 }} value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Due Date"
          type="date"
          fullWidth
          sx={{ mb: 2 }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: today }} 
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Priority</InputLabel>
          <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ backgroundColor: "#fca311", fontWeight: "bold" }}>
          {isEditing ? "Update Task" : "Add Task"}
        </Button>
      </Box>
    </Modal>
  );
};

export default TaskForm;
