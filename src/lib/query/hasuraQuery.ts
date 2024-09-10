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