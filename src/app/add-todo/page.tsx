"use client";

import { Input } from '@/components/ui/input';
import React, { useState, useEffect } from 'react';

const AddTodoPage = () => {
    const [form, setForm] = useState({
        title: '',
        name: '',
        age: '',
        gender: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const res = await fetch('/api/add-todo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                setMessage('Todo added successfully!');
                setForm({ title: '', name: '', age: '', gender: '' });
            } else {
                setMessage(data.Message || 'Failed to add todo.');
            }
        } catch (error) {
            setMessage('An error occurred.');
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 to-purple-400">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-4">Add Todo</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <Input
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                        name="title"
                        required
                    />
                    <Input
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        name="name"
                        required
                    />
                    <Input
                        placeholder="Age"
                        value={form.age}
                        onChange={handleChange}
                        name="age"
                        type="number"
                        min="0"
                        required
                    />
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                    >
                        <option value="" disabled>
                            Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                    <button
                        type="submit"
                        className="bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Todo'}
                    </button>
                </form>
                {message && (
                    <div className="mt-4 text-center text-sm text-purple-800 font-medium">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddTodoPage;