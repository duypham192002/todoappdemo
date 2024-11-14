import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react";

export type Status = "all" | "complete" | "incomplete";

export type TodoData = {
  checked: boolean;
  content: string;
  isEditing?: boolean;
  editingValue: string;
  status: Status;
};

type TodoContextType = {
  todoData: TodoData[];
  filter: Status;
  popupRef: React.RefObject<{
    openPopup: () => void;
    closePopup: () => void;
  } | null>;
  filteredTodoData: TodoData[];
  handleOnAdd: (content: string) => void;
  handleOnDelete: (index: number) => void;
  handleOnToggle: (index: number) => void;
  handleSave: (index: number, newValue: string) => void;
  handleToggleEdit: (index: number) => void;
  OnDeleteAllTasks: () => void;
  handleClosePopup: (updatedData: TodoData[]) => void;
  handleDeleteCheckedItems: () => void;
  handleOnFilter: (newFilter: TodoData["status"]) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todoData, setTodoData] = useState<TodoData[]>(() => {
    const savedTodo = localStorage.getItem("todos");
    return savedTodo ? JSON.parse(savedTodo) : [];
  });
  const [filter, setFilter] = useState<TodoData["status"]>("all");

  const popupRef = useRef<{
    openPopup: () => void;
    closePopup: () => void;
  } | null>(null);

  const filteredTodoData = useMemo(() => {
    if (filter === "all") {
      return todoData;
    }
    return todoData.filter((item) => item.status === filter);
  }, [filter, todoData]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoData));
  }, [todoData]);

  const handleOnDelete = (index: number) => {
    const targetItem = filteredTodoData[index];
    setTodoData((prev) => prev.filter((item) => item !== targetItem));
  };

  const handleOnToggle = (index: number) => {
    const updatedData = todoData.map((item) => {
      if (item === filteredTodoData[index]) {
        const isNowChecked = !item.checked;
        return {
          ...item,
          checked: isNowChecked,
          status: isNowChecked
            ? ("complete" as Status)
            : ("incomplete" as Status),
        };
      }
      return item;
    });
    setTodoData(updatedData);
  };

  const handleSave = (index: number, newValue: string) => {
    setTodoData((prev) => {
      const newState = [...prev];
      newState[index] = {
        ...newState[index],
        content: newValue,
        isEditing: false,
      };
      return newState;
    });
  };

  const handleToggleEdit = (index: number) => {
    setTodoData((prev) =>
      prev.map((item) =>
        item === filteredTodoData[index]
          ? { ...item, isEditing: !item.isEditing, editingValue: item.content }
          : item
      )
    );
  };

  const OnDeleteAllTasks = () => {
    setTodoData([]);
  };

  const handleClosePopup = (updatedData: TodoData[]) => {
    setTodoData(updatedData); // Cập nhật todoData với dữ liệu từ Popup khi đóng Popup
  };

  const handleDeleteCheckedItems = () => {
    setTodoData((prevData) => prevData.filter((item) => !item.checked));
  };

  const handleOnAdd = (content: string) => {
    if (content.trim()) {
      const newTask: TodoData = {
        checked: false,
        content,
        editingValue: "",
        status: "incomplete",
      };
      setTodoData((prev) => [...prev, newTask]);
    }
  };

  const handleOnFilter = (newFilter: TodoData["status"]) => {
    setFilter(newFilter);
  };

  return (
    <TodoContext.Provider
      value={{
        todoData,
        filter,
        popupRef,
        filteredTodoData,
        handleOnAdd,
        handleOnDelete,
        handleOnToggle,
        handleSave,
        handleToggleEdit,
        OnDeleteAllTasks,
        handleClosePopup,
        handleDeleteCheckedItems,
        handleOnFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
