import { useState, useMemo, useEffect } from "react";
import TodoListContent from "./TodoListContent";
import TodoListInput from "./TodoListInput";
import Popup from "./Popup/PopUp";

export type Status = "all" | "complete" | "incomplete";

export type TodoData = {
  checked: boolean;
  content: string;
  isEditing?: boolean;
  editingValue: string;
  status: Status;
};

function TodoList() {
  const [todoData, setTodoData] = useState<TodoData[]>(() => {
    const savedTodo = localStorage.getItem("todos");
    // console.log(savedTodo);

    return savedTodo ? JSON.parse(savedTodo) : [];
  });
  const [filter, setFilter] = useState<TodoData["status"]>("all");
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Trạng thái để mở Popup

  const filteredTodoData = useMemo(() => {
    if (filter == "all") {
      return todoData;
    }
    return todoData.filter((item) => item.status === filter);
  }, [filter, todoData]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoData));
  }, [todoData]);

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

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
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

      {isPopupOpen && (
        <Popup
          onClose={togglePopup}
          data={todoData}
          onDeleteChecked={handleOnDelete}
          onToggle={handleOnToggle}
        />
      )}
    </>
  );
}

export default TodoList;
