import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <svg
          width="240"
          height="55"
          viewBox="0 0 240 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
          onClick={() => navigate("/feed")}>
          <rect
            x="4"
            y="8"
            width="56"
            height="48"
            rx="8"
            fill="#020617"
            stroke="#22C55E"
            stroke-width="2"
          />

          <circle cx="14" cy="18" r="3" fill="#22C55E" />
          <circle cx="24" cy="18" r="3" fill="#22C55E" />
          <circle cx="34" cy="18" r="3" fill="#22C55E" />

          <text
            x="14"
            y="42"
            font-size="16"
            fill="#22C55E"
            font-family="monospace"
            font-weight="700">
            &gt;_
          </text>

          <text
            x="80"
            y="36"
            font-size="26"
            font-weight="700"
            fill="#E5E7EB"
            font-family="Inter, system-ui, sans-serif">
            Dev<tspan fill="#22C55E">Tinder</tspan>
          </text>

          <text
            x="80"
            y="54"
            font-size="12"
            fill="#94A3B8"
            font-family="Inter, system-ui, sans-serif">
            Connect. Build. Collaborate.
          </text>
        </svg>
      </div>
      {user && (
        <div className="flex gap-16">
          <div className="flex justify-center items-center">
            <ul className="flex gap-6 ">
              <li>
                <NavLink
                  to="/feed"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-indigo-600 text-white p-2 rounded-2xl transition-all duration-300"
                      : "text-gray-300 hover:text-white transition-all duration-300"
                  }>
                  Home{" "}
                </NavLink>
              </li>
              <li className="hover:text-blue-500 ">
                <NavLink
                  to="/connections"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-indigo-600 text-white p-2 rounded-2xl transition-all duration-300"
                      : "text-gray-300 hover:text-white transition-all duration-300"
                  }>
                  Connections
                </NavLink>
              </li>
              <li className="hover:text-blue-500 ">
                <NavLink
                  to={"/requests"}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-indigo-600 text-white p-2 rounded-2xl transition-all duration-300"
                      : "text-gray-300 hover:text-white transition-all duration-300"
                  }>
                  Requests
                </NavLink>
              </li>
              <li className="hover:text-blue-500">
                <NavLink
                  to="/premium"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-yellow-300 text-black p-2 font-bold rounded-2xl transition-all duration-300"
                      : "text-yellow-300 font-semibold  transition-all duration-300"
                  }>
                  Premium{" "}
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex gap-2">
            <p className="my-auto pr-2.5 font-semibold italic">
              Welcome, {user.firstName.toUpperCase()}{" "}
            </p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mr-6">
                <div className="w-10 rounded-full bg-white">
                  <img alt="userPhoto" src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-gray-900  rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>

                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
