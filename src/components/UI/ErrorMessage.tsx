import React from 'react';
import { Button } from './Button';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorText}>{message}</p>
      <Button onClick={onRetry} variant="secondary">
        Попробовать снова
      </Button>
    </div>
  );
};