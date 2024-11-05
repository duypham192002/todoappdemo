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

  const handleOnEdit = (index: number, newContent: string) => {
    setTodoData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, content: newContent, isEditing: false } : item
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
      console.log(newState);

      return newState;
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
        handleOnEdit={handleOnEdit}
        handleOnSave={handleOnSave}
        handleOnToggle={handleOnToggle}
        deleteAllTasks={OnDeleteAllTasks}
        handleToggleEdit={handleToggleEdit}
      />
    </>
  );
}

export default TodoList;
