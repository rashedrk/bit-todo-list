import { FaCalendarDay } from "react-icons/fa6";
import { MdAutoDelete } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import EditTaskModal from "../Modals/EditTaskModal/EditTaskModal";
import { TTask } from "@/types/global.type";
const TodoItem = ({ task }: { task: TTask }) => {
  return (
    <div className="flex justify-between items-center border-b px-2 py-3 hover:bg-slate-50">
      <div className="flex gap-5 items-start">
        <div>
          <input
            type="checkbox"
            className="checkbox checkbox-xs mt-1 cursor-pointer"
          />
        </div>
        <div>
          <p className="text-gray-800">{task?.title}</p>
          <p className="text-gray-600 text-xs">{task?.description}</p>
          <div className="flex gap-5 mt-2 text-xs text-gray-800">
            <div className="flex gap-2 items-center justify-start">
              <FaCalendarDay className="text-gray-600" />
              <p>{task?.due_date}</p>
            </div>
            <div className="flex justify-start items-center gap-2 border-l-2 ps-4">
              <div className="h-3 w-3 rounded bg-[#66D9E8]"></div>
              <p>{task?.category}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className=" m-1">
          <BsThreeDots className="text-xl text-gray-800 cursor-pointer" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-28 p-2 shadow"
        >
          <EditTaskModal />
          <li>
            <a>
              <MdAutoDelete className="text-gray-700 " /> Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TodoItem;
