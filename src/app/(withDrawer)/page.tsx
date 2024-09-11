import AddNewTaskModal from "@/components/Modals/AddNewTaskModal/AddNewTaskModal";
import TodoItem from "@/components/TodoItem/TodoItem";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log('session: ' , session);
  
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
