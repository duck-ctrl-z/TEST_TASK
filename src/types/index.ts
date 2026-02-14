export interface Task {
  id: number;
  title: string;
  body?: string;
  completed: boolean;
  userId?: number;
}

export type FilterType = 'all' | 'completed' | 'active';