import { useState, useEffect } from "react";
import TodoListContent from "./TodoListContent";
import TodoListInput from "./TodoListInput";

export type Status = "all" | "complete" | "incomplete";

export type TodoData = {
  checked: boolean;
  content: string;
  isEditing?: boolean;
  editingValue: string;
  status: Status;
};

function TodoList() {
  const [todoData, setTodoData] = useState<TodoData[]>([]);
  const [filter, setFilter] = useState<TodoData["status"]>("all");
  const [filteredTodoData, setFilteredTodoData] = useState<TodoData[]>([]);

  useEffect(() => {
    const filtered = todoData.filter((item) => {
      switch (filter) {
        case "complete":
          return item.status === "complete";
        case "incomplete":
          return item.status === "incomplete";
        default:
          return true;
      }
    });
    setFilteredTodoData(filtered);
  }, [filter, todoData]);

  const handleOnDelete = (index: number) => {
    const targetItem = filteredTodoData[index];
    setTodoData((prev) => prev.filter((item) => item !== targetItem));
  };

  const handleOnToggle = (index: number) => {
    const updatedData = todoData.map((item) => {
      if (item === filteredTodoData[index]) {
        const isNowChecked = !item.checked;
        return {
          ...item,
          checked: isNowChecked,
          status: isNowChecked
            ? ("complete" as Status)
            : ("incomplete" as Status),
        };
      }
      return item;
    });
    setTodoData(updatedData);
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
      prev.map((item) =>
        item === filteredTodoData[index]
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
        content,
        editingValue: "",
        status: "incomplete",
      };
      setTodoData((prev) => [...prev, newTask]);
    }
  };

  const handleOnFilter = (newFilter: TodoData["status"]) => {
    setFilter(newFilter);
  };

  return (
    <>
      <TodoListInput handleOnAdd={handleOnAdd} />
      <TodoListContent
        todoCount={filteredTodoData.length}
        todoData={filteredTodoData}
        filter={filter}
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
