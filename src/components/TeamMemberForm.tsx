import { useState, type SubmitEvent } from 'react';
import type { TeamMember } from '../types';

interface TeamMemberFormProps
{
    member?: TeamMember;
        onSave: (member: Omit<TeamMember, 'id'>)=> void;
        onCancel: ()=> void;
}

export default function TeamMemberForm
({
    member,
    onSave,
    onCancel
}: TeamMemberFormProps)
{
    const [name, setName]=useState(member?.name ?? '');
    const [email, setEmail]=useState(member?.email ?? '');
    const [role, setRole]=useState(member?.role ?? '');
    const [color, setColor]=useState(member?.color ?? '#6750e8');

    function handleSubmit(event: SubmitEvent<HTMLFormElement>)
    {
        event.preventDefault();

        if(!name.trim() || !email.trim() || !role.trim())
        {
            return;
        }

        onSave({ name: name.trim(), email: email.trim(), role: role.trim(), color });
    }

    return(
        <form className="team-member-form" onSubmit={handleSubmit}>
            <h2>{member ? 'Edit Team Member' : 'Add Team Member'}</h2>

            <div className="form-field">
                <label htmlFor="member-name">Full Name</label>
                <input
                    id="member-name"
                    type="text"
                    value={name}
                    onChange={event=> setName(event.target.value)}
                    placeholder="Enter full name"
                    required
                />
            </div>

            <div className="form-field">
                <label htmlFor="member-email">Email</label>
                <input
                    id="member-email"
                    type="email"
                    value={email}
                    onChange={event=> setEmail(event.target.value)}
                    placeholder="Enter email address"
                    required
                />
            </div>

            <div className="form-field">
                <label htmlFor="member-role">Role</label>
                <input
                    id="member-role"
                    type="text"
                    value={role}
                    onChange={event=> setRole(event.target.value)}
                    placeholder="e.g. Frontend Developer"
                    required
                />
            </div>

            <div className="form-field">
                <label htmlFor="member-color">Avatar Color</label>
                <input
                    id="member-color"
                    type="color"
                    value={color}
                    onChange={event=> setColor(event.target.value)}
                />
            </div>

            <div className="team-form-actions">
                <button
                    type="button"
                    className="secondary-button"
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button type="submit" className="primary-button">
                    {member ? 'Save Changes' : 'Add Member'}
                </button>
            </div>
        </form>
    );
}