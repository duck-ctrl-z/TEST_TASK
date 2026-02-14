import React, { useEffect, useState, useRef } from 'react';
import { Task } from '../../types';
import styles from './TaskSidebar.module.css';

interface TaskSidebarProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleStatus: (taskId: number) => void;
}

export const TaskSidebar: React.FC<TaskSidebarProps> = ({ 
  task, 
  isOpen, 
  onClose,
  onToggleStatus
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimer = useRef<any>(null);
  const openTimer = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (animationTimer.current) clearTimeout(animationTimer.current);
      if (openTimer.current) clearTimeout(openTimer.current);
    };
  }, []);

  useEffect(() => {
    if (task && isOpen) {
      setShouldRender(true);
      
      if (openTimer.current) clearTimeout(openTimer.current);
      
      openTimer.current = setTimeout(() => {
        setIsAnimating(true);
      }, 20);
    } else if (!isOpen && shouldRender) {
      setIsAnimating(false);
      
      if (animationTimer.current) clearTimeout(animationTimer.current);
      
      animationTimer.current = setTimeout(() => {
        setShouldRender(false);
      }, 400);
    }
  }, [isOpen, task, shouldRender]);

  useEffect(() => {
    if (task && isOpen) {
      setIsAnimating(false);
      
      if (openTimer.current) clearTimeout(openTimer.current);
      
      openTimer.current = setTimeout(() => {
        setIsAnimating(true);
      }, 30);
    }
    
    return () => {
      if (openTimer.current) clearTimeout(openTimer.current);
    };
  }, [task?.id]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!shouldRender || !task) return null;

  return (
    <>
      {/* Оверлей с затемнением */}
      <div 
        className={`${styles.overlay} ${isAnimating ? styles.overlayVisible : ''}`}
        onClick={onClose}
        style={{ pointerEvents: isAnimating ? 'auto' : 'none' }}
      />
      
      {/* Боковая панель */}
      <div className={`${styles.sidebar} ${isAnimating ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.headerTop}>
            <h2 className={styles.title}>
              Детали задачи
            </h2>
          </div>
          
          <div className={styles.headerStatus}>
            <button 
              className={`${styles.statusToggle} ${task.completed ? styles.completed : styles.pending}`}
              onClick={() => onToggleStatus(task.id)}
            >
              <span className={styles.statusIcon}>
                {task.completed ? '✓' : '○'}
              </span>
              <span className={styles.statusText}>
                {task.completed ? 'Выполнено' : 'В работе'}
              </span>
            </button>
          </div>
        </div>
        
        <div className={styles.sidebarContent}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              Название
            </h3>
            <p className={styles.taskTitle}>{task.title}</p>
          </div>
          
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              Описание
            </h3>
            <p className={styles.taskDescription}>
              {task.body || 'Нет описания для этой задачи'}
            </p>
          </div>
        </div>
        
        <div className={styles.sidebarFooter}>
          <button className={styles.closeButton} onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </>
  );
};