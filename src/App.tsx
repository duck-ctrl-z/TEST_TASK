import React from 'react';
import { TaskList } from './components/TaskList/TaskList';
import { TaskSidebar } from './components/TaskSidebar/TaskSidebar';
import { FilterBar } from './components/FilterBar/FilterBar';
import { Loader } from './components/UI/Loader';
import { ErrorMessage } from './components/UI/ErrorMessage';
import { useTasks } from './hooks/useTasks';
import styles from './App.module.css';

function App() {
  const { 
    tasks,
    allTasks,
    loading, 
    error, 
    selectedTask,
    isSidebarOpen,
    filter,
    setFilter,
    selectTask, 
    closeSidebar,
    toggleTaskStatus,
    retry 
  } = useTasks();

  const counts = {
    all: allTasks.length,
    completed: allTasks.filter(t => t.completed).length,
    active: allTasks.filter(t => !t.completed).length
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            Менеджер задач
          </h1>
          <p className={styles.subtitle}>
            Нажмите на карточку задачи, чтобы увидеть детали в боковой панели
          </p>
        </div>
      </header>
      
      <main className={styles.main}>
        <div className={styles.container}>
          {loading && <Loader />}
          
          {error && !loading && (
            <ErrorMessage message={error} onRetry={retry} />
          )}
          
          {!loading && !error && tasks.length > 0 && (
            <>             
              <FilterBar 
                currentFilter={filter}
                onFilterChange={setFilter}
                counts={counts}
              />
              
              <TaskList
                tasks={tasks}
                selectedTaskId={selectedTask?.id || null}
                onSelectTask={selectTask}
                onToggleStatus={toggleTaskStatus}
              />
            </>
          )}
          
          {!loading && !error && tasks.length === 0 && allTasks.length > 0 && (
            <div className={styles.emptyState}>
              <p className={styles.emptyMessage}>Нет задач по выбранному фильтру</p>
            </div>
          )}
          
          {!loading && !error && allTasks.length === 0 && (
            <div className={styles.emptyState}>
              <p className={styles.emptyMessage}>Нет задач для отображения</p>
            </div>
          )}
        </div>
      </main>
      
      <TaskSidebar
        task={selectedTask}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        onToggleStatus={toggleTaskStatus}
      />
    </div>
  );
}

export default App;