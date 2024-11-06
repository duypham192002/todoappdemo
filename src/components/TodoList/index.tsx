import { useEffect, useState } from "react";
import TodoListContent from "./TodoListContent";
import TodoListInput from "./TodoListInput";

export type TodoData = {
  checked: boolean;
  content: string;
  isEditing?: boolean;
  editingValue: string;
};

function TodoList() {
  const [todoData, setTodoData] = useState<TodoData[]>([]);

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

  const handleSave = (index: number) => {
    setTodoData((prev) => {
      const newState = [...prev];
      newState[index] = {
        ...newState[index],
        content: newState[index].editingValue,
        isEditing: false,
      };
      return newState;
    });
  };

  const handleEditingChange = (index: number, newValue: string) => {
    setTodoData((prev) => {
      const newState = [...prev];
      newState[index] = {
        ...newState[index],
        editingValue: newValue,
      };

      return newState;
    });
  };

  useEffect(() => {
    console.log("Rerender");
  });

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
      };
      setTodoData((prev) => [...prev, newTask]);
    }
  };

  return (
    <>
      <TodoListInput handleOnAdd={handleOnAdd} />
      <TodoListContent
        todoData={todoData}
        handleOnDelete={handleOnDelete}
        handleEditingChange={handleEditingChange}
        handleSave={handleSave}
        handleOnToggle={handleOnToggle}
        deleteAllTasks={OnDeleteAllTasks}
        handleToggleEdit={handleToggleEdit}
      />
    </>
  );
}

export default TodoList;
