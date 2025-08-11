import React from "react";
import API from "../services/api";

export default function TaskList({ tasks = [], onUpdated, currentUser }) {
  const changeStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      onUpdated();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };
  const removeTask = async (id) => {
    if (!confirm("Delete task?")) return;
    try {
      await API.delete(`/tasks/${id}`);
      onUpdated();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h3>Tasks</h3>
      {tasks.length === 0 && <p>No tasks</p>}
      {tasks.map((t) => (
        <div key={t._id} className="task">
          <div>
            <h4>{t.title}</h4>
            <p>{t.description}</p>
            <p>
              Assigned: {t.assignedTo?.name || "—"} | Created by:{" "}
              {t.createdBy?.name || "—"}
            </p>
            <p>
              Status: <strong>{t.status}</strong>
            </p>
          </div>
          <div className="task-actions">
            {(currentUser?.role === "Admin" ||
              currentUser?.role === "Manager" ||
              String(t.assignedTo?._id) === String(currentUser?._id)) && (
              <>
                <button onClick={() => changeStatus(t._id, "Todo")}>
                  Todo
                </button>
                <button onClick={() => changeStatus(t._id, "InProgress")}>
                  InProg
                </button>
                <button onClick={() => changeStatus(t._id, "Done")}>
                  Done
                </button>
              </>
            )}
            {currentUser?.role === "Admin" && (
              <button onClick={() => removeTask(t._id)}>Delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
