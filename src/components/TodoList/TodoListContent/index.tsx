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
  handleDeleteCheckedItems,
  onOpenPopup,
  handleClosePopup,
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
  handleDeleteCheckedItems: () => void;
  onOpenPopup: () => void; // Nhận prop từ cha để mở Popup
  handleClosePopup: (updatedData: TodoData[]) => void;
}) {
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
        onOpenPopup={onOpenPopup} // Gọi hàm mở Popup
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

      <Popup
        data={todoData}
        onDeleteCheckedItems={handleDeleteCheckedItems}
        // onToggle={handleOnToggle}
        onClose={handleClosePopup}
      />
    </div>
  );
}

export default TodoListContent;
