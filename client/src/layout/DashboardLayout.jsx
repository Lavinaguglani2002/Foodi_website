import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import { FaEdit, FaLocationArrow, FaPlusCircle, FaQuestionCircle, FaRegUser, FaShoppingBag, FaUser } from "react-icons/fa";
import logo from "/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import Login from "../components/Login";
import { AuthContext } from "../contexts/AuthProvider";

// Shared navigation links component
const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <MdDashboard /> Home
      </Link>
    </li>
    <li>
      <Link to="/menu"><FaCartShopping /> Menu</Link>
    </li>
    <li>
      <Link to="/orders"><FaLocationArrow /> Orders Tracking</Link>
    </li>
    <li>
      <Link to="/support"><FaQuestionCircle /> Customer Support</Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const { loading, logoutUser } = useContext(AuthContext);

  // Handle Logout
  const handleLogout = () => {
    logoutUser().then(() => {
      // Redirect or additional actions after logout
    });
  };

  return (
    <div>
      {!loading ? (
        <div className="drawer sm:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
            {/* Page content here */}
            <div className="flex items-center justify-between mx-4">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden"
                aria-label="Toggle sidebar"
              >
                <MdDashboardCustomize />
              </label>
              <button onClick={handleLogout} className="btn rounded-full px-6 bg-green flex items-center gap-2 text-white sm:hidden">
                <FaRegUser /> Logout
              </button>
            </div>
            <div className="mt-5 md:mt-2 mx-4">
              <Outlet />
            </div>
          </div>

          <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <Link to="/dashboard" className="flex justify-start mb-3">
                  <img src={logo} alt="Logo" className="w-20" />
                  <span className="badge badge-primary">admin</span>
                </Link>
              </li>
              <hr />
              <li className="mt-3">
                <Link to="/dashboard">
                  <MdDashboard /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-bookings">
                  <FaShoppingBag /> Manage Bookings
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-menu">
                  <FaPlusCircle /> Add Menu
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-items">
                  <FaEdit /> Manage Items
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/dashboard/users">
                  <FaUser /> All Users
                </Link>
              </li>

              <hr />
              {/* Shared navigation links */}
              {sharedLinks}
            </ul>
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <Link to="/">
            <button className="btn bg-green text-white">Back to Home</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
