
import { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import type { TeamMember } from '../types';
import { useTeam } from '../context/TeamContext';
import TeamMemberCard from '../components/TeamMemberCard';
import TeamMemberForm from '../components/TeamMemberForm';
import { useTasks } from '../context/TasksContext';

export default function Team()
{
    const
    {
        members,
        addMember,
        updateMember,
        deleteMember
    }=useTeam();

    const [showForm, setShowForm]=useState(false);
    const [editingMember, setEditingMember]=useState<TeamMember | null>(null);
    const { tasks, unassignTasksByMember }=useTasks();

    function openNewMemberForm()
    {
        setEditingMember(null);
        setShowForm(true);
    }

    function openEditMemberForm(member: TeamMember)
    {
        setEditingMember(member);
        setShowForm(true);
    }

    function closeForm()
    {
        setShowForm(false);
        setEditingMember(null);
    }

    function handleSave(data: Omit<TeamMember, 'id'>)
    {
        if(editingMember)
        {
            updateMember
            ({
                ...data,
                id: editingMember.id
            });
        }
        else
        {
            addMember(data);
        }

        closeForm();
    }

    function handleDelete(id: number)
    {
        const member=members.find
        (
            member=> member.id===id
        );

        if(!member)
        {
            return;
        }

        const assignedTasksCount=tasks.filter
        (
            task=> task.assigneeId===id
        ).length;

        const message=assignedTasksCount>0
            ? `Are you sure you want to delete ${member.name}?\n\n`+
            `${assignedTasksCount} assigned task(s) will become unassigned.`
            : `Are you sure you want to delete ${member.name}?`;

        if(window.confirm(message))
        {
            unassignTasksByMember(id);
            deleteMember(id);
        }
    }

    return(
        <div className="team-page">

            <div className="team-page-header">
                <div>
                    <h1>Team Members</h1>
                    <p>Manage your team and assignments</p>
                </div>

                <button
                    type="button"
                    className="primary-button"
                    onClick={openNewMemberForm}
                >
                    <Plus size={18}/>
                    Add Member
                </button>
            </div>

            <div className="team-summary">
                <Users size={18}/>
                <span>{members.length} Members</span>
            </div>

            {
                members.length===0 ?
                (
                    <p className="empty-message">
                        No team members yet. Add your first team member.
                    </p>
                ) :
                (
                    <div className="team-grid">
                    {
                        members.map(member=>
                        (
                            <TeamMemberCard
                                key={member.id}
                                member={member}
                                onEdit={openEditMemberForm}
                                onDelete={handleDelete}
                            />
                        ))
                    }
                    </div>
                )
            }

            {
                showForm &&
                (
                    <div className="modal-backdrop">
                        <div
                            className="modal-content"
                            role="dialog"
                            aria-modal="true"
                            aria-label=
                            {
                                editingMember ? 'Edit Team Member' : 'Add Team Member'
                            }
                        >
                            <TeamMemberForm
                                key={editingMember?.id ?? 'new'}
                                member={editingMember ?? undefined}
                                onSave={handleSave}
                                onCancel={closeForm}
                            />
                        </div>
                    </div>
                )
            }

        </div>
    );
}