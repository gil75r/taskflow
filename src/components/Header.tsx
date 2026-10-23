import { Bell, Search } from 'lucide-react';

function Header()
{
  return(
    <header className="header">
        <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's your project overview.</p>
        </div>

        <div className="header-actions">
            <div className="search-box">
                <Search size={18}/>
                <input type="search" placeholder="Search..." aria-label="Search"/>
            </div>

            <button type="button" className="icon-button" aria-label="Notifications">
                <Bell size={20}/>
            </button>

            <div className="avatar">U</div>
        </div>
    </header>
  );
}

export default Header;