import React from 'react';
import { Task } from '../../types';
import { Button } from '../UI/Button';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  isSelected: boolean;
  onSelect: () => void;
  onToggleStatus: (e: React.MouseEvent) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  isSelected, 
  onSelect, 
  onToggleStatus 
}) => {
  return (
    <div className={`${styles.card} ${isSelected ? styles.selected : ''}`}>
      <div className={styles.cardContent}>
        <button 
          className={`${styles.statusButton} ${task.completed ? styles.completed : styles.pending}`}
          onClick={onToggleStatus}
          aria-label={task.completed ? 'Отметить как невыполненное' : 'Отметить как выполненное'}
        >
          {task.completed ? '✓' : '○'}
        </button>
        
        <div className={styles.taskInfo}>
          <h3 className={styles.taskTitle}>{task.title}</h3>
          <div className={styles.taskMeta}>
            <span className={`${styles.statusBadge} ${task.completed ? styles.completed : styles.pending}`}>
              {task.completed ? 'Выполнено' : 'В работе'}
            </span>
          </div>
        </div>
        
        <Button onClick={onSelect} variant="secondary">
          Открыть
        </Button>
      </div>
    </div>
  );
};