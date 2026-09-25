import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './App.css';

function AdminDashboard() {
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
                            Admin DASHBOARD
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


              
                           <div className="dashboard-card">
                        <div className="card-icon">
                            ✉
                        </div>

                        <h3>Admin Requests</h3>

                        <p>
                         Your Requests will be done
                        </p>

                        <button
                            className="dashboard-btn"
                            onClick={() => navigate('/AdminCustomerRequests')}
                        >
                          Service
                        </button>
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

export default AdminDashboard;