import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { cricketTheme, cx } from '../theme/theme.jsx';
// import cricketLogo from '../assets/cricket.png'; 

const navItems = [
  { name: 'home', path: '/' },
  { name: 'matches', path: '/matches' },
  { name: 'schedules', path: '/schedules' },
  { name: 'series', path: '/series' },
  { name: 'teams', path: '/teams' },
  // { name: 'venues', path: '/venues' },
  { name: 'players', path: '/players' },
  { name: 'news', path: '/news' },
  // { name: 'stats', path: '/stats' },
];

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-700 to-green-900 text-white shadow-lg">
      <div className={cx("flex items-center justify-between px-8 py-4", cricketTheme.layout.container)}>
        <div className="flex items-center">
          {/* <img src={cricketLogo} alt="Cricket" className="w-10 h-10 mr-3" /> */}
          <span className="text-2xl font-bold tracking-wide">CricketBuzz</span>
        </div>
        <ul className="flex space-x-4">
          {navItems.map((item) => (
            <li key={item.name} className="relative">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cx(
                    "px-4 py-2 rounded-lg transition-colors duration-200",
                    isActive
                      ? 'bg-yellow-400 text-green-900 font-semibold'
                      : 'hover:bg-green-600'
                  )
                }
                onClick={() => setOpenDropdown(null)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
