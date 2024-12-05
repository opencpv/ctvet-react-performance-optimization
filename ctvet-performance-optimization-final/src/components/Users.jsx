import React, { useState, useEffect } from 'react';
function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    async function fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }
  
    if (loading) return <div className="loading">Loading users...</div>;
  
    return (
      <div className="grid">
        {users.map(user => (
          <div key={user.id} className="card">
            <img src={`https://robohash.org/${user.id}?set=set2`} alt={`${user.name}'s profile`} className="profile-image" />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.company.name}</p>
          </div>
        ))}
      </div>
    );
  }
  
export default Users;