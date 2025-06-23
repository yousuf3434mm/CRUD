"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!title) return;
    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  const updateTodo = async (id: string) => {
    const newTitle = prompt("Update Todo:");
    if (newTitle) {
      await fetch(`/api/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title: newTitle }),
      });
      fetchTodos();
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">📋 Todo App</h1>
      <input
        className="border p-2 w-full mb-2"
        placeholder="New Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 w-full" onClick={addTodo}>
        Add
      </button>
      <ul className="mt-4 space-y-2">
        {todos.map((todo: any) => (
          <li key={todo._id} className="border p-2 flex justify-between items-center">
            <span>{todo.title}</span>
            <div className="space-x-2">
              <button onClick={() => updateTodo(todo._id)} className="text-yellow-500">✏️</button>
              <button onClick={() => deleteTodo(todo._id)} className="text-red-500">🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
