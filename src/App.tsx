import React, { useEffect, useState } from 'react';
import './App.css';
import { get } from './lib/axios';
import { User } from './interfaces/IUser';

function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const fetchedUsers = await get<User[]>('/api/users');
                setUsers(fetchedUsers);
            } catch {
                setError('Failed to load user data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User List</h1>

            {loading && <div className="text-center py-4">Loading users...</div>}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
            )}

            {!loading && !error && users.length === 0 && <div className="text-center py-4">No users found.</div>}

            {users.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 text-left">ID</th>
                                <th className="py-2 px-4 text-left">Profile</th>
                                <th className="py-2 px-4 text-left">Name</th>
                                <th className="py-2 px-4 text-left">Email</th>
                                <th className="py-2 px-4 text-left">Balance</th>
                                <th className="py-2 px-4 text-left">Contact Info</th>
                                <th className="py-2 px-4 text-left">Joined</th>
                                <th className="py-2 px-4 text-left">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{user.id}</td>
                                    <td className="py-2 px-4">
                                        <div className="flex items-center">
                                            <img
                                                src={user.photoUrl || '/api/placeholder/40/40'}
                                                alt={`${user.firstName} ${user.lastName}`}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <span className="ml-2">{user.login}</span>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        {user.firstName} {user.lastName}
                                    </td>
                                    <td className="py-2 px-4">{user.email}</td>
                                    <td className="py-2 px-4">${user.cash.toFixed(2)}</td>
                                    <td className="py-2 px-4">
                                        {user.phoneNumber && <div>Phone: {user.phoneNumber}</div>}
                                        {user.address && <div className="text-sm text-gray-600">{user.address}</div>}
                                    </td>
                                    <td className="py-2 px-4">{formatDate(user.createdAt)}</td>
                                    <td className="py-2 px-4">
                                        <div>Birth: {formatDate(user.dateOfBirth)}</div>
                                        {user.gender && <div>Gender: {user.gender}</div>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default App;
