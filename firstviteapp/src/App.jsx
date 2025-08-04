import React, { useState, useEffect, useContext, createContext } from 'react';

// ✅ Context
const UserContext = createContext();

function UserList({ showActive }) {
  const [users, setUsers] = useState([]);
  const { name } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = users
    .filter(user => (showActive ? user.id % 2 === 0 : true))
    .map(user => ({
      ...user,
      name: user.name.toUpperCase(),
    }));

  return (
    <div>
      <h2>Hello, {name}!</h2>
      <h3>User List:</h3>
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}s

export default function App() {
  const [showActive, setShowActive] = useState(false);
  const userContextValue = { name: 'Chiranth' };

  return (
    <UserContext.Provider value={userContextValue}>
      <h1>React Feature Demo</h1>
      <button onClick={() => setShowActive(prev => !prev)}>
        Toggle Active Users
      </button>
      <UserList showActive={showActive} />
    </UserContext.Provider>
  );
}
