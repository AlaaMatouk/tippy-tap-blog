import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); 
    } catch (err) {
      console.error("Error signing out ❌", err.message);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm rounded-full px-6 my-4 max-w-6xl mx-auto">
      {/* Logo */}
      <div className="flex-1">
        <NavLink to="/" className="btn btn-ghost text-xl">
          Tippy Tap
        </NavLink>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-4 items-center">
        {user ? (
          <>
            <NavLink className="link link-hover" to="/">
              Home
            </NavLink>
            <NavLink className="link link-hover" to="/my-posts">
              My Posts
            </NavLink>
            <NavLink className="link link-hover" to="/favorites">
              Favourite
            </NavLink>
            {/* <NavLink className="link link-hover" to="/profile">
              Profile
            </NavLink> */}

            {/* Logout Button */}
            <button
              style={{ background: "var(--primary)", color: "var(--gray)" }}
              onClick={handleLogout}
              className="btn btn-sm rounded-full  ml-2"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink className="btn btn-sm btn-outline rounded-full" to="/login">
            Login / Register
          </NavLink>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className="dropdown dropdown-end lg:hidden">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {user ? (
            <>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/my-posts">My Posts</NavLink>
              </li>
              <li>
                <NavLink to="/favorites">Favourite</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <button
                  style={{ background: "var(--primary)", color: "var(--gray)" }}
                  onClick={handleLogout}
                  className=" w-full text-left"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login">Login / Register</NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
