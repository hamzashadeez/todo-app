import TodoList from "@/components/todos/TodoList";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex flex-col gap-6  py-5">
      <div className="flex justify-between w-4/5 mx-auto">
        <h1 className="text-2xl text-center font-semibold ">My Todo App</h1>
        <Link href={"/new"}>
          <div className="bg-green-700 text-white px-4 py-1.5 rounded">
            Add New
          </div>
        </Link>
      </div>
      <TodoList />
    </main>
  );
}
