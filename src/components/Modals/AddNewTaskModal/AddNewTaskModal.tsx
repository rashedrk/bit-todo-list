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
import { taskSchema } from "@/schema/task.schema";
import { getDescription } from "@/services/actions/getDescription";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import { toast } from "sonner";

const AddNewTaskModal = ({ setTasks }: any) => {
  const { data: session } = useSession();
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = {
    title: "",
    description: "",
    category: 0,
    due_date: "",
    priority: 0
  };
  

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

  //getting the title from the input and and calling the ai api to generate description
  const handleOnBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    setIsLoading(true);
    try {
        const value = event.target.value.trim();
        if (value === "") {
            setIsLoading(false);
            return;
        }
        const { text } = await getDescription(value);
        setDescription(text);
    } catch (error) {
        toast.error('An error occurred while fetching the description.');
        console.error('Error generating description:', error);
    } finally {
        setIsLoading(false);
    }
  };

  //function to submit the form
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Adding task, please wait...");

    console.log("date",values.due_date);
    
    try {
      const token = session?.accessToken;
      const userId = session?.user?.id;

      if (!token || !userId) {
        throw new Error("No access token or user ID found");
      }

      const newTask = {
        ...values,
        description: values.description || description,
        due_date: values?.due_date,
        user_id: Number(userId),
      };

      // console.log(newTask);
      

      const query = addTasksQuery(newTask);

      const data = await axiosQuery(token, query);
      if (data?.data?.insert_task_one) {
        // console.log(data?.data?.insert_task_one);
        
        setTasks((prevTasks: any) => [
          data?.data?.insert_task_one,
          ...prevTasks,
        ]);
        toast.success("Task added Successfully", { id: toastId, duration: 2000 });
      }
      else {
        toast.error("Something went wrong!", { id: toastId, duration: 2000 });
      }
      handleClick("close");
      setDescription("");
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
          <TForm 
          onSubmit={onSubmit} 
          defaultValues={defaultValues}
          resolver={zodResolver(taskSchema)}
          >
            <div className="mb-8">
              <TInput
                onBlur={handleOnBlur}
                placeholder="Enter task title"
                label="Title"
                name="title"
                type="text"
                className="mb-2"
              />
              <TTextArea
                defaultValue={description}
                loading={isLoading}
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
