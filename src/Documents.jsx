import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Documents.css";
import DashboardHome from "./DashboardHome";

const API_URL = "http://localhost:3000/api/documents";

function Documents() {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user") || "null");
        } catch {
            return null;
        }
    });

    const [file, setFile] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const fetchDocuments = async () => {
        try {
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                setError("You are not logged in.");
                return;
            }

            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to get documents."
                );
            }

            setDocuments(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("GET DOCUMENTS ERROR:", err);
            setError(err.message || "Failed to load documents.");
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0] || null);
        setMessage("");
        setError("");
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setError("Please select a file.");
            return;
        }

        setLoading(true);
        setMessage("");
        setError("");

        try {
            const formData = new FormData();
            formData.append("document", file);

            const token = localStorage.getItem("token");

            if (!token) {
                setError("You are not logged in.");
                return;
            }

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Upload failed.");
            }

            setMessage("Document uploaded successfully.");
            setFile(null);

            const input = document.getElementById("documentInput");
            if (input) {
                input.value = "";
            }

            await fetchDocuments();
        } catch (err) {
            console.error("UPLOAD ERROR:", err);
            setError(err.message || "Upload failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (documentId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this document?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setError("");
            setMessage("");

            const token = localStorage.getItem("token");

            if (!token) {
                setError("You are not logged in.");
                return;
            }

            const response = await fetch(
                `${API_URL}/${documentId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Delete failed.");
            }

            setMessage("Document deleted successfully.");
            await fetchDocuments();
        } catch (err) {
            console.error("DELETE DOCUMENT ERROR:", err);
            setError(err.message || "Delete failed.");
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes == null || bytes === 0) {
            return "0 Bytes";
        }

        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.min(
            Math.floor(Math.log(bytes) / Math.log(1024)),
            sizes.length - 1
        );

        return (
            (bytes / Math.pow(1024, i)).toFixed(2) +
            " " +
            sizes[i]
        );
    };

    return (
        <>

            <div className="documents-page">
                <div className="documents-container">
                    <div className="documents-header">
                        <h1>My Documents</h1>
                        <p>Upload and manage your documents</p>
                    </div>

                    <div className="upload-card">
                        <h2>Upload Document</h2>

                        <form onSubmit={handleUpload}>
                            <div className="file-input-container">
                                <label htmlFor="documentInput">
                                    Select a document
                                </label>

                                <input
                                    id="documentInput"
                                    type="file"
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    onChange={handleFileChange}
                                />
                            </div>

                            {file && (
                                <div className="selected-file">
                                    Selected: {file.name}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="upload-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Uploading..."
                                    : "Upload Document"}
                            </button>
                        </form>
                    </div>

                    {message && (
                        <div className="success-message">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="documents-section">
                        <h2>Uploaded Documents</h2>

                        {documents.length === 0 ? (
                            <div className="empty-message">
                                No documents uploaded yet.
                            </div>
                        ) : (
                            <div className="documents-list">
                                {documents.map((doc) => (
                                    <div
                                        className="document-card"
                                        key={doc.document_id}
                                    >
                                        <div className="document-info">
                                            <div className="document-icon">
                                                📄
                                            </div>

                                            <div>
                                                <h3>{doc.file_name}</h3>

                                                <p>
                                                    Type: {doc.file_type}
                                                </p>

                                                <p>
                                                    Size:{" "}
                                                    {formatFileSize(
                                                        doc.file_size
                                                    )}
                                                </p>

                                                <p>
                                                    Uploaded:{" "}
                                                    {doc.uploaded_at
                                                        ? new Date(
                                                              doc.uploaded_at
                                                          ).toLocaleString()
                                                        : "Unknown"}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(
                                                    doc.document_id
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
                </div>
            </div>
        </>
    );
}

export default Documents;