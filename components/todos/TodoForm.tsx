"use client";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

function TodoForm() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState(4);

  const mutation = useMutation({
    mutationFn: ({
      title,
      priority,
      description,
      userId,
      _id,
    }: {
      title: string;
      priority: number;
      description: string;
      userId: string;
      _id: string;
    }) => {
      return fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ title, priority, description, userId, _id }),
      });
    },
  });

  const onSubmit = (event: any) => {
    event.preventDefault();
    const newTask = {
      title,
      priority,
      description,
      userId: "demo-user",
      _id: crypto.randomUUID(),
    };
    console.log(newTask);

    mutation.mutate(newTask);
  };
  return (
    <div className="py-5 w-3/5 mx-auto">
      <h1 className="text-center font-semibold text-2xl text-gray-900 mb-4">
        Add New Task
      </h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="title">Enter Task Title</label>
          <input
            className="bg-gray-50 w-full border border-gray-300 px-4 py-2 rounded outline-none focus:ring-2 focus:ring-gray-500"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            placeholder="Enter new task..."
          />
        </div>

        <main className="flex gap-6">
          <div className="flex-1">
            <label htmlFor="priority">Select Priority</label>
            <select
              defaultValue={4}
              name="priority"
              value={priority}
              onChange={(e) => setPriority(parseInt(e.target.value))}
              id="priority"
              className="bg-gray-50 w-full border border-gray-300 px-4 py-2.5 rounded outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="description">Enter Description</label>
            <input
              className="bg-gray-50 w-full border border-gray-300 px-4 py-2 rounded outline-none focus:ring-2 focus:ring-gray-500"
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(e: any) => setDescription(e.target.value)}
              placeholder="Enter description...."
            />
          </div>
        </main>
        <div>
          <button className="bg-gray-900 text-white w-full py-3 rounded">
            Add New Task
          </button>
          <Link href="/">
            <button
              type="button"
              className="border border-gray-900 text-gray-900 w-full mt-4 py-3 rounded"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
