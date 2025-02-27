import React, { useState } from 'react';
import { Task, TeamMember } from '../types';
import { useTeamStore } from '../store/teamStore';
import { useAuthStore } from '../store/authStore';
import { useTaskStore } from '../store/taskStore';
import { 
  AlertCircle, 
  Clock, 
  Flag, 
  MoreVertical, 
  Pencil, 
  Trash2, 
  UserCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { team } = useTeamStore();
  const { user } = useAuthStore();
  const { updateTask, removeTask, assignTask, updatePriority } = useTaskStore();
  const [showMenu, setShowMenu] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showAssignMenu, setShowAssignMenu] = useState(false);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);
  
  const assignee = team?.members.find(member => member.id === task.assigneeId);
  const isTeamLead = user?.role === 'lead';
  const isAssignedToMe = task.assigneeId === user?.id;
  
  const priorityColors = {
    low: 'bg-blue-400/20 text-blue-400',
    medium: 'bg-yellow-400/20 text-yellow-400',
    high: 'bg-orange-400/20 text-orange-400',
    critical: 'bg-red-400/20 text-red-400'
  };
  
  const priorityIcons = {
    low: <Flag size={14} />,
    medium: <Flag size={14} />,
    high: <Flag size={14} />,
    critical: <Flag size={14} />
  };
  
  const handleAssign = (memberId: string) => {
    assignTask(task.id, memberId);
    setShowAssignMenu(false);
  };
  
  const handlePriorityChange = (priority: Task['priority']) => {
    updatePriority(task.id, priority);
    setShowPriorityMenu(false);
  };
  
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      removeTask(task.id);
    }
  };
  
  return (
    <div 
      className="card mb-2 cursor-grab relative"
      draggable
    >
      <div className="flex justify-between items-start">
        <h4 className="font-medium">{task.title}</h4>
        <div className="relative">
          <button 
            className="p-1 hover:bg-card-hover rounded-md"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreVertical size={16} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 bg-secondary border border-border rounded-md shadow-lg z-10 w-48">
              {(isTeamLead || isAssignedToMe) && (
                <button 
                  className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-card-hover"
                  onClick={() => {
                    setShowMenu(false);
                    // Open edit modal
                  }}
                >
                  <Pencil size={14} />
                  <span>Edit Task</span>
                </button>
              )}
              
              {isTeamLead && (
                <>
                  <button 
                    className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-card-hover"
                    onClick={() => {
                      setShowAssignMenu(true);
                      setShowMenu(false);
                    }}
                  >
                    <UserCircle size={14} />
                    <span>Assign Task</span>
                  </button>
                  
                  <button 
                    className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-card-hover"
                    onClick={() => {
                      setShowPriorityMenu(true);
                      setShowMenu(false);
                    }}
                  >
                    <Flag size={14} />
                    <span>Set Priority</span>
                  </button>
                  
                  <button 
                    className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-card-hover text-red-400"
                    onClick={handleDelete}
                  >
                    <Trash2 size={14} />
                    <span>Delete Task</span>
                  </button>
                </>
              )}
            </div>
          )}
          
          {showAssignMenu && (
            <div className="absolute right-0 top-full mt-1 bg-secondary border border-border rounded-md shadow-lg z-10 w-48">
              <div className="p-2 border-b border-border">
                <h5 className="font-medium">Assign to</h5>
              </div>
              
              {team?.members.map(member => (
                <button 
                  key={member.id}
                  className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-card-hover"
                  onClick={() => handleAssign(member.id)}
                >
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{member.name}</span>
                </button>
              ))}
              
              <button 
                className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-card-hover border-t border-border"
                onClick={() => setShowAssignMenu(false)}
              >
                <span>Cancel</span>
              </button>
            </div>
          )}
          
          {showPriorityMenu && (
            <div className="absolute right-0 top-full mt-1 bg-secondary border border-border rounded-md shadow-lg z-10 w-48">
              <div className="p-2 border-b border-border">
                <h5 className="font-medium">Set Priority</h5>
              </div>
              
              {(['low', 'medium', 'high', 'critical'] as const).map(priority => (
                <button 
                  key={priority}
                  className={`flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-card-hover ${
                    task.priority === priority ? 'bg-card-hover' : ''
                  }`}
                  onClick={() => handlePriorityChange(priority)}
                >
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${priorityColors[priority]}`}>
                    {priorityIcons[priority]}
                    <span className="ml-1 capitalize">{priority}</span>
                  </span>
                </button>
              ))}
              
              <button 
                className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-card-hover border-t border-border"
                onClick={() => setShowPriorityMenu(false)}
              >
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-2">
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${priorityColors[task.priority]}`}>
          {priorityIcons[task.priority]}
          <span className="ml-1 capitalize">{task.priority}</span>
        </span>
        
        {task.dueDate && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-purple-400/20 text-purple-400">
            <Clock size={14} />
            <span className="ml-1">{new Date(task.dueDate).toLocaleDateString()}</span>
          </span>
        )}
      </div>
      
      <p className="text-sm text-gray-400 mt-2 line-clamp-2">{task.description}</p>
      
      <div className="flex justify-between items-center mt-3">
        {assignee ? (
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs">
              {assignee.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs text-gray-400">{assignee.name}</span>
          </div>
        ) : (
          <span className="text-xs text-gray-400">Unassigned</span>
        )}
        
        <button 
          className="text-xs text-gray-400 flex items-center"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? (
            <>
              <ChevronUp size={14} />
              <span className="ml-1">Less</span>
            </>
          ) : (
            <>
              <ChevronDown size={14} />
              <span className="ml-1">More</span>
            </>
          )}
        </button>
      </div>
      
      {showDetails && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-sm text-gray-400">{task.description}</p>
          
          {task.dueDate && (
            <div className="mt-2 text-sm">
              <span className="text-gray-400">Due: </span>
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          )}
          
          <div className="mt-2 text-sm">
            <span className="text-gray-400">Created: </span>
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;