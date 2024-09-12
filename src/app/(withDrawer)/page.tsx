"use client";

import AddNewTaskModal from "@/components/Modals/AddNewTaskModal/AddNewTaskModal";
import TodoItem from "@/components/TodoItem/TodoItem";
import axiosQuery from "@/lib/query/axiosQuery";
import { getTasksQuery } from "@/lib/query/hasuraQuery";
import { TTask } from "@/types/global.type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const TodaysTaskPage = () => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);

  // console.log("this is tasks",tasks);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = session?.accessToken;
        const userId = session?.user?.id;

        if (!token || !userId) {
          throw new Error("No access token or user ID found");
        }

        const query = getTasksQuery(userId);
        const data = await axiosQuery(token, query);
        setTasks(data.data.task);
      } catch (error: any) {
        console.error("Error fetching tasks:", error.message);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="px-5">
      <h1 className="mb-5 text-2xl font-semibold">All Tasks - <span className="">{tasks.length}</span></h1>
      <div className="bg-slate-50 px-10 py-5">
        <AddNewTaskModal setTasks={setTasks} />
        {tasks?.map((item: TTask) => (
          <div key={item.task_id}>
            <TodoItem task={item} setTasks={setTasks} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysTaskPage;
