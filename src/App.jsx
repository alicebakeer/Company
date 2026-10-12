import './App.css';

import Home from './Home';
import Login from './Login';
import About from './About';
import Contact from './Contact';
import Projects from './Projects';
import AdminDashboard from './AdminDashboard';
import Dashboard from './dashboard';
import Services from './Services';
import CustomerRequest from './CustomerService';
import Content from './Content';
import SignUp from './SignUp';
import DashboardHome from './DashboardHome';
import AdminCustomerRequests from './AdminCustomerRequests';
import Documents from './Documents';
import AllUsers from './AllUsers';

import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

// Reusable layout for user pages
function UserLayout({ children }) {
    return (
        <DashboardHome>
            {children}
        </DashboardHome>
    );
}

function App() {
    return (
        <BrowserRouter basename="/Company">
            <Routes>
                {/* Public pages */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* User pages with persistent sidebar */}
                <Route
                    path="/dashboard"
                    element={
                        <UserLayout>
                            <Dashboard />
                        </UserLayout>
                    }
                />

                <Route
                    path="/CustomerService"
                    element={
                        <UserLayout>
                            <CustomerRequest />
                        </UserLayout>
                    }
                />

                <Route
                    path="/service"
                    element={
                        <UserLayout>
                            <Services />
                        </UserLayout>
                    }
                />

                <Route
                    path="/documents"
                    element={
                        <UserLayout>
                            <Documents />
                        </UserLayout>
                    }
                />

                <Route
                    path="/contact"
                    element={
                        <UserLayout>
                            <Contact />
                        </UserLayout>
                    }
                />

                <Route
                    path="/projects"
                    element={
                        <UserLayout>
                            <Projects />
                        </UserLayout>
                    }
                />

                <Route
                    path="/content"
                    element={
                        <UserLayout>
                            <Content />
                        </UserLayout>
                    }
                />

                <Route
                    path="/dashboardhome"
                    element={
                        <UserLayout>
                            <Dashboard />
                        </UserLayout>
                    }
                />

                {/* Admin pages */}
                <Route
                    path="/AdminDashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/allUsers"
                    element={<AllUsers />}
                />

                <Route
                    path="/AdminCustomerRequests"
                    element={<AdminCustomerRequests />}
                />
            </Routes>
    
        </BrowserRouter>
    );
}

export default App;