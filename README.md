# To-Do List with Authentication

This project is a feature-rich to-do list application with user authentication built using modern web technologies. It allows users to register, log in, and manage their tasks efficiently. The application includes essential features for task management and advanced functionalities for an enhanced user experience


### Live URL

The application is host in Vercel 
 [Live Server](https://bit-todo-list.vercel.app/).


## Technology Stack

- **Programming Language:** TypeScript
- **Frontend:** Next.js, Tailwind CSS, Daisy UI
- **Backend** Hasura (GraphQL Engine)
- **Database:** PostgreSQL

## Features
- To-Do Management (Add, Edit, Delete, Mark, Categorize)
- Email Notifications for Completed Tasks
- Trash Folder with Temporary Storage and Permanent Deletion
- AI-Based Task Detail Suggestions

## Getting Started

To set up the project locally, follow these steps:

1. **Clone the Repository:**


```bash
git clone https://github.com/rashedrk/bit-todo-list.git
```

2. **Install dependencies**
```bash
cd bit-todo-list
npm install

```

2. **Setup Environment Variables**
Create a .env file and add variables
```bash
NEXTAUTH_URL=http://localhost:3000/
NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT=your hasura project url
HASURA_ADMIN_SECRET=your hasura admin secret
NEXTAUTH_SECRET=your secret key (base64)
SALT_ROUNDS=your salt round number (bcrypt)
GOOGLE_GENERATIVE_AI_API_KEY=you google generative ai api key

```

4. **Run the Application**
```bash
npm run dev
```

5. **Access the Application:**
Open your web browser and navigate to `http://localhost:3000` to access the application.

### Demo Account
**Email:** alice@example.com
**Password:** password123


## Feedback and Contributions

We welcome your feedback and contributions to enhance the Todo List App. Feel free to open issues, submit pull requests, or reach out to us with your suggestions.

## License

This project is licensed under the [MIT License](LICENSE).

