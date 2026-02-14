import React from 'react';
import styles from './Loader.module.css';

export const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
      <p>Загрузка задач...</p>
    </div>
  );
};