import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './App.css';

function Login() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch(
                'http://localhost:3000/api/auth/Login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password
                    })
                }
            );

            const text = await response.text();

            console.log('Status:', response.status);
            console.log('Response from server:', text);

            let Data;

            try {
                Data = JSON.parse(text);
            } catch (jsonError) {
                console.error(
                    'Server did not return JSON:',
                    text
                );

                setMessage(
                    'Server returned an invalid response.'
                );

                return;
            }

           if (response.ok) {
    alert('Login occurred successfully');

    localStorage.setItem(
        'token',
        Data.token
    );

    localStorage.setItem(
        'user',
        JSON.stringify(Data.user)
    );

    setData({
        email: '',
        password: ''
    });

    if (Data.user.Role_id === 1) {
        navigate('/dashboard');
    } 
    else if (Data.user.Role_id === 2) {
        navigate('/AdminDashboard');
    } 
    else {
        setMessage(
            'You do not have permission to access this system.'
        );
    }
}
        } catch (error) {
            console.error(
                'Error submitting form:',
                error
            );

            setMessage(
                'An error occurred while logging in.'
            );
        }
    };

    return (
        <>
            <div className="contact">
                <Header />

                <h2>Login</h2>

                <form
                    onSubmit={handleSubmit}
                    className="contact-form"
                >
                    <div>
                        <label htmlFor="email">
                            Email:
                        </label>

                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                            value={data.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="password">
                            Password:
                        </label>

                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            required
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">
                        Login
                    </button>
                </form>

                {message && (
                    <p>{message}</p>
                )}
            </div>
        </>
    );
}

export default Login;

