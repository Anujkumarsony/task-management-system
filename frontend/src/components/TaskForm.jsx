import React, { useState } from "react";
import API from "../services/api";

export default function TaskForm({ users = [], onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", {
        title,
        description,
        assignedTo: assignedTo || undefined,
      });
      setTitle("");
      setDescription("");
      setAssignedTo("");
      onCreated();
    } catch (err) {
      console.error(err);
      alert("Could not create task");
    }
  };

  return (
    <form onSubmit={submit} className="card small">
      <h3>Create Task</h3>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      >
        <option value="">-- Assign (optional) --</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name} ({u.role})
          </option>
        ))}
      </select>
      <button type="submit">Create</button>
    </form>
  );
}
