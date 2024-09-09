import { MdOutlineDoubleArrow } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";

export const sidebarTasks = [
  {
    icon: <MdOutlineDoubleArrow className="text-gray-500" />,
    label: "Upcoming",
    path: "/upcoming",
  },
  {
    icon: <FaListCheck className="text-gray-500" />,
    label: "Today",
    path: "/",
  },
];

export const sidebarCategory = [
  {
    icon: (
      <div
        style={{
          backgroundColor: "#FF6B6B",
          height: "15px",
          width: "15px",
          borderRadius: "5px",
        }}
      ></div>
    ),
    label: "Personal",
    path: "/personal",
  },
  {
    icon: (
      <div
        style={{
          backgroundColor: "#66D9E8",
          height: "15px",
          width: "15px",
          borderRadius: "5px",
        }}
      ></div>
    ),
    label: "Work",
    path: "/work",
  },
  {
    icon: (
      <div
        style={{
          backgroundColor: "#FFD43B",
          height: "15px",
          width: "15px",
          borderRadius: "5px",
        }}
      ></div>
    ),
    label: "Education",
    path: "/education",
  },
];
