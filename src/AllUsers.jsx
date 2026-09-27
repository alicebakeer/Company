import React, { useEffect, useState } from "react";
import "./App.css";

function AllUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchUsers = async (searchValue = "") => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

      const url = searchValue
    ? `http://localhost:3000/api/users?search=${encodeURIComponent(searchValue)}`
    : `http://localhost:3000/api/users`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Users status:", response.status);

            const data = await response.json();

            console.log("Users response:", data);

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch users"
                );
            }

            setUsers(data);

        } catch (error) {
            console.error("Error fetching users:", error);
            setError(error.message);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    // Get users when page loads
    useEffect(() => {
        fetchUsers();
    }, []);

    // Search users
    const handleSearch = (e) => {
        const value = e.target.value;

        setSearch(value);

        fetchUsers(value);
    };

    return (
        <div className="users-container">

            <h2 className="users-title">
                Customers & Services
            </h2>

          
            <div className="users-search-container">

                <input
                    type="text"
                    placeholder="Search by first name or last name..."
                    value={search}
                    onChange={handleSearch}
                    className="users-search-input"
                />

            </div>

            {/* Loading */}
            {loading && (
                <p className="users-loading">
                    Loading...
                </p>
            )}

            {/* Error */}
            {!loading && error && (
                <p className="users-error">
                    {error}
                </p>
            )}

            {/* Table */}
            {!loading && !error && (
                <div className="users-table-container">

                    <table className="users-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Service</th>
                                <th>Description</th>
                            </tr>
                        </thead>

                        <tbody>

                            {users.length === 0 ? (

                                <tr>
                                    <td
                                        colSpan="7"
                                        className="users-empty"
                                    >
                                        No users found
                                    </td>
                                </tr>

                            ) : (

                                users.map((user) => (

                                    <tr key={user.users_id}>

                                        <td>
                                            {user.users_id}
                                        </td>

                                        <td>
                                            {user.first_name}
                                        </td>

                                        <td>
                                            {user.last_name}
                                        </td>

                                        <td>
                                            {user.email}
                                        </td>

                                        <td>
                                            {user.phone_nbr}
                                        </td>

                                        <td>
                                            {user.Service_name}
                                        </td>

                                        <td>
                                            {user.Description}
                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>
            )}

        </div>
    );
}

export default AllUsers;

