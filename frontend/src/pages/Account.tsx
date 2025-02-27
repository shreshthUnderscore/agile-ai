import React from 'react';
import { useAuthStore } from '../store/authStore';
import { UserCircle } from 'lucide-react';

const Account: React.FC = () => {
  const { user } = useAuthStore();
  
  if (!user) return null;
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Account</h1>
      
      <div className="card">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.username}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>
        
        <div className="border-t border-border pt-4">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <UserCircle className="text-primary" />
            <span>Profile Information</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-1">Username</label>
              <div className="input">{user.username}</div>
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Email</label>
              <div className="input">{user.email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;