import './App.css';
import Home from './Home';
import Login from './Login';
import About from './About';
import Contact from './Contact';
import Dashboard from './Dashboard';
import AdminDashboard from './AdminDashboard';
import Services from './Services';
import CustomerRequest from './CustomerService';
import Content from './Content';
import SignUp from './SignUp';
import AdminCustomerRequests from './AdminCustomerRequests'
import {  BrowserRouter,  Routes,  Route
} from 'react-router-dom';
function App() {
    return (
        <BrowserRouter basename="/Company">
            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/AdminDashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

          <Route
    path="/CustomerService"
    element={<CustomerRequest />}
/>
<Route
    path="/AdminCustomerRequests"
    element={<AdminCustomerRequests />}
/>
                <Route
                    path="/signup"
                    element={<SignUp />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/service"
                    element={<Services />}
                />

                <Route
                    path="/content"
                    element={<Content />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
