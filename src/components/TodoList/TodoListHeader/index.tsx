import { useState } from "react";
import { TodoData } from "..";

type TodoHeaderProps = {
  todoCount: number;
  onDeleteAllTasks: () => void;
  onFilterChange: (filter: TodoData["status"]) => void;
};

function TodoHeader({
  todoCount,
  onDeleteAllTasks,
  onFilterChange,
}: TodoHeaderProps) {
  const [filter, setFilter] = useState<TodoData["status"]>("all");

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value as TodoData["status"];
    setFilter(newFilter);
    onFilterChange(newFilter);
  };

  return (
    <div className="flex justify-between pb-4">
      {todoCount > 0 ? (
        <p className="self-center">
          {todoCount} task{todoCount > 1 ? "s" : ""} left
        </p>
      ) : (
        <p className="self-center">No tasks left</p>
      )}

      <form className="max-w-sm mx-auto">
        <select
          className="px-2 py-1 border border-gray-400 rounded-lg"
          name="filter"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </form>

      <button onClick={onDeleteAllTasks}>Clear all tasks</button>
    </div>
  );
}

export default TodoHeader;
