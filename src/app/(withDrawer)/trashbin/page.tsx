"use client";

import TodoItem from "@/components/TodoItem/TodoItem";
import axiosQuery from "@/lib/query/axiosQuery";
import { getDeletedTasksQuery } from "@/lib/query/hasuraQuery";
import { TTask } from "@/types/global.type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const TrashBinPage = () => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = session?.accessToken;
        const userId = session?.user?.id;

        if (!token || !userId) {
          throw new Error("No access token or user ID found");
        }

        const query = getDeletedTasksQuery(userId);
        const data = await axiosQuery(token, query);
        // console.log(data);
        
        setTasks(data.data.trash_task);
      } catch (error: any) {
        console.error("Error fetching tasks:", error.message);
      }
    };
    fetchTasks();
  }, []);
  return (
    <div>
      <div className="px-20">
        <h1 className="mb-5 text-2xl font-semibold">Deleted Tasks</h1>
        {tasks?.map((item: TTask) => (
          <div key={item.task_id}>
            <TodoItem task={item} setTasks={setTasks} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBinPage;
