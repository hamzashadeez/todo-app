"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function TodoList() {
  const fetchTodos = async () => {
    // fetch todos from api
    const response = await fetch("/api/todos");
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    return response.json();
  };
  const { data, isLoading, error }: any = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return (
    <div className="w-4/5 mx-auto">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data?.todos.map((todo: any) => (
            <li className="py-4 bg-gray-800 px-4  mb-2" key={todo._id}>
              {todo.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
