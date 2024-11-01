import { useState } from "react";
import { TodoData } from "./TodoList";

function TodoListInput({
  setTododata,
}: {
  setTododata: React.Dispatch<React.SetStateAction<TodoData[]>>;
}) {
  const [inputText, setInputText] = useState("");

  const handleOnAdd = (content: string) => {
    if (content.trim()) {
      const newTask: TodoData = {
        checked: false,
        content: content,
      };
      setTododata((prev) => [...prev, newTask]);
      setInputText("");
    }
  };

  return (
    <div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          name="task"
          id="task"
          className="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          placeholder="Add a new task..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleOnAdd(inputText);
            }
          }}
        />

        <div className="absolute inset-y-0 right-0 flex items-center pr-8">
          <button onClick={() => handleOnAdd(inputText)}>ADD</button>
        </div>
      </div>
    </div>
  );
}

export default TodoListInput;
