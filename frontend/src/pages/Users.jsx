import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const load = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Could not load users");
    }
  };
  const changeRole = async (id, role) => {
    try {
      await API.put(`/users/${id}/role`, { role });
      load();
    } catch (err) {
      console.error(err);
      alert("Could not update role");
    }
  };

  useEffect(() => {
    load();
  }, []);
  return (
    <div className="container">
      <h2>Users</h2>
      {users.map((u) => (
        <div key={u._id} className="task">
          <div>
            <strong>{u.name}</strong> — {u.email}
            <p>Role: {u.role}</p>
          </div>
          <div>
            <select
              value={u.role}
              onChange={(e) => changeRole(u._id, e.target.value)}
            >
              <option>Admin</option>
              <option>Manager</option>
              <option>User</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
