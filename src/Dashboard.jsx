import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dash.css';

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (!token) {
            navigate('/login', { replace: true });
            return;
        }

        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem('user');
            }
        }
    }, [navigate]);

    const firstName = user?.first_name || 'User';

    const fullName =
        [user?.first_name, user?.last_name]
            .filter(Boolean)
            .join(' ') || 'User';

    const cards = [
        {
            icon: '♙',
            title: 'Customer Requests',
            description: 'Submit and follow up on your requests.',
            path: '/CustomerService',
            label: 'View Requests',
        },
        {
            icon: '▤',
            title: 'Service Management',
            description: 'Access the services available to you.',
            path: '/service',
            label: 'Explore Services',
        },
        {
            icon: '▣',
            title: 'File Management',
            description: 'Upload and organize your documents.',
            path: '/documents',
            label: 'View Documents',
        },
        {
            icon: '▧',
            title: 'Projects',
            description: 'Manage your projects and tasks.',
            path: '/projects',
            label: 'View Projects',
        },
        {
            icon: '✉',
            title: 'Contact Us',
            description: 'Contact our team for help and information.',
            path: '/contact',
            label: 'Get in Touch',
        },
        {
            icon: '▧',
            title: 'Content Management',
            description: 'Manage your website content.',
            path: '/content',
            label: 'Manage Content',
        },
    ];

    return (
        <div className="dashboard-content">

            {/* Top Header */}
            <header className="main-topbar">
                <div>
                    <p className="topbar-label">YOUR WORKSPACE</p>
                    <h2>Dashboard</h2>
                </div>

                <div className="topbar-user">
                    <div className="topbar-avatar">
                        {firstName.charAt(0).toUpperCase()}
                    </div>

                    <div className="topbar-user-info">
                        <strong>{fullName}</strong>
                        <span>My Account</span>
                    </div>
                </div>
            </header>

            {/* Welcome Section */}
            <section className="dashboard-welcome">
                <div>
                    <span className="welcome-tag">
                        PERSONAL DASHBOARD
                    </span>

                    <h1>Hello, {firstName}!</h1>

                    <p>
                        Welcome back. Everything you need to manage
                        your account is right here.
                    </p>

                    <button
                        type="button"
                        className="welcome-button"
                        onClick={() => navigate('/CustomerService')}
                    >
                        Get Started <span>→</span>
                    </button>
                </div>

                <div
                    className="welcome-decoration"
                    aria-hidden="true"
                >
                    <div className="decoration-circle">
                        <span>✦</span>
                    </div>
                </div>
            </section>

            {/* Quick Access Cards */}
            <section className="workspace-section">
                <div className="workspace-heading">
                    <div>
                        <h2>Quick Access</h2>
                        <p>Choose a section to get started.</p>
                    </div>
                </div>

                <div className="workspace-grid">
                    {cards.map((card, index) => (
                        <article
                            className="workspace-card"
                            key={card.path}
                        >
                            <div className="workspace-card-top">
                                <div className="workspace-icon">
                                    {card.icon}
                                </div>

                                <span className="workspace-number">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>

                            <h3>{card.title}</h3>
                            <p>{card.description}</p>

                            <button
                                type="button"
                                className="workspace-button"
                                onClick={() => navigate(card.path)}
                            >
                                {card.label} <span>→</span>
                            </button>
                        </article>
                    ))}
                </div>
            </section>

            {/* Account Information */}
            {user && (
                <section className="account-panel">
                    <div className="account-panel-heading">
                        <div className="account-heading-icon">
                            ♙
                        </div>

                        <div>
                            <h2>Account Information</h2>
                            <p>Your registered personal details.</p>
                        </div>
                    </div>

                    <div className="account-details">
                        <div className="account-detail">
                            <span>First Name</span>
                            <strong>
                                {user.first_name || '—'}
                            </strong>
                        </div>

                        <div className="account-detail">
                            <span>Last Name</span>
                            <strong>
                                {user.last_name || '—'}
                            </strong>
                        </div>

                        <div className="account-detail">
                            <span>Email Address</span>
                            <strong>{user.email || '—'}</strong>
                        </div>

                        <div className="account-detail">
                            <span>Phone Number</span>
                            <strong>{user.phone_nbr || '—'}</strong>
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="dashboard-footer">
                <span>
                    © {new Date().getFullYear()} Your Workspace
                </span>

                <span>Personal Dashboard</span>
            </footer>

        </div>
    );
}

export default Dashboard;