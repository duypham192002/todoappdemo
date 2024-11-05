type TodoHeaderProps = {
  todoCount: number;
  deleteAllTasks: () => void;
};

function TodoHeader({ todoCount, deleteAllTasks }: TodoHeaderProps) {
  return (
    <div className="flex justify-between pb-4">
      {todoCount > 0 ? (
        <p className="self-center">
          {todoCount} task{todoCount > 1 ? "s" : ""} left
        </p>
      ) : (
        <p className="self-center">All tasks completed</p>
      )}
      <select className="px-1.5 py-1.5 border border-gray-400 rounded-lg ">
        <option value="all">All</option>
        <option value="complete">Complete</option>
        <option value="incomplete">Incomplete</option>
      </select>
      <button onClick={deleteAllTasks}>Clear all tasks</button>
    </div>
  );
}

export default TodoHeader;
