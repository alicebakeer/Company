import React, { useEffect, useState } from "react";
import "./App.css";

function AdminCustomerRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [selectedRequest, setSelectedRequest] = useState(null);

    const API_URL = "http://localhost:3000/api/customerRequests";

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

    useEffect(() => {
        getRequests();
    }, []);

    const viewRequest = async (requestId) => {
        try {
            const response = await fetch(
                `${API_URL}/${requestId}`
            );

            const data = await response.json();

            if (response.ok) {
                setSelectedRequest(data);
            } else {
                setMessage(
                    data.message || "Failed to get request details"
                );
            }
        } catch (error) {
            console.error("Error getting request details:", error);

            setMessage(
                "An error occurred while getting request details."
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
                setMessage(
                    "Request status updated successfully"
                );

                setSelectedRequest(data.request);

                getRequests();
            } else {
                setMessage(
                    data.message ||
                    "Failed to update request status"
                );
            }
        } catch (error) {
            console.error("Error updating request status:", error);

            setMessage(
                "An error occurred while updating request status."
            );
        }
    };

    return (
        <div className="admin-customer-requests">

            <h2>Customer Requests</h2>

            {message && (
                <p className="message">
                    {message}
                </p>
            )}

            {loading ? (
                <p>Loading requests...</p>
            ) : requests.length === 0 ? (
                <p>No customer requests found.</p>
            ) : (
                <div className="requests-table-container">

                    <table>

                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>User ID</th>
                                <th>Service ID</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Action</th>
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
                                                viewRequest(
                                                    request.request_id
                                                )
                                            }
                                        >
                                            View Details
                                        </button>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
            )}

            {selectedRequest && (

                <div className="request-details">

                    <h3>Request Details</h3>

                    <p>
                        <strong>Request ID:</strong>{" "}
                        {selectedRequest.request_id}
                    </p>

                    <p>
                        <strong>User ID:</strong>{" "}
                        {selectedRequest.users_id}
                    </p>

                    <p>
                        <strong>Service ID:</strong>{" "}
                        {selectedRequest.service_id}
                    </p>

                    <p>
                        <strong>Title:</strong>{" "}
                        {selectedRequest.title}
                    </p>

                    <p>
                        <strong>Description:</strong>{" "}
                        {selectedRequest.description}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        {selectedRequest.status}
                    </p>

                    <p>
                        <strong>Created At:</strong>{" "}
                        {selectedRequest.created_at
                            ? new Date(
                                selectedRequest.created_at
                            ).toLocaleString()
                            : ""}
                    </p>

                    <div className="request-status">

                        <label>
                            Update Status:
                        </label>

                        <select
                            value={selectedRequest.status}
                            onChange={(e) =>
                                updateStatus(
                                    selectedRequest.request_id,
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

                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setSelectedRequest(null)
                        }
                    >
                        Close
                    </button>

                </div>

            )}

        </div>
    );
}

export default AdminCustomerRequests;