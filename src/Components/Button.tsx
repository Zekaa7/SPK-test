"use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface ButtonProps {
  href2: string;
  onClick?: () => void;
}

function Button({ href2, onClick }: ButtonProps) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mt-6 flex justify-between">
        <div className="flex space-x-4">
          <Link
            to={"/"}
            className="bg-red-700 text-black py-2 px-4 rounded  hover:bg-red-400 mr-10"
          >
            Prekini
          </Link>
          <button
            className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
            onClick={() => navigate(-1)}
          >
            Nazad
          </button>
        </div>

        <Link
          to={href2}
          onClick={onClick}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Potvrdi
        </Link>
      </div>
    </div>
  );
}

export default Button;
