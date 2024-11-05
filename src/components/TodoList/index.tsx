import { useState } from "react";
import TodoListContent from "./TodoListContent";
import TodoListInput from "./TodoListInput";

export type TodoData = {
  checked: boolean;
  content: string;
  isEditing?: boolean;
};

function TodoList() {
  const [todoData, setTodoData] = useState<TodoData[]>([]);
  const [editValues, setEditValues] = useState<{ [key: number]: string }>({});
  const handleOnDelete = (index: number) => {
    setTodoData((prev) => prev.filter((_, i) => i !== index));
    setEditValues((prev) => {
      const newEditValues = { ...prev };
      delete newEditValues[index];
      return newEditValues;
    });
  };

  const handleOnToggle = (index: number) => {
    setTodoData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleOnSave = (index: number, newContent: string) => {
    setTodoData((prev) => {
      const newState = [...prev];
      newState[index] = {
        ...newState[index],
        content: newContent,
        isEditing: false,
      };
      return newState;
    });
    setEditValues((prev) => {
      const newEditValues = { ...prev };
      delete newEditValues[index];
      return newEditValues;
    });
  };

  const handleToggleEdit = (index: number) => {
    setTodoData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  const OnDeleteAllTasks = () => {
    setTodoData([]);
    setEditValues({});
  };

  const handleOnAdd = (content: string) => {
    if (content.trim()) {
      const newTask: TodoData = {
        checked: false,
        content: content,
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
        handleOnSave={handleOnSave}
        handleOnToggle={handleOnToggle}
        deleteAllTasks={OnDeleteAllTasks}
        handleToggleEdit={handleToggleEdit}
        editValues={editValues}
        setEditValues={setEditValues}
      />
    </>
  );
}

export default TodoList;
