import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { FaRegTrashCan } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import Link from "next/link";

type Todo = {
    title: string;
    name: string;
    age: string;
    gender: string;
};

const EditTodoPage = () => {
    const router = useRouter();
    const params = useParams();
    const { id } = params as { id: string };

    const [todo, setTodo] = useState<Todo>({
        title: "",
        name: "",
        age: "",
        gender: "",
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchTodo = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await fetch(`/api/todos/${id}`);
                if (!res.ok) throw new Error("Failed to fetch todo");
                const data = await res.json();
                setTodo({
                    title: data.title || "",
                    name: data.name || "",
                    age: data.age || "",
                    gender: data.gender || "",
                });
            } catch (err) {
                setError("Error loading todo");
            }
            setLoading(false);
        };
        if (id) fetchTodo();
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodo({ ...todo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch(`/api/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: todo.title, name: todo.name, age: todo.age, gender: todo.gender }),
            });
            if (res.ok) {
                router.push("/todo");
            } else {
                setError("Failed to update todo");
            }
        } catch {
            setError("Failed to update todo");
        }
    };

    if (loading) {
        return (
            <div className="p-8 text-center text-purple-700 font-semibold">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 to-purple-400">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mt-2 space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-purple-800 mb-4">
                    Edit Todo
                </h2>
                {error && (
                    <div className="text-red-600 text-center mb-2">{error}</div>
                )}
                <input
                    name="title"
                    value={todo.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    name="name"
                    value={todo.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    name="age"
                    value={todo.age}
                    onChange={handleChange}
                    placeholder="Age"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    name="gender"
                    value={todo.gender}
                    onChange={handleChange}
                    placeholder="Gender"
                    className="w-full p-2 border rounded"
                    required
                />
                <div className="flex gap-2">
                    <Button type="submit" className="w-full">
                        Update Todo
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditTodoPage;