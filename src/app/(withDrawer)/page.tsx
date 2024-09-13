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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import NoData from "@/components/NoDataFound/NoData";

const TodaysTaskPage = () => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [date, setDate] = useState<Date | null>();
  const [sortOrder, setSortOrder] = useState("");

  //total page = total item / limit
  const totalPages = Math.ceil(count / 10);

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
        const filterDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
        const query = getTasksQuery(userId, offset, sortOrder, filterDate);
        const data = await axiosQuery(token, query);
        setTasks(data.data.task);
        setCount(data.data.task_aggregate.aggregate.count);
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error fetching tasks:", error.message);
      }
    };
    fetchTasks();
  }, [page, date, sortOrder]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="md:px-5">
      <h1 className="mb-5 text-2xl font-semibold">
        All Tasks - <span className="">{count}</span>
      </h1>
      <div className="bg-slate-50 md:px-10 px-1 py-5">
        <div className="flex gap-5 items-center mb-5">
          <div className="md:w-2/3 w-1/2">
            <AddNewTaskModal setTasks={setTasks} />
          </div>
          <div className="md:w-1/3 w-1/2 flex gap-2">
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className={`input input-bordered w-full input-md }`}
              placeholderText={"Filter by Date"}
              dateFormat="dd-MM-yyyy"
            />
            <select
              className="select select-bordered"
              onChange={handleSortChange}
              value={sortOrder}
            >
              <option value="" disabled selected>
                Sort by Date
              </option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        {tasks.length > 0 ? (
          tasks?.map((item: TTask) => (
            <div key={item.task_id}>
              <TodoItem task={item} setTasks={setTasks} />
            </div>
          ))
        ) : (
          <NoData />
        )}
      </div>
      {tasks.length > 0 && (
        <div className="flex justify-start mt-2">
          <ResponsivePagination
            current={page}
            total={totalPages}
            onPageChange={setPage}
            maxWidth={20}
          />
        </div>
      )}
    </div>
  );
};

export default TodaysTaskPage;
