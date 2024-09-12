import { FaCalendarDay } from "react-icons/fa6";
import { MdAutoDelete } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import EditTaskModal from "../Modals/EditTaskModal/EditTaskModal";
import { TTask } from "@/types/global.type";
import { capitalize } from "lodash";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import axiosQuery from "@/lib/query/axiosQuery";
import { deleteTaskQuery, updateTaskStatusQuery } from "@/lib/query/hasuraQuery";

const TodoItem = ({ task, setTasks }: { task: TTask; setTasks: any }) => {
  const { data: session } = useSession();
  // console.log(task);

  const handleDeleteTask = async () => {
    const toastId = toast.loading("Deleting task, please wait...");

    try {
      const token = session?.accessToken;

      if (!token) {
        throw new Error("No access token or user ID found");
      }
      const query = deleteTaskQuery(task.task_id);
      const data = await axiosQuery(token, query);

      if (data.data.update_task_by_pk.task_id) {
        setTasks((prevTasks: any) =>
          prevTasks.filter(
            (prevTask: TTask) => prevTask.task_id !== task.task_id
          )
        );
        toast.success("Task deleted Successfully", {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.error("Invalid task", { id: toastId, duration: 2000 });
      }
    } catch (error: any) {
      console.error("Error while deleting task:", error.message);
      toast.error(error.message, { id: toastId, duration: 2000 });
    }
  };

  const updateTaskStatus = async() => {
    try {
      const token = session?.accessToken;

      if (!token) {
        throw new Error("No access token or user ID found");
      }
      // console.log(task);
      
      const newStatus = task.status === "pending" ? "completed" : "pending"
      const query = updateTaskStatusQuery(task?.task_id, newStatus);
      const data = await axiosQuery(token, query);

      if (data.data.update_task_by_pk) {
        setTasks((prevTasks: TTask[]) =>
          prevTasks.map((prevTask: TTask) =>
            prevTask.task_id === task.task_id
              ? { ...prevTask, status: newStatus } 
              : prevTask
          )
        );
      } else {
        toast.error("Something went wrong", { duration: 2000 });
      }
    } catch (error: any) {
      console.error("Error while updating task status:", error.message);
      toast.error(error.message, { duration: 2000 });
    }
  };

  return (
    <div className="flex justify-between items-center border-b px-2 py-3 hover:bg-slate-50">
      <div className="flex gap-5 items-start">
        <div className={task?.deleted_at && "hidden"}>
          <input
            type="checkbox"
            className="checkbox checkbox-xs mt-1 cursor-pointer"
            checked={task?.status === 'completed'}
            onClick={updateTaskStatus}
          />
        </div>
        <div>
          <p className={task.status === "completed" ? "line-through text-gray-300": "text-gray-800"}>{capitalize(task?.title)}</p>
          <p className={` text-xs ${task.status === "completed" ? "line-through text-gray-200": "text-gray-600"}`}>{task?.description}</p>
          <div className={`flex gap-5 mt-2 text-xs text-gray-800 ${task.status === "completed" && "hidden"}`}>
            <div className="flex gap-2 items-center justify-start">
              <FaCalendarDay className="text-gray-600" />
              <p>{task?.due_date}</p>
            </div>
            <div className="flex justify-start items-center gap-2 border-l-2 ps-4">
              <div
                className={`h-3 w-3 rounded bg-[#66D9E8] ${
                  task?.category === "personal"
                    ? "bg-[#FF6B6B]"
                    : task?.category === "work"
                    ? "bg-[#66D9E8]"
                    : "bg-[#FFD43B]"
                }`}
              ></div>
              <p>{capitalize(task?.category)}</p>
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
          <EditTaskModal task={task} setTasks={setTasks} />
          <li onClick={handleDeleteTask}>
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
