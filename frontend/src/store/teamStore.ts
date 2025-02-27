import { create } from 'zustand';
import { Team, TeamMember } from '../types';
import { useAuthStore } from './authStore';

interface TeamState {
  team: Team | null;
  createTeam: (name: string) => void;
  addMember: (member: Omit<TeamMember, 'id'>) => void;
  removeMember: (id: string) => void;
  setTeamLead: (memberId: string) => void;
  isTeamLead: (userId: string) => boolean;
}

export const useTeamStore = create<TeamState>((set, get) => ({
  team: null,
  
  createTeam: (name: string) => {
    const user = useAuthStore.getState().user;
    
    set({
      team: {
        id: Date.now().toString(),
        name,
        members: [],
        leadId: user?.id
      }
    });
    
    // Set the creator as team lead
    if (user) {
      useAuthStore.getState().updateUserRole('lead');
    }
  },
  
  addMember: (member) => {
    const { team } = get();
    
    if (!team) return;
    
    const newMember: TeamMember = {
      ...member,
      id: Date.now().toString()
    };
    
    set({
      team: {
        ...team,
        members: [...team.members, newMember]
      }
    });
  },
  
  removeMember: (id: string) => {
    const { team } = get();
    
    if (!team) return;
    
    set({
      team: {
        ...team,
        members: team.members.filter(member => member.id !== id)
      }
    });
  },
  
  setTeamLead: (memberId: string) => {
    const { team } = get();
    
    if (!team) return;
    
    set({
      team: {
        ...team,
        leadId: memberId
      }
    });
  },
  
  isTeamLead: (userId: string) => {
    const { team } = get();
    if (!team) return false;
    return team.leadId === userId;
  }
}));