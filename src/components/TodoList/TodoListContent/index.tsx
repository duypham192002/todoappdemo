import { TodoData } from "..";

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
          <div
            key={index}
            className={`flex items-center p-4 ${
              data.checked ? "opacity-50 line-through" : ""
            }`}
          >
            <input
              type="checkbox"
              className="checked:bg-blue-500 size-4"
              checked={data.checked}
              onChange={() => handleOnToggle(index)}
            />

            {data.isEditing ? (
              <div className="flex items-center flex-1">
                <input
                  type="text"
                  value={data.editingValue}
                  onChange={(e) => {
                    handleEditingChange(index, e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSave(index);
                    }
                  }}
                  autoFocus
                  className="px-2 py-1 border border-gray-300 rounded flex-1 mr-2"
                />
                <button
                  onClick={() => handleSave(index)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="px-4 font-bold flex-1">{data.content}</p>
            )}
            <div className="flex w-auto gap-4">
              <button
                onClick={() => handleToggleEdit(index)}
                disabled={data.checked}
              >
                {data.isEditing ? null : (
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
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                )}
              </button>
              <button onClick={() => handleDelete(index)}>
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.217 1.827H7.056a2.25 2.25 0 0 1-2.217-2.748L10.163 9.046m8.565-3.21c-.343-.052-.684-.107-1.025-.166m1.025.166-2.896 13.493a2.25 2.25 0 0 1-2.217 1.827H5.875a2.25 2.25 0 0 1-2.217-2.748L8.42 9.046"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoListContent;
