import React from 'react';
import { FilterType } from '../../types';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    completed: number;
    active: number;
  };
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  currentFilter, 
  onFilterChange,
  counts 
}) => {
  return (
    <div className={styles.filterBar}>
      <button
        className={`${styles.filterButton} ${currentFilter === 'all' ? styles.active : ''}`}
        onClick={() => onFilterChange('all')}
      >
        Все <span className={styles.count}>({counts.all})</span>
      </button>
      <button
        className={`${styles.filterButton} ${currentFilter === 'active' ? styles.active : ''}`}
        onClick={() => onFilterChange('active')}
      >
        Активные <span className={styles.count}>({counts.active})</span>
      </button>
      <button
        className={`${styles.filterButton} ${currentFilter === 'completed' ? styles.active : ''}`}
        onClick={() => onFilterChange('completed')}
      >
        Выполненные <span className={styles.count}>({counts.completed})</span>
      </button>
    </div>
  );
};