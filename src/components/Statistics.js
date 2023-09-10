import React, { useState } from 'react';

const Statistics = ({ tasks }) => {
  const [selectedDate, setSelectedDate] = useState('');
  
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const calculateCompletionPercentage = () => {
    const totalTasksCount = tasks.length;
    if (totalTasksCount === 0) {
      return 0;
    }
  
    const completedTasksCount = tasks.filter(task => task.completed).length;
    
    return (completedTasksCount / totalTasksCount) * 100;
  };
  

  return (
    <div className="statistics">
      <h2>Task Completion Statistics</h2>
      <label htmlFor="date-select">Select a Date:</label>
      <input
        type="date"
        id="date-select"
        onChange={handleDateChange}
        value={selectedDate}
      />
      <p>
        Percentage of tasks completed on {selectedDate}: {calculateCompletionPercentage().toFixed(2)}%
      </p>
    </div>
  );
};

export default Statistics;
