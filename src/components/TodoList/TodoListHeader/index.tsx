import { Status, TodoData } from "..";

const filteredData: { label: string; value: TodoData["status"] }[] = [
  { label: "All", value: "all" },
  { label: "Complete", value: "complete" },
  { label: "Incomplete", value: "incomplete" },
];

type TodoHeaderProps = {
  todoCount: number;
  filter: Status;
  onDeleteAllTasks: () => void;
  onFilterChange: (filter: TodoData["status"]) => void;
  onOpenPopup: () => void; // Hàm mở Popup
};

function TodoHeader({
  todoCount,
  filter,
  onDeleteAllTasks,
  onFilterChange,
  onOpenPopup, // Nhận hàm mở Popup
}: TodoHeaderProps) {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value as TodoData["status"];
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
          {filteredData.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </form>

      <div className="flex gap-3">
        <button onClick={onDeleteAllTasks}>Clear all tasks</button>
        <button onClick={onOpenPopup}>Open Popup</button> {/* Nút mở Popup */}
      </div>
    </div>
  );
}

export default TodoHeader;
