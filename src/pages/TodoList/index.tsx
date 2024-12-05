import { useState, useMemo, useEffect, useRef } from "react";
// import TodoListContent from "./TodoListContent";
import TodoListContent from "../../components/TodoListContent";
import TodoListInput from "../../components/TodoListInput";
import Popup from "../../components/Popup";

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
    return savedTodo ? JSON.parse(savedTodo) : [];
  });
  const [filter, setFilter] = useState<TodoData["status"]>("all");
  // const [isPopupOpen, setIsPopupOpen] = useState(false); // Trạng thái để mở Popup

  const popupRef = useRef<{
    openPopup: () => void;
    closePopup: () => void;
  } | null>(null);

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

  const handleClosePopup = (updatedData: TodoData[]) => {
    setTodoData(updatedData); // Cập nhật todoData với dữ liệu từ Popup khi đóng Popup
  };

  const handleDeleteCheckedItems = () => {
    setTodoData((prevData) => prevData.filter((item) => !item.checked));
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
        handleDeleteCheckedItems={handleDeleteCheckedItems}
        onOpenPopup={() => popupRef.current?.openPopup()}
        handleClosePopup={handleClosePopup}
      />

      <Popup
        ref={popupRef}
        data={todoData}
        onDeleteCheckedItems={handleDeleteCheckedItems} // Truyền hàm đã cập nhật
        onClose={handleClosePopup} // Cập nhật todoData khi đóng Popup
      />
    </>
  );
}

export default TodoList;
