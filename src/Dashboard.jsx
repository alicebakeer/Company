import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './App.css';

function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (!token) {
            navigate('/login');
            return;
        }

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        navigate('/login');
    };

    return (
        <div className="dashboard-page">

            <Header />

            <div className="dashboard-container">

                <div className="dashboard-header">
                    <div>
                        <p className="dashboard-label">
                            USER DASHBOARD
                        </p>

                        <h1>
                            Welcome
                            {user
                                ? `, ${user.first_name}`
                                : ''}
                        </h1>

                        <p className="dashboard-subtitle">
                            Manage your account and access your services.
                        </p>
                    </div>

                    <div className="user-avatar">
                        {user
                            ? user.first_name?.charAt(0).toUpperCase()
                            : 'U'}
                    </div>
                </div>


                <div className="dashboard-cards">

                    <div className="dashboard-card">
                        <div className="card-icon">
                            👤
                        </div>

                        <h3>Profile</h3>

                        <p>
                            View and manage your personal information.
                        </p>

                        <button
                            className="dashboard-btn"
                            onClick={() => navigate('/profile')}
                        >
                            View Profile
                        </button>
                    </div>


                    <div className="dashboard-card">
                        <div className="card-icon">
                            ✉
                        </div>

                        <h3>Contact</h3>

                        <p>
                            Send us your questions, requests or messages.
                        </p>

                        <button
                            className="dashboard-btn"
                            onClick={() => navigate('/contact')}
                        >
                            Contact Us
                        </button>
                    </div>


                    <div className="dashboard-card">
                        <div className="card-icon">
                            ⚙
                        </div>

                        <h3>Content Management</h3>

                        <p>
                            Manage and update your website content.
                        </p>

                        <button
                            className="dashboard-btn"
                            onClick={() => navigate('/content')}
                        >
                            Manage Content
                        </button>
                    </div>

                </div>


                {user && (
                    <div className="user-info-card">

                        <h2>Account Information</h2>

                        <div className="user-info-grid">

                            <div>
                                <span>First Name</span>
                                <strong>
                                    {user.first_name}
                                </strong>
                            </div>

                            <div>
                                <span>Last Name</span>
                                <strong>
                                    {user.last_name}
                                </strong>
                            </div>

                            <div>
                                <span>Email</span>
                                <strong>
                                    {user.email}
                                </strong>
                            </div>

                            <div>
                                <span>Phone</span>
                                <strong>
                                    {user.phone_nbr}
                                </strong>
                            </div>

                        </div>

                    </div>
                )}


                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>
        </div>
    );
}

export default Dashboard;