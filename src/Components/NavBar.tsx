"use client";
import React from "react";
import { useUserContext } from "../Context/user";
import { Link, useNavigate } from "react-router-dom";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

function NavBar() {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  // console.log("useNav", user);

  const logOutFunction = () => {
    logout();

    localStorage.clear();

    navigate("/login");
  };

  return (
    <nav className="flex justify-between p-4 shadow-md z-50 mb-2">
      <Link
        className="text-2xl font-extrabold text-black cursor-pointer pl-6"
        to={"/"}
        style={{ textDecoration: "none" }}
      >
        Praćenje Kamiona
      </Link>

      <div className="flex items-center gap-4">
        <span className="font-medium text-black">Kapija br: {99}</span>
        <span className="font-medium text-black">Dobrodosli: {user?.name}</span>

        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full shadow-md hover:from-blue-500 hover:to-blue-700 transition-transform duration-300 hover:scale-105"
          >
            Uloguj se
          </button>
        ) : (
          <>
            <button
              onClick={logOutFunction}
              className="px-6 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full shadow-md hover:from-red-500 hover:to-red-700 transition-transform duration-300 hover:scale-105"
            >
              Izlaz
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
