import TodoList from "@/components/todos/TodoList";
import Image from "next/image";

export default function Home() {
  return (
   <main className="h-screen flex flex-col gap-6 items-center justify-center">
    <h1 className="text-2xl text-center font-semibold ">My Todo App</h1>
    <TodoList />
   </main>
  );
}
