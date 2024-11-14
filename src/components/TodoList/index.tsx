import TodoListContent from "./TodoListContent";
import TodoListInput from "./TodoListInput";
import Popup from "./Popup/PopUp";
import { useTodo } from "./Context/TodoContext";

function TodoList() {
  const {
    filteredTodoData,
    filter,
    handleOnAdd,
    handleOnDelete,
    handleOnToggle,
    handleSave,
    handleToggleEdit,
    OnDeleteAllTasks,
    handleClosePopup,
    handleDeleteCheckedItems,
    popupRef,
    handleOnFilter,
  } = useTodo();

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
        data={filteredTodoData}
        onDeleteCheckedItems={handleDeleteCheckedItems}
        onClose={handleClosePopup}
      />
    </>
  );
}

export default TodoList;
