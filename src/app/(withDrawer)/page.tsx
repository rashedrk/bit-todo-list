"use client";

import Loader from "@/components/Loader/Loader";
import AddNewTaskModal from "@/components/Modals/AddNewTaskModal/AddNewTaskModal";
import TodoItem from "@/components/TodoItem/TodoItem";
import axiosQuery from "@/lib/query/axiosQuery";
import { getTasksQuery } from "@/lib/query/hasuraQuery";
import { TTask } from "@/types/global.type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "./pagination.css";

const TodaysTaskPage = () => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  // console.log("this is tasks",tasks);

  //total page = total item / limit
  const totalPages = Math.ceil(count / 10);
  // const handlePageChange = (newPage: number) => {
  //   setPage(newPage);
  //   // offset = (page num - 1) * limit
  //   const offset = (page - 1) * 10;
  //   setOffset(offset);
  // };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = session?.accessToken;
        const userId = session?.user?.id;

        if (!token || !userId) {
          throw new Error("No access token or user ID found");
        }
        // offset = (page num - 1) * limit
        const offset = (page - 1) * 10;
        const query = getTasksQuery(userId, offset);
        const data = await axiosQuery(token, query);
        setTasks(data.data.task);
        setCount(data.data.task_aggregate.aggregate.count);
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error fetching tasks:", error.message);
      }
    };
    fetchTasks();
  }, [page]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="px-5">
      <h1 className="mb-5 text-2xl font-semibold">
        All Tasks - <span className="">{count}</span>
      </h1>
      <div className="bg-slate-50 px-10 py-5">
        <AddNewTaskModal setTasks={setTasks} />
        {tasks?.map((item: TTask) => (
          <div key={item.task_id}>
            <TodoItem task={item} setTasks={setTasks} />
          </div>
        ))}
      </div>
      <div className="flex justify-start mt-2">
        <ResponsivePagination
          current={page}
          total={totalPages}
          onPageChange={setPage}
          maxWidth={20}
        />
      </div>
    </div>
  );
};

export default TodaysTaskPage;
