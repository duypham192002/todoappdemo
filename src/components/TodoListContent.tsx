import { TodoData } from "./TodoList";
import { useState, useEffect } from "react";

function TodoListContent({
  todoData,
  handleOnDelete,
  handleOnEdit,
}: {
  todoData: TodoData[];
  handleOnDelete: (index: number) => void;
  handleOnEdit: (index: number, newContent: string) => void;
}) {
  const [editValue, setEditValue] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  // Đồng bộ `checkedItems` với `todoData` mỗi khi `todoData` thay đổi
  useEffect(() => {
    setCheckedItems(new Array(todoData.length).fill(false));
  }, [todoData]);

  const handleCheckboxChange = (index: number) => {
    setCheckedItems((prev) => {
      const newCheckedItems = [...prev];
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };

  const handleSaveEdit = (index: number) => {
    if (editValue.trim()) {
      handleOnEdit(index, editValue);
      setEditingIndex(null);
      setEditValue("");
    }
  };

  const handleDelete = (index: number) => {
    handleOnDelete(index);
    setCheckedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCompletedTasks = () => {
    const completedTaskIndices = todoData
      .map((_, index) => index)
      .filter((index) => checkedItems[index]);
    completedTaskIndices.forEach((index) => handleOnDelete(index));
    setCheckedItems(
      new Array(todoData.length - completedTaskIndices.length).fill(false)
    );
  };

  return (
    <div className="max-w-full bg-white shadow-lg p-4">
      <div className="flex justify-between pb-4">
        {todoData.length > 0 ? (
          <p>
            {todoData.length} task{todoData.length > 1 ? "s" : ""} left
          </p>
        ) : (
          <p>All tasks completed</p>
        )}
        <button onClick={clearCompletedTasks}>Clear all tasks</button>
      </div>
      <div>
        {todoData.map((data, index) => (
          <div
            key={index}
            className={`flex items-center p-4 ${
              checkedItems[index] ? "opacity-50 line-through" : ""
            }`}
          >
            <input
              type="checkbox"
              className="checked:bg-blue-500 size-4"
              checked={checkedItems[index] || false}
              onChange={() => handleCheckboxChange(index)}
            />
            {editingIndex === index ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit(index);
                }}
                autoFocus
                className="px-2 py-1 border border-gray-300 rounded flex-1"
              />
            ) : (
              <p className="px-4 font-bold flex-1">{data.content}</p>
            )}
            <div className="flex w-auto gap-4">
              <button
                onClick={() => {
                  if (!checkedItems[index]) {
                    setEditValue(data.content);
                    setEditingIndex(index);
                  }
                }}
                disabled={checkedItems[index]}
              >
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
              <button onClick={() => handleDelete(index)}>
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoListContent;
