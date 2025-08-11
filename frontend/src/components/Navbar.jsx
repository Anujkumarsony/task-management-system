import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="nav">
      <div className="nav-left">
        <Link to="/">TaskManager</Link>
      </div>
      <div className="nav-right">
        {user && (
          <>
            <span>
              {user.name} ({user.role})
            </span>
            {user.role === "Admin" && (
              <Link to="/users" style={{ marginLeft: 12 }}>
                Users
              </Link>
            )}
            <button onClick={logout} style={{ marginLeft: 12 }}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
