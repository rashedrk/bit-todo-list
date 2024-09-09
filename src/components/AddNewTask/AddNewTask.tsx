import { IoMdAdd } from "react-icons/io";
const AddNewTask = () => {
    return (
        <div className="flex justify-start items-center gap-3 border p-4 rounded-lg">
            <IoMdAdd className="text-xl" />
            <p className="text-gray-500">Add New Task</p>
        </div>
    );
};

export default AddNewTask;