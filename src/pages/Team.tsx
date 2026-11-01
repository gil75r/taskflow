import { Users } from 'lucide-react';
import { useTeam } from '../context/TeamContext';
import TeamMemberCard from '../components/TeamMemberCard';

export default function Team()
{
    const { members }=useTeam();

    return(
        <div className="team-page">

            <div className="team-page-header">
                <div>
                    <h1>Team Members</h1>
                    <p>Manage your team and assignments</p>
                </div>

                <span className="team-total">
                    <Users size={18}/>
                    {members.length} Members
                </span>
            </div>

            {
                members.length === 0 ?
                (
                    <p className="empty-message">
                        No team members yet.
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
                            />
                        ))
                    }
                    </div>
                )
            }
        </div>
    );
}