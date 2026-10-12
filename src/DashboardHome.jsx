import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    FaHome,
    FaUsers,
    FaUser,
    FaCogs,
    FaFileAlt,
    FaEnvelope,
    FaSignOutAlt,
    FaFolder,
    FaThLarge,
} from 'react-icons/fa';

import './DashboardHome.css';

function DashboardHome({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');

        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem('user');
            }
        }
    }, []);

    const firstName = user?.first_name || 'User';

    const menuItems = [
        { title: 'Dashboard', path: '/dashboard', icon: <FaHome /> },
        {
            title: 'Customer Requests',
            path: '/CustomerService',
            icon: <FaUsers />,
        },
        { title: 'Services', path: '/service', icon: <FaCogs /> },
        { title: 'Documents', path: '/documents', icon: <FaFileAlt /> },
        { title: 'Contact Us', path: '/contact', icon: <FaEnvelope /> },
        { title: 'Projects', path: '/projects', icon: <FaFolder /> },
        { title: 'Content', path: '/content', icon: <FaThLarge /> },
        { title: 'Profile', path: '/profile', icon: <FaUser /> },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login', { replace: true });
    };

    return (
        <div className="dashboard-layout">
            <aside className="dashboard-sidebar">
                <div className="sidebar-profile">
                    <div className="profile-avatar">
                        {firstName.charAt(0).toUpperCase()}
                    </div>

                    <h3>{firstName}</h3>
                    <p>Personal Account</p>
                </div>

                <nav className="sidebar-menu">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/dashboard'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'sidebar-link active'
                                    : 'sidebar-link'
                            }
                        >
                            <span className="sidebar-icon">
                                {item.icon}
                            </span>

                            <span>{item.title}</span>
                        </NavLink>
                    ))}
                </nav>

                <button
                    type="button"
                    className="sidebar-logout"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </aside>

            <main className="dashboard-main">
                {children}
            </main>
        </div>
    );
}

export default DashboardHome;