
const users = [
    { id: "1", name: "John", email: "john@example.com", age: 30 },
    { id: "2", name: "Jane", email: "jane@example.com", age: 25 },
    { id: "3", name: "Bob", email: "bob@example.com", age: 40 },
];


export const resolvers = {
    Query: {
      allUsers: () => users,
      getUser: (parent, { id }) => users.find(u => u.id === id),
    },
  
    Mutation: {
      createUser: (parent, { name, email, age }) => {
        const newUser = {
          id: users.length + 1,
          name,
          email,
          age,
        };
        users.push(newUser);
        return newUser;
      },
  
      updateUser: (parent, { id, name, email, age }) => {
        const user = users.find(u => u.id === id);
        if (!user) return null; 
  
         if (name !== undefined) user.name = name;
        if (email !== undefined) user.email = email;
        if (age !== undefined) user.age = age;
  
        return user;
      },
  
      deleteUser: (parent, { id }) => {
        const index = users.findIndex(u => u.id === id);
        if (index === -1) return false;
  
        users.splice(index, 1);
        return true;
      },
    },
  };