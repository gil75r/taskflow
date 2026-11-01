import { createContext, useContext, type ReactNode } from 'react';
import type { TeamMember } from '../types';
import { initialTeamMembers } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TeamContextType
{
    members: TeamMember[];
    addMember: (member: Omit<TeamMember, 'id'>)=> void;
    updateMember: (member: TeamMember)=> void;
    deleteMember: (id: number)=> void;
}

const TeamContext=createContext<TeamContextType | undefined>
(
    undefined
);

export function TeamProvider
({
    children
}:
{
    children: ReactNode;
})
{
    const [members, setMembers]=useLocalStorage<TeamMember[]>
    (
        'taskflow-team',
        initialTeamMembers
    );

    function addMember(member: Omit<TeamMember, 'id'>)
    {
        const newMember: TeamMember=
        {
            ...member,
            id: Date.now()
        };

        setMembers(currentMembers=>
        [
            ...currentMembers,
            newMember
        ]);
    }

    function updateMember(updatedMember: TeamMember)
    {
        setMembers(currentMembers=>
            currentMembers.map(member=> member.id===updatedMember.id ? updatedMember : member)
        );
    }

    function deleteMember(id: number)
    {
        setMembers(currentMembers=>
            currentMembers.filter(member=> member.id!==id)
        );
    }

    return(
        <TeamContext.Provider value={{ members, addMember, updateMember, deleteMember }}>
            {children}
        </TeamContext.Provider>
    );
}

export function useTeam()
{
    const context=useContext(TeamContext);

    if(!context)
    {
        throw new Error
        (
            'useTeam must be used inside TeamProvider'
        );
    }
    
    return context;
}