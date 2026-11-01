import { Pencil, Trash2 } from 'lucide-react';
import type { TeamMember } from '../types';

interface TeamMemberCardProps
{
    member: TeamMember;
    onEdit: (member: TeamMember)=> void;
    onDelete: (id: number)=> void;
}

export default function TeamMemberCard
({
    member,
    onEdit,
    onDelete
}: TeamMemberCardProps)
{
    const initials=member.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(word=> word.charAt(0))
        .join('')
        .toUpperCase();

    return(
        <article className="team-member-card">
            <div
                className="team-member-avatar"
                style={{ backgroundColor: member.color }}
            >
                {initials}
            </div>

            <h3>{member.name}</h3>

            <p className="team-member-role">
                {member.role}
            </p>

            <p className="team-member-email">
                {member.email}
            </p>

            <div className="team-member-actions">
                <button
                    type="button"
                    className="team-action-button"
                    onClick={()=> onEdit(member)}
                    aria-label={`Edit ${member.name}`}
                >
                    <Pencil size={16}/>
                    Edit
                </button>

                <button
                    type="button"
                    className="team-action-button team-delete-button"
                    onClick={()=> onDelete(member.id)}
                    aria-label={`Delete ${member.name}`}
                >
                    <Trash2 size={16}/>
                    Delete
                </button>
            </div>
        </article>
    );
}