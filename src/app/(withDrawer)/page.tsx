import AddNewTaskModal from "@/components/Modals/AddNewTaskModal/AddNewTaskModal";
import TodoItem from "@/components/TodoItem/TodoItem";
import { fetchGraphQL } from "@/lib/query/graphqlClient";
import { getTasksQuery } from "@/lib/query/hasuraQuery";
import { TTask } from "@/types/global.type";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  // console.log('session: ' , session);

  const data = await fetchGraphQL(getTasksQuery(session?.user?.id as string));

  
  
  return (
    <div className="px-20">
      <h1 className="mb-5 text-2xl font-semibold">Today</h1>
      <AddNewTaskModal />
      {
        data?.task?.map((item: TTask) => <TodoItem key={item.task_id} task={item} />)
      }
    </div>
  );
}
