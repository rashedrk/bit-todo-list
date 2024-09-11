import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export const fetchGraphQL = async (query: string) => {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      throw new Error('No access token found');
    }
  
    const token = session.accessToken as string;

    const response = await fetch(process.env.HASURA_PROJECT_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });
  
    const { data, errors } = await response.json();
  
    if (errors) {
        console.log(errors);
        
      throw new Error(errors.map((error: any) => error.message).join(', '));
    }
  
    return data;
  };
  