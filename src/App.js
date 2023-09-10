import { useEffect, useState } from 'react';
import Task from './components/Task';
import axios from 'axios';
import tasksService from './services/tasks';
import Statistics from './components/Statistics';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const hook = () => {
    tasksService.getAll()
      .then(taskList => setTasks(taskList))
  };
  useEffect(hook, []);

  const [newTaskName, setNewTaskName] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [show, setShow] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const calculateCompletionPercentage = () => {
    const tasksOnSelectedDate = tasks.filter(task => {
      if (task.completionDate) {
        const completionDate = new Date(task.completionDate).toISOString().split('T')[0];
        return completionDate === selectedDate;
      }
      return false;
    });
  
    const totalTasksOnSelectedDate = tasksOnSelectedDate.length;
    if (totalTasksOnSelectedDate === 0) {
      return 0;
    }
  
    const completedTasksOnSelectedDate = tasksOnSelectedDate.filter(task => task.completed);
    const completedTaskCount = completedTasksOnSelectedDate.length;
  
    return (completedTaskCount / totalTasksOnSelectedDate) * 100;
  };
  

  const addTask = (event) => {
    event.preventDefault();
    const newTaskObject = {
      name: newTaskName,
      completed: false,
    };

    if (tasks.some(task => task.name === newTaskName)) {
      alert(newTaskObject.name + " already exists");
    } else {
      tasksService.create(newTaskObject)
        .then(respond => {
          setTasks([...tasks, respond]);
        });
    }

    setNewTaskName('');
  };

  const handleTaskNameChange = (event) => {
    setNewTaskName(event.target.value);
  };

  const handleFilterChange = (event) => {
    setShow(event.target.value);
  };

  const markTaskAsCompleted = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: true, completionDate: new Date().toISOString() } : task
    );
    setTasks(updatedTasks);
    setCompletedTasks([...completedTasks, taskId]);
    tasksService.markAsCompleted(taskId);
  };

  const deleteTask = (taskId, taskName) => {
    if (window.confirm("Do you really want to delete " + taskName)) {
      const url = "http://localhost:3001/tasks/" + taskId;
      axios.delete(url)
        .then(() => {
          setTasks(tasks.filter(task => task.id !== taskId));
        });
    }
  };

  
  const tasksToShow = tasks && tasks.length > 0 ? tasks.filter(task =>
    task.name.includes(show) && !completedTasks.includes(task.id)
  ) : [];

    return (
      <div>
        <h2 className="section-title">Filter</h2>
        <form>
          <div>
            Filter tasks: <input id="filter-input" value={show} onChange={handleFilterChange} />
          </div>
        </form>
        <h2 className="section-title">Add Task</h2>
        <form onSubmit={addTask}>
          <div>
            Task name: <input id="task-name-input" value={newTaskName} onChange={handleTaskNameChange} />
          </div>
          <div>
            <button id="add-task-button" type="submit">Add Task</button>
          </div>
        </form>
        <h2 className="section-title">Tasks</h2>
        {tasksToShow.map(task => (
          <Task
            key={task.id}
            task={task}
            markAsCompleted={() => markTaskAsCompleted(task.id)}
            deleteTask={() => deleteTask(task.id, task.name)}
          />
        ))}
        <h2 className="section-title">Statistics</h2>
        <Statistics
          tasks={tasks}
          calculateCompletionPercentage={calculateCompletionPercentage}
        />
      </div>
    );
    
};

export default App;
