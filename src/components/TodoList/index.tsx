import { useState } from "react";
import TodoListContent from "./TodoListContent";
import TodoListInput from "./TodoListInput";

export type TodoData = {
  checked: boolean;
  content: string;
  isEditing?: boolean;
  editingValue: string;
  status: "all" | "complete" | "incomplete";
};

function TodoList() {
  const [todoData, setTodoData] = useState<TodoData[]>([]);
  const [filter, setFilter] = useState<TodoData["status"]>("all");

  const handleOnDelete = (index: number) => {
    setTodoData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOnToggle = (index: number) => {
    setTodoData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleSave = (index: number, newValue: string) => {
    setTodoData((prev) => {
      const newState = [...prev];
      newState[index] = {
        ...newState[index],
        content: newValue,
        isEditing: false,
      };
      return newState;
    });
  };

  const handleToggleEdit = (index: number) => {
    setTodoData((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, isEditing: !item.isEditing, editingValue: item.content }
          : item
      )
    );
  };

  const OnDeleteAllTasks = () => {
    setTodoData([]);
  };

  const handleOnAdd = (content: string) => {
    if (content.trim()) {
      const newTask: TodoData = {
        checked: false,
        content: content,
        editingValue: "",
        status: "incomplete",
      };
      setTodoData((prev) => [...prev, newTask]);
    }
  };

  const handleOnFilter = (newFilter: "all" | "complete" | "incomplete") => {
    setFilter(newFilter);
  };

  const filteredTodoData = todoData.filter((item) => {
    if (filter === "all") return true;
    if (filter === "complete") return item.checked;
    if (filter === "incomplete") return !item.checked;
    return true;
  });

  return (
    <>
      <TodoListInput handleOnAdd={handleOnAdd} />
      <TodoListContent
        todoCount={filteredTodoData.length}
        todoData={filteredTodoData}
        handleOnDelete={handleOnDelete}
        handleOnToggle={handleOnToggle}
        deleteAllTasks={OnDeleteAllTasks}
        handleToggleEdit={handleToggleEdit}
        handleSave={handleSave}
        handleOnFilter={handleOnFilter}
      />
    </>
  );
}

export default TodoList;
