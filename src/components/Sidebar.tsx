import { NavLink } from 'react-router';
import {
    LayoutDashboard,
    FolderKanban,
    ListTodo,
    Users,
    CalendarDays,
    ChartNoAxesCombined,
    Settings
} from 'lucide-react';

const menuItems=
[
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Projects', icon: FolderKanban, path: '/projects' },
  { label: 'My Tasks', icon: ListTodo, path: '/tasks' },
  { label: 'Team', icon: Users, path: '/team' },
  { label: 'Calendar', icon: CalendarDays, path: '/calendar' },
  { label: 'Analytics', icon: ChartNoAxesCombined, path: '/analytics' },
  { label: 'Settings', icon: Settings, path: '/settings' }
];

function Sidebar()
{
    return(
        <aside className="sidebar">
            <div className="sidebar-logo">◈ TaskFlow</div>
            
            <nav className="sidebar-nav">
            {
                menuItems.map((item)=>
                {
                    const Icon=item.icon;

                    return(
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path==='/'}
                            className=
                            {
                                ({ isActive })=> isActive ? 'nav-item active' : 'nav-item'
                            }
                        >

                            <Icon size={20}/>
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })
            }
            </nav>
        </aside>
    );
}

export default Sidebar;