import { Task, TaskFormData } from '@/types/task';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export type TaskAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string };

export const initialTaskState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed, updatedAt: new Date() }
            : task
        ),
      };
    
    default:
      return state;
  }
}

// Funções auxiliares para criar tarefas
export function createTask(data: TaskFormData): Task {
  return {
    id: Math.random().toString(36).substr(2, 9),
    title: data.title,
    description: data.description,
    completed: data.completed || false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function updateTask(existingTask: Task, data: TaskFormData): Task {
  return {
    ...existingTask,
    title: data.title,
    description: data.description,
    completed: data.completed !== undefined ? data.completed : existingTask.completed,
    updatedAt: new Date(),
  };
}
