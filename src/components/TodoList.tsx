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

  // hàm xử lý status của edit
  const handleToggleEdit = (index: number) => {
    setTodoData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  const deleteAllTasks = () => {
    setTodoData([]);
  };

  return (
    <>
      <TodoListInput setTododata={setTodoData} />
      <TodoListContent
        todoData={todoData}
        handleOnDelete={handleOnDelete}
        handleOnEdit={handleOnEdit}
        handleOnToggle={handleOnToggle}
        deleteAllTasks={deleteAllTasks}
        handleToggleEdit={handleToggleEdit}
      />
    </>
  );
}

export default TodoList;
