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
      user_id: { _eq: "${userId}" },isdeleted: {_eq: false}}, order_by: {created_at: asc}) {
      category
      created_at
      deleted_at
      description
      due_date
      priority
      updated_at
      isdeleted
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
      task_id: { _eq: ${id} }, isdeleted: {_eq: false}
    }) {
      category
      created_at
      deleted_at
      description
      due_date
      priority
      updated_at
      isdeleted
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
      description: "${task.description}",
      due_date: "${task.due_date}",
      user_id: ${task.user_id},
      priority: ${task.priority},
      category: "${task.category}"
    }) {
      task_id
      title
      description
      due_date
      category
      priority
      user_id
      status
    }
  }
`;
export const deleteTaskQuery = (id: number) => `
  mutation DeleteTask {
  update_task_by_pk(pk_columns: {task_id: ${id}}, _set: {isdeleted: true}) {
    task_id
    title
    isdeleted
  }
}
`;
export const updateTaskQuery = (id: number, task: Partial<TTask>) => `
  mutation UpdateTask {
  update_task_by_pk(pk_columns: {task_id: ${id}}, _set: {category: "${task.category}", description: "${task.description}", due_date: "${task.due_date}", priority: "${task.priority}", title:" ${task.title}"}) {
    task_id
    title
    isdeleted
    user_id
    category
    created_at
    deleted_at
    description
    due_date
    priority
    status
    updated_at
  }
}

`;

export const updateTaskStatusQuery = (id: number, status:string) => `
  mutation UpdateTaskStatus {
  update_task_by_pk(pk_columns: {task_id: ${id}}, _set: {status: ${status}}) {
    task_id
    title
    status
  }
}
`;