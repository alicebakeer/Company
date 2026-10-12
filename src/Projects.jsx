import React, { useState, useEffect } from 'react';
import './Projects.css';

function Projects() {

    const [data, setData] = useState({
        project_name: '',
        project_description: ''
    });

    const [projects, setProjects] = useState([]);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const getProjects = async () => {
        try {

            const response = await fetch(
                'http://localhost:3000/api/projects'
            );

            const result = await response.json();

            if (response.ok) {
                setProjects(result);
            } else {
                console.error(result.message);
            }

        } catch (error) {
            console.error('Error getting projects:', error);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setMessage('');

        try {

            const user = JSON.parse(localStorage.getItem('user'));

            if (!user || !user.users_id) {
                setMessage('User information not found. Please login again.');
                return;
            }

            const response = await fetch(
                'http://localhost:3000/api/projects',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':
                            `Bearer ${localStorage.getItem('token')}`
                    },

                    body: JSON.stringify({
                        project_name: data.project_name,
                        project_description: data.project_description,
                        users_id: user.users_id
                    })
                }
            );

            const text = await response.text();

            console.log('Status:', response.status);
            console.log('Response:', text);

            let result;

            try {
                result = JSON.parse(text);
            } catch (error) {

                setMessage(
                    'Server returned an invalid response.'
                );

                return;
            }

            if (response.ok) {

                setMessage('Project added successfully!');

                setData({
                    project_name: '',
                    project_description: ''
                });

                getProjects();

            } else {

                setMessage(
                    result.message || 'Failed to add project.'
                );
            }

        } catch (error) {

            console.error(
                'Error adding project:',
                error
            );

            setMessage(
                'An error occurred while adding the project.'
            );
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div className="projects-page">

            <div className="projects-container">

                <h2>Projects</h2>

                {/* Add Project Form */}

                <form
                    className="project-form"
                    onSubmit={handleSubmit}
                >

                    <h3>Add New Project</h3>

                    <div>

                        <label htmlFor="project_name">
                            Project Name:
                        </label>

                        <input
                            type="text"
                            id="project_name"
                            name="project_name"
                            placeholder="Enter project name"
                            value={data.project_name}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div>

                        <label htmlFor="project_description">
                            Project Description:
                        </label>

                        <textarea
                            id="project_description"
                            name="project_description"
                            placeholder="Enter project description"
                            value={data.project_description}
                            onChange={handleChange}
                            rows="5"
                            required
                        />

                    </div>

                    <button type="submit">
                        Add Project
                    </button>

                    {message && (
                        <p className="project-message">
                            {message}
                        </p>
                    )}

                </form>

                {/* Project List */}

                <div className="projects-list">

                    <h3>My Projects</h3>

                    {projects.length === 0 ? (

                        <p className="no-projects">
                            No projects found.
                        </p>

                    ) : (

                        <div className="project-cards">

                            {projects.map((project) => (

                                <div
                                    className="project-card"
                                    key={project.project_id}
                                >

                                    <h3>
                                        {project.project_name}
                                    </h3>

                                    <p>
                                        {project.project_description}
                                    </p>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Projects;