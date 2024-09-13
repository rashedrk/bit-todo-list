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
import { updateTaskQuery } from "@/lib/query/hasuraQuery";
import { taskSchema } from "@/schema/task.schema";
import { TTask } from "@/types/global.type";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { toast } from "sonner";

const EditTaskModal = ({ task, setTasks }: { task: TTask; setTasks: any }) => {
  const { data: session } = useSession();

  //values of the tasks
  const defaultValues = {
    title: task.title,
    description: task.description,
    category: task.category,
    due_date: task.due_date,
    priority: task.priority
  };

  // Open or close the modal
  const handleClick = (action: string) => {
    const modal = document.getElementById(
      `${task.task_id}`
    ) as HTMLDialogElement | null;
    if (modal && action === "open") {
      modal.showModal();
    } else if (modal && action === "close") {
      modal.close();
    }
  };

  //function to submit the form
  const onSubmit: SubmitHandler<FieldValues> = async(values) => {
    const editedTask = {
      ...values,
      due_date: dayjs(values.due_date).format("YYYY-MM-DD"),
    };
    

    const toastId = toast.loading("Updating task, please wait...");

    try {
      const token = session?.accessToken;

      if (!token) {
        throw new Error("No access token found");
      }

      const query = updateTaskQuery(task.task_id, editedTask);

      const data = await axiosQuery(token, query);
      // console.log(data);
      
      if (data?.data?.update_task_by_pk) {
        // Update the local state with the updated task
        setTasks((prevTasks: any) => 
          prevTasks.map((ptask:TTask) => ptask.task_id === data?.data?.update_task_by_pk.task_id ? data.data.update_task_by_pk : ptask)
        );
        
      }
      toast.success("Task added Successfully", { id: toastId, duration: 2000 });
      handleClick('close');
    } catch (error: any) {
      console.error("Error while adding task:", error.message);
      toast.error(error.message, { id: toastId, duration: 2000 });
    }

  };

  return (
    <>
      <li className={(task.status === "completed" || task?.deleted_at) ? "hidden": ""} onClick={() => handleClick("open")}>
        <a>
          <FaEdit className="text-gray-700 " /> Edit
        </a>
      </li>
      <dialog id={`${task.task_id}`} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg pb-5">Edit your todo task</h3>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => handleClick("close")}
          >
            ✕
          </button>
          <TForm onSubmit={onSubmit} defaultValues={defaultValues} resolver={zodResolver(taskSchema)}>
            <div className="mb-8">
              <TInput
                placeholder="Enter task title"
                label="Title"
                name="title"
                type="text"
                className="mb-2"
              />
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
              Edit Task
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

export default EditTaskModal;
