"use client";

import TDatePicker from "@/components/Forms/TDatePicker";
import TForm from "@/components/Forms/TForm";
import TInput from "@/components/Forms/TInput";
import TSelect from "@/components/Forms/TSelect";
import TTextArea from "@/components/Forms/TTextArea";
import {
  CategoryOptions,
  priorityOptions,
} from "@/constant/selectOptions.constant";
import axiosQuery from "@/lib/query/axiosQuery";
// import { fetchGraphQL } from "@/lib/query/graphqlClient";
import { addTasksQuery } from "@/lib/query/hasuraQuery";
import { getDescription } from "@/services/actions/getDescription";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import { toast } from "sonner";

const AddNewTaskModal = ({ setTasks }: any) => {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")

  // Open or close the modal
  const handleClick = (action: string) => {
    const modal = document.getElementById(
      "addTaskModal"
    ) as HTMLDialogElement | null;
    if (modal && action === "open") {
      modal.showModal();
    } else if (modal && action === "close") {
      modal.close();
    }
  };


//getting the title from the input and setting it to the state
//so that we can call the ai api with title
  const handleOnChange = (event:React.FocusEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  //here we using set timeout to get the total value of title after writing is finished
  //then we call for the sdk and get the description
  useEffect(() => {
    if (!title) return; // Avoid running effect if title is empty

    const timeoutId = setTimeout(async () => {
      try {
        const { text } = await getDescription(title);
        setDescription(text);
      } catch (error) {
        console.error('Error fetching description:', error);
      }
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [title]);

  
console.log(description);


  //function to submit the form
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Adding task, please wait...");

    try {
      const token = session?.accessToken;
      const userId = session?.user?.id;

      if (!token || !userId) {
        throw new Error("No access token or user ID found");
      }

      const newTask = {
        ...values,
        due_date: dayjs(values?.due_date).format("YYYY-MM-DD"),
        user_id: Number(userId),
      };

      const query = addTasksQuery(newTask);

      const data = await axiosQuery(token, query);
      const today = dayjs().format("YYYY-MM-DD");
      // if (data?.data?.insert_task_one?.due_date === today) {
      if (data?.data?.insert_task_one) {
        setTasks((prevTasks: any) => [
          data?.data?.insert_task_one,
          ...prevTasks,
        ]);
      }
      toast.success("Task added Successfully", { id: toastId, duration: 2000 });
      handleClick("close");
    } catch (error: any) {
      console.error("Error while adding task:", error.message);
      toast.error(error.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <>
      <div
        className="flex justify-start items-center gap-3 border p-4 rounded-lg cursor-pointer hover:bg-slate-50"
        onClick={() => handleClick("open")}
      >
        <IoMdAdd className="text-xl" />
        <p className="text-gray-800">Add New Task</p>
      </div>

      <dialog id="addTaskModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg pb-5">Add your todo task</h3>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => handleClick("close")}
          >
            ✕
          </button>
          <TForm onSubmit={onSubmit}>
            <div className="mb-8">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Title</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter task title"
                  onChange={handleOnChange}
                  
                  className={`input input-bordered w-full input-md mb-2`}
                />
              </label>

              {/* <TInput
                placeholder="Enter task title"
                label="Title"
                name="title"
                type="text"
                className="mb-2"
              /> */}
              <TTextArea
                placeholder="Enter task description"
                label="Description"
                name="description"
                className="mb-2 textarea-md"
              />
              <div className="flex gap-4">
                <TSelect
                  name="category"
                  label="Category"
                  placeholder="Select Category"
                  options={CategoryOptions}
                />
                <TDatePicker
                  name="due_date"
                  label="Due Date"
                  placeholder="select date"
                />
                <TSelect
                  name="priority"
                  label="Priority"
                  placeholder="Select Priority"
                  options={priorityOptions}
                />
              </div>
            </div>
            <button
              className="btn primary-btn hover:bg-[#004E7C] bg-[#0d6aa0] text-white"
              type="submit"
            >
              Add Task
            </button>
            <button
              className="btn ms-4"
              type="reset"
              onClick={() => handleClick("close")}
            >
              Cancel
            </button>
          </TForm>
        </div>
      </dialog>
    </>
  );
};

export default AddNewTaskModal;
