import React from "react";
import { Link } from "react-router-dom";

export default function Navigation({ isLoggedIn }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>

        {isLoggedIn && (
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
