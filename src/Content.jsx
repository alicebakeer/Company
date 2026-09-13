
import React, { useEffect, useState } from 'react';
import './App.css'
function ContentManagement() {

    const [contents, setContents] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [editingId, setEditingId] = useState(null);

    const API_URL = 'http://localhost:3000/api/content';

    const getContents = async () => {

        try {

            const response = await fetch(API_URL);

            const data = await response.json();

            if (response.ok) {
                setContents(data);
            } else {
                alert(data.message || 'Failed to get content');
            }

        } catch (error) {

            console.error('Error getting content:', error);

            alert('Cannot connect to backend');

        }
    };


    useEffect(() => {
        getContents();
    }, []);



    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            let response;

            if (editingId) {

                response = await fetch(`${API_URL}/${editingId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title,
                        description
                    })
                });

            } else {

                response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title,
                        description
                    })
                });

            }

            const data = await response.json();

            if (response.ok) {

                alert(
                    editingId
                        ? 'Content updated successfully'
                        : 'Content added successfully'
                );

                setTitle('');
                setDescription('');
                setEditingId(null);

                getContents();

            } else {

                alert(data.message || 'Operation failed');

            }

        } catch (error) {

            console.error('Error submitting content:', error);

            alert('Cannot connect to backend');

        }
    };
    const handleEdit = (content) => {

        setEditingId(content.content_id);

        setTitle(content.title);

        setDescription(content.description);

    };


    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this content?'
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (response.ok) {

                alert('Content deleted successfully');

                getContents();

            } else {

                alert(data.message || 'Failed to delete content');

            }

        } catch (error) {

            console.error('Error deleting content:', error);

            alert('Cannot connect to backend');

        }
    };



    const handleCancel = () => {

        setEditingId(null);

        setTitle('');

        setDescription('');

    };


    return (
        <div className="content-management">

            <h1>Content Management</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Title</label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter content title"
                        required
                    />
                </div>


                <div>
                    <label>Description</label>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter content description"
                        required
                    />
                </div>


                <button type="submit">
                    {editingId ? 'Update Content' : 'Add Content'}
                </button>


                {editingId && (
                    <button
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                )}

            </form>


            <hr />


            <h2>Existing Content</h2>


            {contents.length === 0 ? (

                <p>No content available.</p>

            ) : (

                <div>

                    {contents.map((content) => (

                        <div
                            key={content.content_id}
                            className="content-item"
                        >

                            <h3>{content.title}</h3>

                            <p>{content.description}</p>


                            <button
                                onClick={() => handleEdit(content)}
                            >
                                Edit
                            </button>


                            <button
                                onClick={() =>
                                    handleDelete(content.content_id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default ContentManagement;
