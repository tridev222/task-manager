import { Box, Grid } from "@mui/material";
import { DragDropContext } from "@hello-pangea/dnd";
import TaskColumn from "./TaskColumn";
import TaskForm from "./TaskForm";
import { useState } from "react";

const TaskBoard = ({ openForm, setOpenForm }) => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const addTask = (newTask) => {
    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol) {
      // Rearranging items within the same column
      const updatedTasks = [...tasks[sourceCol]];
      const [movedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);

      setTasks((prev) => ({
        ...prev,
        [sourceCol]: updatedTasks,
      }));
    } else {
      // Moving items between columns
      const sourceTasks = [...tasks[sourceCol]];
      const destTasks = [...tasks[destCol]];
      const [movedTask] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, movedTask);

      setTasks((prev) => ({
        ...prev,
        [sourceCol]: sourceTasks,
        [destCol]: destTasks,
      }));
    }
  };

  return (
    <>
      <TaskForm open={openForm} handleClose={() => setOpenForm(false)} addTask={addTask} />

      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ px: 2, display: "flex", gap: 2 }}>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <TaskColumn title="To Do" tasks={tasks.todo} status="todo" />
            <TaskColumn title="In Progress" tasks={tasks.inProgress} status="inProgress" />
            <TaskColumn title="Done" tasks={tasks.done} status="done" />
          </Grid>
        </Box>
      </DragDropContext>
    </>
  );
};

export default TaskBoard;
