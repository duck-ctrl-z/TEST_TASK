import { useState, useEffect } from 'react';
import { Task, FilterType } from '../types';
import { fetchTasks } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить задачи. Пожалуйста, попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const selectTask = (task: Task) => {
    setSelectedTask(task);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setSelectedTask(null), 400);
  };

  const toggleTaskStatus = (taskId: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(prev => prev ? { ...prev, completed: !prev.completed } : null);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    loading,
    error,
    selectedTask,
    isSidebarOpen,
    filter,
    setFilter,
    selectTask,
    closeSidebar,
    toggleTaskStatus,
    retry: loadTasks
  };
};