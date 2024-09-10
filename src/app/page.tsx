import AddNewTaskModal from "@/components/Modals/AddNewTaskModal/AddNewTaskModal";
import TodoItem from "@/components/TodoItem/TodoItem";

export default function Home() {
  return (
    <div className="px-20">
      <h1 className="mb-5 text-2xl font-semibold">Today</h1>
      <AddNewTaskModal />
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </div>
  );
}
