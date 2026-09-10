import React, { useState } from 'react';
import Header from './Header';
import './App.css';

function Contact() {

  const [data, setData] = useState({
    full_name: '',
    email: '',
    phone_nbr: '',
    subjects: '',
    message: '',
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

    const response = await fetch('http://localhost:3000/api/Contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        full_name: data.full_name,
        email: data.email,
        phone_nbr: Number(data.phone_nbr),
        subjects: data.subjects,
        message: data.message,
        Role_id: 1
      })
    });

      const text = await response.text();

    console.log('Status:', response.status);
    console.log('Response from server:', text);

    let Data;

    try {
      Data = JSON.parse(text);
    } catch (jsonError) {
      console.error('Server did not return JSON:', text);

      alert('Server returned an invalid response. Check the console.');

      return;
    }

    if (response.ok) {

      alert('Form submitted successfully');

      setData({
        full_name: '',
        email: '',
        phone_nbr: '',
        subjects: '',
        message: ''
      });

    } else {

      alert(Data.message || 'Failed to submit form');

    }

  } catch (error) {

    console.error('Error submitting form:', error);

    alert('An error occurred while submitting the form');

  }
};
  return (
    <>
      <div className="contact">

        <Header />

        <h2>Contact Us</h2>

        <form onSubmit={handleSubmit} className="contact-form">

          <div>
            <label htmlFor="full_name">
              Full Name:
            </label>

            <input
              type="text"
              name="full_name"
              id="full_name"
              placeholder="Enter your full name"
              required
              value={data.full_name}
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

          <div>
            <label htmlFor="subjects">
              Subject:
            </label>

            <input
              type="text"
              name="subjects"
              id="subjects"
              placeholder="Enter the subject"
              required
              value={data.subjects}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="message">
              Message:
            </label>

            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
              placeholder="Enter your message"
              required
              value={data.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit">
            Submit
          </button>

        </form>

      </div>
    </>
  );
}

export default Contact;
