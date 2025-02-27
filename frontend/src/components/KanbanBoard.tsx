import React, { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { useTeamStore } from '../store/teamStore';
import { useAuthStore } from '../store/authStore';
import { ClipboardList, Clock, CheckCircle2, AlertCircle, Plus, Filter } from 'lucide-react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

const KanbanBoard: React.FC = () => {
  const { tasks, moveTask } = useTaskStore();
  const { team } = useTeamStore();
  const { user } = useAuthStore();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filterAssignee, setFilterAssignee] = useState<string | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<string | 'all'>('all');
  
  const columns = [
    { id: 'todo', title: 'To Do', icon: <ClipboardList className="text-blue-400" /> },
    { id: 'inProgress', title: 'In Progress', icon: <Clock className="text-yellow-400" /> },
    { id: 'review', title: 'Review', icon: <AlertCircle className="text-purple-400" /> },
    { id: 'done', title: 'Done', icon: <CheckCircle2 className="text-green-400" /> }
  ] as const;
  
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, status: 'todo' | 'inProgress' | 'review' | 'done') => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    moveTask(taskId, status);
  };
  
  const filteredTasks = tasks.filter(task => {
    if (filterAssignee !== 'all' && task.assigneeId !== filterAssignee) {
      return false;
    }
    
    if (filterPriority !== 'all' && task.priority !== filterPriority) {
      return false;
    }
    
    return true;
  });
  
  const isTeamLead = user?.role === 'lead';
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div>
            <label htmlFor="filterAssignee" className="block text-sm mb-1">Filter by Assignee</label>
            <select
              id="filterAssignee"
              className="input text-sm"
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
            >
              <option value="all">All Assignees</option>
              <option value={user?.id || ''}>Assigned to me</option>
              <option value="">Unassigned</option>
              {team?.members.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="filterPriority" className="block text-sm mb-1">Filter by Priority</label>
            <select
              id="filterPriority"
              className="input text-sm"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
        
        {isTeamLead && (
          <button 
            className="btn btn-primary flex items-center gap-2"
            onClick={() => setShowTaskForm(true)}
          >
            <Plus size={18} />
            <span>Add Task</span>
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-4 gap-4 h-full">
        {columns.map(column => (
          <div 
            key={column.id}
            className="flex flex-col bg-secondary rounded-lg"
          >
            <div className="p-3 border-b border-border flex items-center gap-2">
              {column.icon}
              <h3 className="font-semibold">{column.title}</h3>
              <span className="ml-auto bg-background px-2 py-0.5 rounded-full text-xs">
                {filteredTasks.filter(task => task.status === column.id).length}
              </span>
            </div>
            
            <div 
              className="flex-1 p-2 overflow-auto"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {filteredTasks
                .filter(task => task.status === column.id)
                .map(task => (
                  <div 
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                  >
                    <TaskCard task={task} />
                  </div>
                ))}
              
              {filteredTasks.filter(task => task.status === column.id).length === 0 && (
                <div className="text-center py-4 text-gray-400 text-sm">
                  <p>No tasks</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} />}
    </div>
  );
};

export default KanbanBoard;