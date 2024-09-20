import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext);

  // Log user object to check if it's being passed
  useEffect(() => {
    console.log("User object: ", user);
  }, [user]);

  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
        console.log("Logout successful");
      })
      .catch((error) => {
        // An error occurred during logout.
        console.error("Logout failed: ", error);
      });
  };

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
            aria-label="Open Profile Menu"
          >
            <div className="w-10 rounded-full">
              {user?.photoURL ? (
                <img alt="User Profile" src={user.photoURL} />
              ) : (
                <img
                  alt="Default User Avatar"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="Close Sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to="/update-profile">Profile</Link>
            </li>
            <li>
              <Link to="/dashboard"> Dashboard</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <button onClick={handleLogout} aria-label="Logout">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
