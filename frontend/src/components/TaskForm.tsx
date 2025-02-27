import React, { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { useTeamStore } from '../store/teamStore';
import { TaskFormData, TaskPriority } from '../types';
import { X, Calendar, Flag } from 'lucide-react';

interface TaskFormProps {
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
  const { addTask } = useTaskStore();
  const { team } = useTeamStore();
  
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'medium',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(formData);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-secondary rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Task</h2>
          <button 
            className="text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="input w-full"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task title"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              className="input w-full h-24 resize-none"
              value={formData.description}
              onChange={handleChange}
              placeholder="Task description"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="assigneeId" className="block mb-2">Assign To</label>
            <select
              id="assigneeId"
              name="assigneeId"
              className="input w-full"
              value={formData.assigneeId || ''}
              onChange={handleChange}
            >
              <option value="">Unassigned</option>
              {team?.members.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="priority" className="block mb-2 flex items-center gap-2">
              <Flag size={16} className="text-primary" />
              <span>Priority</span>
            </label>
            <select
              id="priority"
              name="priority"
              className="input w-full"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="dueDate" className="block mb-2 flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              <span>Due Date</span>
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="input w-full"
              value={formData.dueDate || ''}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;