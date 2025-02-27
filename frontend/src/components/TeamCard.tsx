import React from 'react';
import { useTeamStore } from '../store/teamStore';
import { Users, UserPlus, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeamCard: React.FC = () => {
  const { team } = useTeamStore();
  
  if (!team) {
    return (
      <div className="card flex flex-col items-center justify-center p-8 text-center">
        <Users size={48} className="text-primary mb-4" />
        <h2 className="text-xl font-bold mb-2">No Team Created Yet</h2>
        <p className="text-gray-400 mb-4">Create a team to start collaborating with your members</p>
        <Link to="/team" className="btn btn-primary flex items-center gap-2">
          <UserPlus size={18} />
          <span>Create Team</span>
        </Link>
      </div>
    );
  }
  
  const teamLead = team.members.find(member => member.id === team.leadId);
  
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Users className="text-primary" />
          <span>{team.name}</span>
        </h2>
        <Link to="/team" className="btn btn-secondary text-sm">
          Manage Team
        </Link>
      </div>
      
      {teamLead && (
        <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center relative">
              {teamLead.name.charAt(0).toUpperCase()}
              <span className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-0.5">
                <Crown size={10} className="text-background" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{teamLead.name}</h3>
                <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Crown size={10} />
                  <span>Team Lead</span>
                </span>
              </div>
              <p className="text-sm text-gray-400">{teamLead.role}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.members
          .filter(member => member.id !== team.leadId)
          .map(member => (
            <div key={member.id} className="bg-secondary rounded-lg p-3 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-gray-400">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        
        {team.members.length === 0 && (
          <div className="col-span-full text-center py-6 text-gray-400">
            <p>No team members yet. Add members to your team.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCard;