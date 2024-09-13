import { TTask } from "@/types/global.type";

// Login query
export const loginQuery = {
  query: `
          query GetUsers {
            users {
                user_id
                email
                password
                    }
                        }`,
};

export const getTasksQuery = (userId: string) => `
  query GetTasks {
    task(where: {
      user_id: { _eq: "${userId}" },}, order_by: {created_at: desc}) {
      category
      created_at
      
      description
      due_date
      priority
      updated_at
      
      status
      task_id
      title
      user_id
    }
  }
`;
export const getTodayTasksQuery = (userId: string, today: string) => `
  query GetTasks {
    task(where: {
      user_id: { _eq: "${userId}" }, due_date: {_eq: "${today}"}}, order_by: {due_date: asc}) {
      category
      created_at
      
      description
      due_date
      priority
      updated_at
      
      status
      task_id
      title
      user_id
    }
  }
`;
export const getTasksByIdQuery = (id: number) => `
  query GetTaskById {
    task(where: {
      task_id: { _eq: ${id} }, 
    }) {
       category
      created_at
      
      description
      due_date
      priority
      updated_at
      
      status
      task_id
      title
      user_id
    }
  }
`;
export const addTasksQuery = (task: any) => `
  mutation AddTasks {
    insert_task_one(object: {
      title: "${task.title}",
      description: "${task.description.replace(/"/g, '\\"').replace(/\n/g, '\\n')}",
      due_date: "${task.due_date}",
      user_id: ${task.user_id},
      priority: ${task.priority},
      category: "${task.category}"
    }) {
       category
      created_at
      
      description
      due_date
      priority
      updated_at
      
      status
      task_id
      title
      user_id
    }
  }
`;
export const deleteTaskQuery = (id: number) => `
  mutation DeleteTask {
  delete_task_by_pk(task_id: ${id}) {
    task_id
    title
    
  }
}
`;
export const updateTaskQuery = (id: number, task: Partial<TTask>) => `
  mutation UpdateTask {
  update_task_by_pk(pk_columns: {task_id: ${id}}, _set: {category: "${task.category}", description: "${task.description}", due_date: "${task.due_date}", priority: "${task.priority}", title:" ${task.title}"}) {
    task_id
    title
    
    user_id
    category
    created_at
    
    description
    due_date
    priority
    status
    updated_at
  }
}

`;

export const updateTaskStatusQuery = (id: number, status: string) => `
  mutation UpdateTaskStatus {
  update_task_by_pk(pk_columns: {task_id: ${id}}, _set: {status: ${status}}) {
    task_id
    title
    status
  }
}
`;

export const getDeletedTasksQuery = (userId: string) => `
  query GetDeletedTasks {
  trash_task(order_by: {due_date: desc}, where: {user_id: {_eq: ${userId}}}) {
    category
    created_at
    description
    deleted_at
    due_date
    priority
    status
    task_id
    title
    updated_at
    user_id
  }
}
`;

export const permanentDeleteTaskQuery = (id: number) => `
  mutation PermanentDeleteTask {
  delete_trash_task_by_pk(task_id: ${id}) {
    task_id
    title
    
  }
}
`;