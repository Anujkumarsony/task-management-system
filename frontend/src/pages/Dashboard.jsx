import React, { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const load = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const loadUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {}
  };

  useEffect(() => {
    load();
    loadUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>
          Welcome, {user?.name} ({user?.role})
        </h2>
        {(user.role === "Admin" || user.role === "Manager") && (
          <TaskForm users={users} onCreated={load} />
        )}
        <TaskList tasks={tasks} onUpdated={load} currentUser={user} />
      </div>
    </>
  );
}
