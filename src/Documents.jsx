import React, { useEffect, useState } from "react";
import "./Documents.css";

const API_URL = "http://localhost:3000/api/documents";
function Documents() {
    const [file, setFile] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const fetchDocuments = async () => {
        try {
            setError("");
      const token = localStorage.getItem("token");

            console.log("Token:", token);

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

            console.log("Documents response:", data);

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to get documents."
                );
            }

            setDocuments(data);

        } catch (err) {
            console.error("GET DOCUMENTS ERROR:", err);
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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

            console.log("Upload response:", data);

            if (!response.ok) {
                throw new Error(
                    data.message || "Upload failed."
                );
            }

            setMessage("Document uploaded successfully.");

            setFile(null);
            document.getElementById("documentInput").value = "";
            fetchDocuments();

        } catch (err) {
            console.error("UPLOAD ERROR:", err);
            setError(err.message);

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

            console.log("Delete response:", data);

            if (!response.ok) {
                throw new Error(
                    data.message || "Delete failed."
                );
            }

            setMessage(
                "Document deleted successfully."
            );

            fetchDocuments();

        } catch (err) {
            console.error(
                "DELETE DOCUMENT ERROR:",
                err
            );

            setError(err.message);
        }
    };
    const formatFileSize = (bytes) => {

        if (bytes === 0) {
            return "0 Bytes";
        }

        const sizes = [
            "Bytes",
            "KB",
            "MB",
            "GB"
        ];

        const i = Math.floor(
            Math.log(bytes) / Math.log(1024)
        );

        return (
            (bytes / Math.pow(1024, i)).toFixed(2) +
            " " +
            sizes[i]
        );
    };

    return (
        <div className="documents-page">

            <div className="documents-container">

                {/* HEADER */}
                <div className="documents-header">

                    <h1>
                        My Documents
                    </h1>

                    <p>
                        Upload and manage your documents
                    </p>

                </div>

                {/* UPLOAD */}
                <div className="upload-card">

                    <h2>
                        Upload Document
                    </h2>

                    <form
                        onSubmit={handleUpload}
                    >

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
                                : "Upload Document"
                            }

                        </button>

                    </form>

                </div>

                {/* SUCCESS */}
                {message && (
                    <div className="success-message">
                        {message}
                    </div>
                )}

                {/* ERROR */}
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {/* DOCUMENTS */}
                <div className="documents-section">

                    <h2>
                        Uploaded Documents
                    </h2>

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

                                            <h3>
                                                {doc.file_name}
                                            </h3>

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
                                                {new Date(
                                                    doc.uploaded_at
                                                ).toLocaleString()}
                                            </p>

                                        </div>

                                    </div>

                                    <button
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
    );
}

export default Documents;

