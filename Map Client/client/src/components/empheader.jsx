import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-emerald-600">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-white text-3xl p-5">Map Clone</h1>
        <ul className="flex gap-4">
          <Link to="/signIn" className="text-white text-xl">
            <li>Sign Out</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
