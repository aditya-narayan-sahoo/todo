import { useState } from "react";
import { useTodo } from "../contexts";

export default function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const addItem = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo: todo, completed: false });
    setTodo("");
  };

  return (
    <form className="flex items-center mb-6" onSubmit={addItem}>
      <input
        type="text"
        placeholder="Enter your Todo"
        className="w-full rounded-l-lg px-4 py-2 outline-none focus:border-blue-500 duration-200 bg-white/10 hover:bg-white/30"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition duration-200 shrink-0"
      >
        Add
      </button>
    </form>
  );
}
