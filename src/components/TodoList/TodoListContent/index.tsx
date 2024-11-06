import { TodoData } from "..";
import TodoItem from "./TodoListItem";

function TodoListContent({
  todoData,
  handleOnDelete,
  handleOnToggle,
  deleteAllTasks,
  handleToggleEdit,
  handleSave,
  handleEditingChange,
}: {
  todoData: TodoData[];
  handleOnDelete: (index: number) => void;
  handleOnToggle: (index: number) => void;
  deleteAllTasks: () => void;
  handleToggleEdit: (index: number) => void;
  handleSave: (index: number) => void;
  handleEditingChange: (index: number, newContent: string) => void;
}) {
  const handleDelete = (index: number) => {
    handleOnDelete(index);
  };

  return (
    <div className="max-w-full bg-white shadow-lg p-4 rounded-xl">
      <div className="flex justify-between pb-4">
        {todoData.length > 0 ? (
          <p>
            {todoData.length} task{todoData.length > 1 ? "s" : ""} left
          </p>
        ) : (
          <p>All tasks completed</p>
        )}
        <button onClick={deleteAllTasks}>Clear all tasks</button>
      </div>

      <div>
        {todoData.map((data, index) => (
          <TodoItem
            key={index}
            data={data}
            index={index}
            onChangeEdit={handleEditingChange}
            onSaveEdit={handleSave}
            onDelete={handleDelete}
            onToggle={handleOnToggle}
            onToggleEdit={handleToggleEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoListContent;
