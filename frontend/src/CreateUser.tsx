import { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $age: Int) {
    createUser(name: $name, email: $email, age: $age) {
      id
      name
      email
    }
  }
`;

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({ variables: { name, email, age: Number(age) } });
    setName("");
    setEmail("");
    setAge("");
    alert("User created!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create User</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAge(e.target.value)}
      />
      <button type="submit">Add User</button>
    </form>
  );
}

export default CreateUser;
