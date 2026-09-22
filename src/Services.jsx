import React, { useEffect, useState } from 'react';
import './App.css';
function Services() {

    const [Service, setService] = useState([]);

    const [Service_name, setService_name] = useState('');

    const [Description, setDescription] = useState('');

    const [editingId, setEditingId] = useState(null);


    const API_URL = 'http://localhost:3000/api/service';

    const getService = async () => {

        try {

            const response = await fetch(API_URL);

            const data = await response.json();

            if (response.ok) {

                setService(data);

            } else {

                alert(data.message || 'Failed to get services');

            }

        } catch (error) {

            console.error('Error getting services:', error);

            alert('Cannot connect to backend');

        }

    };


    useEffect(() => {

        getService();

    }, []);

const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const storedUser = localStorage.getItem('user');

        const user = storedUser
            ? JSON.parse(storedUser)
            : null;

        const users_id = Number(user?.users_id);

        if (!users_id) {

            alert('User ID is missing');

            return;

        }

        const serviceData = {
            Service_name,
            Description,
            users_id
        };

        let response;

        if (editingId) {

            response = await fetch(
                `${API_URL}/${editingId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(serviceData)
                }
            );

        } else {

            response = await fetch(
                API_URL,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(serviceData)
                }
            );

        }

        const data = await response.json();

        if (response.ok) {

            alert(
                editingId
                    ? 'Service updated successfully'
                    : 'Service added successfully'
            );

            setService_name('');
            setDescription('');
            setEditingId(null);

            getService();

        } else {

            alert(data.message || 'Operation failed');

        }

    } catch (error) {

        console.error('Error submitting service:', error);

        alert('Cannot connect to backend');

    }

};

    

    const handleEdit = (service) => {

        setEditingId(service.service_id);

        setService_name(service.Service_name);

        setDescription(service.Description);

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(

            'Are you sure you want to delete this service?'

        );


        if (!confirmDelete) {

            return;

        }


        try {

            const response = await fetch(

                `${API_URL}/${id}`,

                {
                    method: 'DELETE'
                }

            );


            const data = await response.json();


            if (response.ok) {

                alert('Service deleted successfully');

                getService();

            } else {

                alert(
                    data.message || 'Failed to delete service'
                );

            }

        } catch (error) {

            console.error('Error deleting service:', error);

            alert('Cannot connect to backend');

        }

    };

    const handleCancel = () => {

        setEditingId(null);

        setService_name('');

        setDescription('');

    };

    return (

        <div className="Service-management">

            <h1>Service Management</h1>


            <form onSubmit={handleSubmit}>

                <div>

                    <label>Service Name</label>

                    <input

                        type="text"

                        value={Service_name}

                        onChange={(e) =>
                            setService_name(e.target.value)
                        }

                        placeholder="Enter Service Name"

                        required

                    />

                </div>


                <div>

                    <label>Description</label>

                    <textarea

                        value={Description}

                        onChange={(e) =>
                            setDescription(e.target.value)
                        }

                        placeholder="Enter Service Description"

                        required

                    />

                </div>


                <button type="submit">

                    {editingId
                        ? 'Update Service'
                        : 'Add Service'
                    }

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


            <h2>Available Services</h2>


            {Service.length === 0 ? (

                <p>No Services available.</p>

            ) : (

                <div>

                    {Service.map((service) => (

                        <div

                            key={service.service_id}

                            className="content-item"

                        >

                            <h3>
                                {service.Service_name}
                            </h3>


                            <p>
                                {service.Description}
                            </p>


                            <button

                                onClick={() =>
                                    handleEdit(service)
                                }

                            >

                                Edit

                            </button>


                            <button

                                onClick={() =>
                                    handleDelete(
                                        service.service_id
                                    )
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


export default Services;