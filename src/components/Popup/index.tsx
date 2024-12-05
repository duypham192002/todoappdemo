import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { TodoData } from "../../pages/TodoList";

type PopupProps = {
  data: TodoData[];
  onClose: (updatedData: TodoData[]) => void;
  onDeleteCheckedItems: () => void;
};

const Popup = forwardRef(({ data, onClose }: PopupProps, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempData, setTempData] = useState<TodoData[]>([]);

  useEffect(() => {
    if (isOpen) setTempData([...data]); // Sao chép data từ TodoList khi Popup mở
  }, [isOpen, data]);

  useImperativeHandle(ref, () => ({
    openPopup: () => setIsOpen(true),
    closePopup: () => {
      setIsOpen(false);
      onClose(tempData); // Trả về tempData cập nhật khi đóng Popup
    },
  }));

  if (!isOpen) return null;

  const handleToggle = (index: number) => {
    const updatedTempData = [...tempData];
    updatedTempData[index] = {
      ...updatedTempData[index],
      checked: !updatedTempData[index].checked,
    };
    setTempData(updatedTempData);
  };

  const handleDeleteCheckedItems = () => {
    const updatedData = tempData.filter((item) => !item.checked);
    setTempData(updatedData); // Cập nhật tempData để xóa các mục đã checked
    onClose(updatedData); // Truyền lại data mới về TodoList
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 p-1 text-gray-600 hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div>
          <h3 className="text-lg font-bold mb-3">Popup TodoData</h3>
          {tempData.map((item, index) => (
            <div key={index} className="flex items-center gap-4 pb-4">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleToggle(index)}
                className="checked:bg-blue-500 size-4"
              />
              <input
                value={item.content}
                readOnly
                className="px-2 py-1 border border-gray-300 rounded"
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleDeleteCheckedItems} // Gọi hàm xóa đã sửa
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete Checked
          </button>
        </div>
      </div>
    </div>
  );
});

export default Popup;
