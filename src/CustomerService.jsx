import React, { useEffect, useState } from "react";
import "./App.css";

function CustomerRequest() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        users_id: "",
        service_id: "",
        title: "",
        description: ""
    });

    const [services, setServices] = useState([]);

    const API_URL = "http://localhost:3000/api/customerRequests";
    const SERVICES_URL = "http://localhost:3000/api/service";

    const getRequests = async () => {
        try {
            setLoading(true);

            const response = await fetch(API_URL);
            const data = await response.json();

            if (response.ok) {
                setRequests(data);
            } else {
                setMessage(
                    data.message || "Failed to get customer requests"
                );
            }
        } catch (error) {
            console.error("Error getting customer requests:", error);
            setMessage(
                "An error occurred while getting customer requests."
            );
        } finally {
            setLoading(false);
        }
    };

    const getServices = async () => {
        try {
            const response = await fetch(SERVICES_URL);
            const data = await response.json();

            if (response.ok) {
                setServices(data);
            }
        } catch (error) {
            console.error("Error getting services:", error);
        }
    };

    useEffect(() => {
        getRequests();
        getServices();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    users_id: Number(formData.users_id),
                    service_id: Number(formData.service_id),
                    title: formData.title,
                    description: formData.description
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Customer request created successfully");

                setFormData({
                    users_id: "",
                    service_id: "",
                    title: "",
                    description: ""
                });

                getRequests();
            } else {
                setMessage(
                    data.message || "Failed to create customer request"
                );
            }
        } catch (error) {
            console.error("Error creating customer request:", error);

            setMessage(
                "An error occurred while creating the request."
            );
        }
    };

    const updateStatus = async (requestId, status) => {
        try {
            const response = await fetch(
                `${API_URL}/${requestId}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        status: status
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage("Request status updated successfully");
                getRequests();
            } else {
                setMessage(
                    data.message || "Failed to update request status"
                );
            }
        } catch (error) {
            console.error("Error updating request status:", error);

            setMessage(
                "An error occurred while updating the request."
            );
        }
    };

    const deleteRequest = async (requestId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this request?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/${requestId}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage(
                    "Customer request deleted successfully"
                );

                getRequests();
            } else {
                setMessage(
                    data.message ||
                    "Failed to delete customer request"
                );
            }
        } catch (error) {
            console.error("Error deleting customer request:", error);

            setMessage(
                "An error occurred while deleting the request."
            );
        }
    };

    return (
        <div className="customer-request">
            <h2>Customer Requests</h2>

            {message && (
                <p className="message">
                    {message}
                </p>
            )}

            <div className="request-form">
                <h3>Create Customer Request</h3>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>User ID:</label>

                        <input
                            type="number"
                            name="users_id"
                            value={formData.users_id}
                            onChange={handleChange}
                            placeholder="Enter User ID"
                            required
                        />
                    </div>

                    <div>
                        <label>Service:</label>

                        <select
                            name="service_id"
                            value={formData.service_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Select Service
                            </option>

                            {services.map((service) => (
                                <option
                                    key={service.service_id}
                                    value={service.service_id}
                                >
                                    {service.Service_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Title:</label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter request title"
                            required
                        />
                    </div>

                    <div>
                        <label>Description:</label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter request description"
                            required
                        />
                    </div>

                    <button type="submit">
                        Create Request
                    </button>
                </form>
            </div>

            <div className="requests-list">
                <h3>All Customer Requests</h3>

                {loading ? (
                    <p>Loading requests...</p>
                ) : requests.length === 0 ? (
                    <p>No customer requests found.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User ID</th>
                                <th>Service ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {requests.map((request) => (
                                <tr key={request.request_id}>
                                    <td>
                                        {request.request_id}
                                    </td>

                                    <td>
                                        {request.users_id}
                                    </td>

                                    <td>
                                        {request.service_id}
                                    </td>

                                    <td>
                                        {request.title}
                                    </td>

                                    <td>
                                        {request.description}
                                    </td>

                                    <td>
                                        <select
                                            value={request.status}
                                            onChange={(e) =>
                                                updateStatus(
                                                    request.request_id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="Pending">
                                                Pending
                                            </option>

                                            <option value="In Progress">
                                                In Progress
                                            </option>

                                            <option value="Completed">
                                                Completed
                                            </option>

                                            <option value="Rejected">
                                                Rejected
                                            </option>
                                        </select>
                                    </td>

                                    <td>
                                        {request.created_at
                                            ? new Date(
                                                request.created_at
                                            ).toLocaleString()
                                            : ""}
                                    </td>

                                    <td>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteRequest(
                                                    request.request_id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default CustomerRequest;