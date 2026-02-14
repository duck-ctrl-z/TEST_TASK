import React from 'react';
import { Task } from '../../types';
import styles from './TaskCard.module.css';

interface TaskDetailsProps {
  task: Task;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
  return (
    <div className={styles.details}>
      <div className={styles.detailsSection}>
        <h4 className={styles.detailsTitle}>Описание</h4>
        <p className={styles.detailsText}>
          {task.body || 'Нет описания для этой задачи'}
        </p>
      </div>
    </div>
  );
};