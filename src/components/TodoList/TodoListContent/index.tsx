import { TodoData } from "..";
import TodoHeader from "../TodoListHeader";
import TodoItem from "./TodoListItem";

function TodoListContent({
  todoCount,
  todoData,
  handleOnDelete,
  handleOnToggle,
  deleteAllTasks,
  handleToggleEdit,
  handleSave,
  handleOnFilter,
}: {
  todoCount: number;
  todoData: TodoData[];
  handleOnDelete: (index: number) => void;
  handleOnToggle: (index: number) => void;
  deleteAllTasks: () => void;
  handleToggleEdit: (index: number) => void;
  handleSave: (index: number, newValue: string) => void;
  handleOnFilter: (newFilter: TodoData["status"]) => void;
}) {
  const handleDelete = (index: number) => {
    handleOnDelete(index);
  };

  return (
    <div className="max-w-full bg-white shadow-lg p-4 rounded-xl">
      <TodoHeader
        todoCount={todoCount}
        onDeleteAllTasks={deleteAllTasks}
        onFilterChange={handleOnFilter}
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
    </div>
  );
}

export default TodoListContent;
