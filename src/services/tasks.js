import axios from 'axios';

const baseUrl = 'http://localhost:3001/tasks'; // Update the URL according to your API endpoint

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newTask) => {
  const response = await axios.post(baseUrl, newTask);
  return response.data;
};

const markAsCompleted = async (taskId) => {
  const completionDate = new Date().toISOString(); // Get the current date and time as completion date
  const response = await axios.put(`${baseUrl}/${taskId}`, { completed: true, completionDate });
  return response.data;
};

const remove = async (taskId) => {
  await axios.delete(`${baseUrl}/${taskId}`);
};

export default { getAll, create, markAsCompleted, remove };
