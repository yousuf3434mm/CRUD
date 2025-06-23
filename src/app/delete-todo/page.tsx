"use client";

import React, { useState, useEffect } from 'react';

const DeleteTodoPage = () => {
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const res = await fetch('/api/delete-todo', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            const data = await res.json();
            if (res.ok) {
                setMessage('Todo deleted successfully!');
                setId('');
            } else {
                setMessage(data.Message || 'Failed to delete todo.');
            }
        } catch (error) {
            setMessage('An error occurred.');
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-200 to-red-400">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-center text-red-700 mb-4">Delete Todo</h2>
                <form onSubmit={handleDelete} className="flex flex-col gap-5">
                    <input
                        placeholder="Enter Todo ID"
                        value={id}
                        onChange={handleChange}
                        name="id"
                        required
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    />
                    <button
                        type="submit"
                        className="bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete Todo'}
                    </button>
                </form>
                {message && (
                    <div className="mt-4 text-center text-sm text-red-800 font-medium">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeleteTodoPage;