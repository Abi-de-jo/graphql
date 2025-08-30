import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import CreateUser from "./CreateUser";

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

interface UsersData {
  allUsers: User[];
}

interface UserData {
  user: User;
}

const GET_ALL_USERS = gql`
  query {
    allUsers {
      id
      name
      email
      age
    }
  }
`;

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
    
      name
      email
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery<UsersData>(GET_ALL_USERS, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {data?.allUsers.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}) - {user.age}
          </li>
        ))}
      </ul>

      <br />
      <CreateUser />
    </div>
  );
}

export default App;
