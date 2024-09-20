import { useState } from "react";
import { useTodo } from "../contexts";
import PropTypes from "prop-types";

export default function TodoItem({ todo }) {
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleDone = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex items-center border border-gray-300 rounded-lg px-4 py-3 gap-x-3 shadow-md transition duration-300 ${
        todo.completed ? "bg-green-100" : "bg-purple-100"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleDone}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg px-2 py-1 ${
          isTodoEditable ? "border-gray-400" : "border-transparent"
        } ${todo.completed ? "line-through text-gray-500" : "text-black"}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button
        className={`inline-flex w-10 h-10 rounded-lg text-sm border justify-center items-center transition duration-200 ${
          isTodoEditable
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-yellow-300 hover:bg-yellow-400"
        }`}
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "💾" : "✏️"}
      </button>

      <button
        className="inline-flex w-10 h-10 rounded-lg text-sm border justify-center items-center bg-red-200 text-white hover:bg-red-400 transition duration-200"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

// Prop validation
TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    todo: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
