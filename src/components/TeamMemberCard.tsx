import type { TeamMember } from '../types';

interface TeamMemberCardProps
{
    member: TeamMember;
}

export default function TeamMemberCard
({
    member
}: TeamMemberCardProps)
{
    const initials=member.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(word => word.charAt(0))
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

        </article>
    );
}