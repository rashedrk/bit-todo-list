import AddNewTask from "@/components/Today/AddNewTask/AddNewTask";
import TodoItem from "@/components/TodoItem/TodoItem";

export default function Home() {
  return (
    <div className="px-20">
    <AddNewTask/>
    <TodoItem/>
    <TodoItem/>
    <TodoItem/>
    </div>
  )
}
