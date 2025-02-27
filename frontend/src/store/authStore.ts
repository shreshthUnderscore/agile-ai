import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string, role?: 'member' | 'lead') => Promise<void>;
  logout: () => void;
  updateUserRole: (role: 'member' | 'lead') => void;
}

// Mock user data for demonstration
const mockUsers = [
  { id: '1', username: 'demo', email: 'demo@example.com', password: 'password', role: 'lead' as const }
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
          const { password, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword, isAuthenticated: true });
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },
  
  signup: async (username: string, email: string, password: string, role: 'member' | 'lead' = 'member') => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find(u => u.email === email);
        
        if (existingUser) {
          reject(new Error('User already exists'));
        } else {
          const newUser = { id: Date.now().toString(), username, email, password, role };
          mockUsers.push(newUser);
          
          const { password: _, ...userWithoutPassword } = newUser;
          set({ user: userWithoutPassword, isAuthenticated: true });
          resolve();
        }
      }, 500);
    });
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  updateUserRole: (role: 'member' | 'lead') => {
    set(state => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          role
        }
      };
    });
  }
}));