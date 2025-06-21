'use client'

import { useEffect, useState } from "react"

type Task = {
  _id?: string
  title: string
  description: string
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [form, setForm] = useState<Task>({ title: "", description: "" })

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks")
    const data = await res.json()
    setTasks(data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(form),
    })
    setForm({ title: "", description: "" })
    fetchTasks()
  }

  const deleteTask = async (id: string) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" })
    fetchTasks()
  }

  return (
    <div className="p-10">
      <form onSubmit={handleSubmit} className="mb-5">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="border p-2 mr-2"
        />
        <input
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task._id} className="border p-2 mb-2 flex justify-between">
            <div>
              <strong>{task.title}</strong>: {task.description}
            </div>
            <button onClick={() => deleteTask(task._id!)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
