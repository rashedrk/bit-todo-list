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
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaEdit } from "react-icons/fa";

const EditTaskModal = () => {
  // Open or close the modal
  const handleClick = (action: string) => {
    const modal = document.getElementById(
      "editTaskModal"
    ) as HTMLDialogElement | null;
    if (modal && action === "open") {
      modal.showModal();
    } else if (modal && action === "close") {
      modal.close();
    }
  };

  //function to submit the form
  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    console.log(values);
  };

  return (
    <>
      {/* <div
        className="flex justify-start items-center gap-3 border p-4 rounded-lg cursor-pointer hover:bg-slate-50"
        
      >
        <FaEdit className="text-gray-700 "/> Edit
      </div> */}
      <li onClick={() => handleClick("open")}>
        <a>
          <FaEdit className="text-gray-700 " /> Edit
        </a>
      </li>
      <dialog id="editTaskModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg pb-5">Edit your todo task</h3>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => handleClick("close")}
          >
            ✕
          </button>
          <TForm onSubmit={onSubmit}>
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
