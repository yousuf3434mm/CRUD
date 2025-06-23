"use client";
import { FaEdit } from "react-icons/fa";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaRegTrashCan } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

const Page = () => {
    const [todos, setTodos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Delete handler
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this todo?")) return;
        try {
            const res = await fetch('/api/delete-todo', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            if (res.ok) {
                setTodos(todos.filter(todo => todo._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete todo:', error);
        }
    };

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('/api/todos');
                if (!response.ok) {
                    throw new Error('Failed to fetch todos');
                }
                const data = await response.json();
                setTodos(data); // Store fetched todos in state
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
            setLoading(false);
        };

        fetchTodos();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 to-purple-400">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mt-2 space-y-2">
                <div className='flex flex-col items-center justify-center text-white p-4 bg-purple-800 rounded-2xl'>
                    <h2 className='text-2xl font-bold text-center'>Next JS 14 Todo App</h2>
                    <div className='flex items-center mt-4'>
                        <Link href={"/add-todo"}>
                            <Button className='ml-2'>Add Todo</Button>
                        </Link>
                    </div>
                </div>
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <div className="text-xl font-semibold text-purple-700 animate-pulse">Loading Todos...</div>
                    </div>
                ) : (
                    todos.map((todo, idx) => (
                        <React.Fragment key={idx}>
                            <div className="flex justify-between mb-4 p-4 border border-purple-300 rounded-lg shadow-md">
                                <div>
                                    <h3 className='text-xl uppercase font-bold text-gray-700'>{todo.title}</h3>
                                    <h2 className='text-lg font-semibold text-purple-800'>{todo.name}</h2>
                                    <p className='text-lg font-semibold text-purple-800'>{todo.age}</p>
                                    <p className='text-lg font-semibold text-purple-800'>{todo.gender}</p>
                                </div>
                                <div>
                                    <div className="flex gap-2">
                                        <Link href={"/edit-todo"} className="text-purple-800 py-2 px-4 rounded-lg font-semibold transition-colors">
                                            <FaEdit />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(todo._id)}
                                            className="text-purple-800 py-2 px-4 rounded-lg font-semibold transition-colors flex items-center gap-1 hover:bg-purple-100"
                                        >
                                            <FaRegTrashCan /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    ))
                )}
            </div>
        </div>
    );
};

export default Page;