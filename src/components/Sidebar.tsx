import { NavLink } from 'react-router';
import { LayoutDashboard, FolderKanban, ListTodo, Users, CalendarDays, Settings } from 'lucide-react';

const menuItems=
[
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Projects', icon: FolderKanban, path: '/projects' }
];

const futureItems=
[
  { label: 'My Tasks', icon: ListTodo },
  { label: 'Team', icon: Users },
  { label: 'Calendar', icon: CalendarDays },
  { label: 'Settings', icon: Settings }
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

            {
                futureItems.map((item)=>
                {
                    const Icon=item.icon;

                    return(
                        <div
                            key={item.label}
                            className="nav-item nav-disabled"
                            aria-disabled="true"
                        >
                            <Icon size={20}/>
                            <span>{item.label}</span>
                        </div>
                    );
                })
            }
            </nav>
        </aside>
    );
}

export default Sidebar;