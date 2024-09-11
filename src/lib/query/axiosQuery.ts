import axios from 'axios';

const axiosQuery = async (token: string, query: any): Promise<any> => {

    try {
        const res = await axios.post(
            "https://more-tapir-46.hasura.app/v1/graphql",
            {query},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            // Axios error
            if (error.response) {
                throw new Error(
                    `Error: ${error.response.data.error}, Status code: ${error.response.status}`
                );
            } else if (error.request) {
                // The request was made but no response was received
                throw new Error('Error: No response received from the server');
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new Error(`Error: ${error.message}`);
            }
        } else {
            // Non-Axios error
            throw new Error(`Error: ${error.message}`);
        }
    }
};

export default axiosQuery;

