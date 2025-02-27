import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LayoutDashboard, UserPlus, Crown, User } from 'lucide-react';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'member' | 'lead'>('member');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuthStore();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await signup(username, email, password, role);
      navigate('/');
    } catch (err) {
      setError('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-2">
            <LayoutDashboard className="text-primary" size={32} />
            <span>AgileAi</span>
          </h1>
          <p className="text-gray-400">Create a new account</p>
        </div>
        
        <div className="card">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2">Username</label>
              <input
                type="text"
                id="username"
                className="input w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="input w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="input w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block mb-2">Account Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center p-4 rounded-md border ${
                    role === 'member' 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border bg-secondary'
                  }`}
                  onClick={() => setRole('member')}
                >
                  <User className={role === 'member' ? 'text-primary' : 'text-gray-400'} size={24} />
                  <span className={`mt-2 ${role === 'member' ? 'text-primary' : 'text-gray-400'}`}>Team Member</span>
                </button>
                
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center p-4 rounded-md border ${
                    role === 'lead' 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border bg-secondary'
                  }`}
                  onClick={() => setRole('lead')}
                >
                  <Crown className={role === 'lead' ? 'text-primary' : 'text-gray-400'} size={24} />
                  <span className={`mt-2 ${role === 'lead' ? 'text-primary' : 'text-gray-400'}`}>Team Lead</span>
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-full flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;