import { useState } from "react";
import TodoListContent from "./TodoListContent";
import TodoListInput from "./TodoListInput";

export type TodoData = {
  checked: boolean;
  content: string;
};

function TodoList() {
  const [todoData, setTodoData] = useState<TodoData[]>([]);

  // Hàm cập nhật dữ liệu Todo
  const updateTodoData = (newTodoData: TodoData[]) => {
    setTodoData(newTodoData);
  };

  const handleOnDelete = (index: number) => {
    updateTodoData(todoData.filter((_, i) => i !== index));
  };

  const handleOnEdit = (index: number, newContent: string) => {
    updateTodoData(
      todoData.map((item, i) =>
        i === index ? { ...item, content: newContent } : item
      )
    );
  };

  return (
    <>
      <TodoListInput setTododata={setTodoData} />
      <TodoListContent
        todoData={todoData}
        handleOnDelete={handleOnDelete}
        handleOnEdit={handleOnEdit}
      />
    </>
  );
}

export default TodoList;
