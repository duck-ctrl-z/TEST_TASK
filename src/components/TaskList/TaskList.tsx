import React, { useEffect, useRef, useCallback } from 'react';
import { Task } from '../../types';
import { TaskCard } from '../TaskCard/TaskCard';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: Task[];
  selectedTaskId: number | null;
  onSelectTask: (task: Task) => void;
  onToggleStatus: (taskId: number, e: React.MouseEvent) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  selectedTaskId,
  onSelectTask, 
  onToggleStatus 
}) => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const delay = Math.min(index * 0.05, 0.5);
        ref.style.animationDelay = `${delay}s`;
      }
    });
  }, [tasks]);

  const setRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  }, []);

  return (
    <div className={styles.taskList}>
      <div className={styles.tasksContainer}>
        {tasks.map((task, index) => (
          <div
            key={task.id}
            ref={setRef(index)}
          >
            <TaskCard
              task={task}
              isSelected={selectedTaskId === task.id}
              onSelect={() => onSelectTask(task)}
              onToggleStatus={(e) => onToggleStatus(task.id, e)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};