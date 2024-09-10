import AddNewTaskModal from "@/components/Modals/AddNewTaskModal/AddNewTaskModal";
import TodoItem from "@/components/TodoItem/TodoItem";

const UpcomingPage = () => {
  return (
    <div className="px-20">
      <div>
        <h1 className="mb-5 text-2xl font-semibold">Today</h1>
        <AddNewTaskModal />
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </div>
      <div className="flex gap-10 mt-10">
        <div>
          <h1 className="mb-5 text-2xl font-semibold">Tomorrow</h1>
          <AddNewTaskModal />
          <TodoItem />
          <TodoItem />
        </div>
        <div>
          <h1 className="mb-5 text-2xl font-semibold">This Week</h1>
          <AddNewTaskModal />
          <TodoItem />
          <TodoItem />
          <TodoItem />
          <TodoItem />
        </div>
      </div>
    </div>
  );
};

export default UpcomingPage;
