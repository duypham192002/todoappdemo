import { useState } from "react";
import TodoListContent from "./TodoListContent";
import TodoListInput from "./TodoListInput";

export type TodoData = {
  checked: boolean;
  content: string;
};

function TodoList() {
  const [todoData, setTodoData] = useState<TodoData[]>([]);

  const handleOnDelete = (index: number) => {
    const updatedTodoData = todoData.filter((_, i) => i !== index);
    setTodoData(updatedTodoData);
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
        i === index ? { ...item, content: newContent } : item
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
      />
    </>
  );
}

export default TodoList;
