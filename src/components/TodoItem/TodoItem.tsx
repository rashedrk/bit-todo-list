import { FaCalendarDay } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
const TodoItem = () => {
  return (
    <div className="flex justify-between items-center border-b px-2 py-3">
      <div className="flex gap-5 items-start">
        <div>
          <input
            type="checkbox"
            className="checkbox checkbox-xs mt-1 cursor-pointer"
          />
        </div>
        <div>
          <p className="text-gray-600">Research content title</p>
          <p className="text-gray-400 text-xs">
            this is meant to be the description of the task. could be more
            described and be long as it is
          </p>
          <div className="flex gap-5 mt-2 text-xs text-gray-600">
            <div className="flex gap-2 items-center justify-start">
              <FaCalendarDay className="text-gray-500"/>
              <p>22-08-2024</p>
            </div>
            <div className="flex justify-start items-center gap-2 border-l-2 ps-4">
              <div
                className="h-3 w-3 rounded bg-[#66D9E8]"
              ></div>

              <p>Personal</p>
            </div>
          </div>
        </div>
      </div>
      <div>
      <MdKeyboardArrowRight className="text-4xl text-gray-600"/>
      </div>
    </div>
  );
};

export default TodoItem;
