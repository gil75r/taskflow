import { useState } from 'react';
import { NavLink } from 'react-router';
import {
    LayoutDashboard,
    FolderKanban,
    ListTodo,
    Users,
    CalendarDays,
    ChartNoAxesCombined,
    Settings,
    Menu,
    X
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
    const [isMenuOpen, setIsMenuOpen]=useState(false);

    function closeMenu()
    {
        setIsMenuOpen(false);
    }

    return(
        <>
            <header className="mobile-header">
                <span className="mobile-logo">◈ TaskFlow</span>

                <button
                    type="button"
                    className="mobile-menu-button"
                    onClick={()=> setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                    aria-controls="sidebar-navigation"
                >
                {
                    isMenuOpen ?
                    (
                        <X size={24} aria-hidden="true"/>
                    ) :
                    (
                        <Menu size={24} aria-hidden="true"/>
                    )
                }
                </button>
            </header>

            {
                isMenuOpen &&
                (
                    <button
                        type="button"
                        className="sidebar-overlay"
                        onClick={closeMenu}
                        aria-label="Close navigation menu"
                        tabIndex={-1}
                    />
                )
            }

            <aside className={`sidebar ${isMenuOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-logo">◈ TaskFlow</div>

                <nav
                    id="sidebar-navigation"
                    className="sidebar-nav"
                    aria-label="Main navigation"
                >
                {
                    menuItems.map((item)=>
                    {
                        const Icon=item.icon;

                        return(
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path==='/'}
                                onClick={closeMenu}
                                className={({ isActive })=>
                                    isActive ? 'nav-item active' : 'nav-item'
                                }
                            >
                                <Icon size={20} aria-hidden="true"/>
                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })
                }
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;