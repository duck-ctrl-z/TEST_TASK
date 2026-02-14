import axios from 'axios';
import { Task } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data.slice(0, 10).map((task: any) => ({
      id: task.id,
      title: task.title,
      body: task.body,
      completed: Math.random() > 0.5,
      userId: task.userId
    }));
  } catch (error) {
    throw new Error('Ошибка при загрузке задач');
  }
};