import { Status, TodoData } from "../TodoList";

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
        <button onClick={onOpenPopup}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </button>{" "}
        {/* Nút mở Popup */}
      </div>
    </div>
  );
}

export default TodoHeader;
