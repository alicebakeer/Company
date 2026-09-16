import React, { useState } from 'react';
import Header from './Header';
import './App.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_nbr: '',
        password: ''
    });

    const handleChange = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                'http://localhost:3000/api/auth/Signup',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                        password: data.password,
                        phone_nbr: Number(data.phone_nbr)
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

                alert(
                    'Server returned an invalid response. Check the console.'
                );

                return;
            }

            if (response.ok) {

                alert('Registration occurred successfully!');

                setData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone_nbr: '',
                    password: ''
                });

                navigate('/login');

            } else {

                alert(
                    Data.message || 'Failed to register'
                );
            }

        } catch (error) {

            console.error(
                'Error submitting form:',
                error
            );

            alert(
                'An error occurred while submitting the form.'
            );
        }
    };

    return (
        <>
            <div className="contact">

                <Header />

                <h2>Registration</h2>

                <form
                    onSubmit={handleSubmit}
                    className="contact-form"
                >

                    <div>

                        <label htmlFor="first_name">
                            First Name:
                        </label>

                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            placeholder="Enter your first name"
                            required
                            value={data.first_name}
                            onChange={handleChange}
                        />

                    </div>

                    <div>

                        <label htmlFor="last_name">
                            Last Name:
                        </label>

                        <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            placeholder="Enter your last name"
                            required
                            value={data.last_name}
                            onChange={handleChange}
                        />

                    </div>

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
                            placeholder="Enter the password"
                            required
                            value={data.password}
                            onChange={handleChange}
                        />

                    </div>

                    <div>

                        <label htmlFor="phone_nbr">
                            Phone Number:
                        </label>

                        <input
                            type="text"
                            name="phone_nbr"
                            id="phone_nbr"
                            placeholder="Enter your phone number"
                            required
                            value={data.phone_nbr}
                            onChange={handleChange}
                        />

                    </div>

                    <button type="submit">
                        Submit
                    </button>

                </form>

            </div>
        </>
    );
}

export default SignUp;
