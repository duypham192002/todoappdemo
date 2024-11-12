import { useState } from "react";
import { Status, TodoData } from "..";
import TodoHeader from "../TodoListHeader";
import TodoItem from "./TodoListItem";
import Popup from "../Popup/PopUp";

function TodoListContent({
  todoCount,
  todoData,
  filter,
  handleOnDelete,
  handleOnToggle,
  deleteAllTasks,
  handleToggleEdit,
  handleSave,
  handleOnFilter,
}: {
  todoCount: number;
  todoData: TodoData[];
  filter: Status;
  handleOnDelete: (index: number) => void;
  handleOnToggle: (index: number) => void;
  deleteAllTasks: () => void;
  handleToggleEdit: (index: number) => void;
  handleSave: (index: number, newValue: string) => void;
  handleOnFilter: (newFilter: TodoData["status"]) => void;
}) {
  // Trạng thái để mở và đóng popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Hàm để mở hoặc đóng popup
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleDelete = (index: number) => {
    handleOnDelete(index);
  };

  return (
    <div className="max-w-full bg-white shadow-lg p-4 rounded-xl">
      <TodoHeader
        todoCount={todoCount}
        filter={filter}
        onDeleteAllTasks={deleteAllTasks}
        onFilterChange={handleOnFilter}
        onOpenPopup={togglePopup}
      />

      <div>
        {todoData.map((data, index) => (
          <TodoItem
            key={index}
            data={data}
            index={index}
            onSaveEdit={handleSave}
            onDelete={handleDelete}
            onToggle={handleOnToggle}
            onToggleEdit={handleToggleEdit}
          />
        ))}
      </div>

      {/* Hiển thị Popup khi trạng thái isPopupOpen là true */}
      {isPopupOpen && (
        <Popup
          onClose={togglePopup}
          data={todoData}
          onDeleteChecked={handleDelete} // Updated to onDeleteChecked for consistency
        />
      )}
    </div>
  );
}

export default TodoListContent;
