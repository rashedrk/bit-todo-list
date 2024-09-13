import { MdOutlineDoubleArrow } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

export const sidebarTasks = [
  {
    icon: <FaListCheck className="text-gray-500" />,
    label: "All Tasks",
    path: "/",
  },
  {
    icon: <MdOutlineDoubleArrow className="text-gray-500" />,
    label: "Today",
    path: "/today",
  },
  {
    icon: <FaTrashAlt className="text-gray-500" />,
    label: "Trash Bin",
    path: "/trashbin",
  },
];


