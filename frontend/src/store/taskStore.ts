import { create } from 'zustand';
import { Task, TaskFormData, TaskPriority } from '../types';
import { useAuthStore } from './authStore';

interface TaskState {
  tasks: Task[];
  addTask: (taskData: TaskFormData) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt' | 'createdBy'>>) => void;
  removeTask: (id: string) => void;
  moveTask: (id: string, status: Task['status']) => void;
  assignTask: (id: string, assigneeId: string) => void;
  updatePriority: (id: string, priority: TaskPriority) => void;
  getTasksByAssignee: (assigneeId: string) => Task[];
  getTasksByStatus: (status: Task['status']) => Task[];
  getTasksByPriority: (priority: TaskPriority) => Task[];
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [
    {
      id: '1',
      title: 'Design UI mockups',
      description: 'Create mockups for the dashboard',
      status: 'todo',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      createdBy: '1'
    },
    {
      id: '2',
      title: 'Implement authentication',
      description: 'Set up user authentication flow',
      status: 'inProgress',
      priority: 'high',
      createdAt: new Date().toISOString(),
      createdBy: '1'
    },
    {
      id: '3',
      title: 'Create API endpoints',
      description: 'Develop backend API endpoints',
      status: 'review',
      priority: 'critical',
      createdAt: new Date().toISOString(),
      createdBy: '1'
    }
  ],
  
  addTask: (taskData) => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      status: 'todo',
      createdAt: new Date().toISOString(),
      createdBy: user.id
    };
    
    set(state => ({
      tasks: [...state.tasks, newTask]
    }));
  },
  
  updateTask: (id, updates) => {
    set(state => ({
      tasks: state.tasks.map(task => 
        task.id === id ? { ...task, ...updates } : task
      )
    }));
  },
  
  removeTask: (id) => {
    set(state => ({
      tasks: state.tasks.filter(task => task.id !== id)
    }));
  },
  
  moveTask: (id, status) => {
    set(state => ({
      tasks: state.tasks.map(task => 
        task.id === id ? { ...task, status } : task
      )
    }));
  },
  
  assignTask: (id, assigneeId) => {
    set(state => ({
      tasks: state.tasks.map(task => 
        task.id === id ? { ...task, assigneeId } : task
      )
    }));
  },
  
  updatePriority: (id, priority) => {
    set(state => ({
      tasks: state.tasks.map(task => 
        task.id === id ? { ...task, priority } : task
      )
    }));
  },
  
  getTasksByAssignee: (assigneeId) => {
    return get().tasks.filter(task => task.assigneeId === assigneeId);
  },
  
  getTasksByStatus: (status) => {
    return get().tasks.filter(task => task.status === status);
  },
  
  getTasksByPriority: (priority) => {
    return get().tasks.filter(task => task.priority === priority);
  }
}));