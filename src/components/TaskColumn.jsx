import { Grid, Paper, Typography } from "@mui/material";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

const messages = {
  todo: "No tasks yet! Add a new task to get started.",
  inProgress: "Work in progress... keep pushing!",
  done: "No completed tasks yet. Keep going!",
};

const TaskColumn = ({ title, tasks, status }) => {
  return (
    <Grid item xs={12} sm={4} sx={{ display: "flex", flexDirection: "column", flexGrow: 1, minWidth: "300px" }}>
      <Paper
        sx={{
          p: 2,
          minHeight: "75vh",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          flexGrow: 1,
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", textAlign: "center", color: "#fca311" }}>
          {title}
        </Typography>

        <Droppable droppableId={status} type="TASK">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                minHeight: "65vh",
                padding: "5px",
                transition: "background-color 0.2s ease-in-out",
                backgroundColor: snapshot.isDraggingOver ? "rgba(252, 163, 17, 0.2)" : "transparent",
              }}
            >
              {tasks.length === 0 ? (
                <Typography variant="body2" sx={{ color: "#aaa", textAlign: "center", mt: 3 }}>
                  {messages[status]}
                </Typography>
              ) : (
                tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          marginBottom: "10px",
                          opacity: snapshot.isDragging ? 0.8 : 1,
                        }}
                      >
                        <TaskCard task={task} />
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Paper>
    </Grid>
  );
};

export default TaskColumn;
