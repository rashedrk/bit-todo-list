
import AddNewTaskModal from "@/components/Modals/AddNewTaskModal/AddNewTaskModal";
import TodoItem from "@/components/TodoItem/TodoItem";

export default function Home() {
  return (
    <div className="px-20">
    <AddNewTaskModal/>
    <TodoItem/>
    <TodoItem/>
    <TodoItem/>
    </div>
  )
}
