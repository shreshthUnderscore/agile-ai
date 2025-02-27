export interface User {
  id: string;
  username: string;
  email: string;
  role?: 'member' | 'lead';
}

export interface TeamMember {
  id: string;
  name: string;
  resume: File | null;
  role: string;
  avatarUrl?: string;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  leadId?: string;
}

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inProgress' | 'review' | 'done';
  assigneeId?: string;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  createdBy: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  assigneeId?: string;
  priority: TaskPriority;
  dueDate?: string;
}