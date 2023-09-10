import React from 'react';
import './Task.css'

const Task = ({ task, markAsCompleted, deleteTask }) => {
  return (
    <div className="task">
      <div className="task-info">
        <span>{task.name}</span>
        {task.completed ? (
          <span className="completed-task">Completed</span>
        ) : null}
        {task.completed && task.completionDate ? (
          <div className="completion-date">
            Completed on: {new Date(task.completionDate).toLocaleDateString()}
          </div>
        ) : null}
      </div>
      <div className="task-actions">
        {!task.completed && (
          <button className="mark-complete" onClick={markAsCompleted}>
            Mark as Completed
          </button>
        )}
        <button className="delete-task" onClick={deleteTask}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
