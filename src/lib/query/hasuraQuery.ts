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
// due_date: { _eq: "${new Date().toISOString().split('T')[0]}" }
export const getTasksQuery = (userId: string) => `
  query GetTasks {
    task(where: {
      user_id: { _eq: "${userId}" }, 
    
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