import React from "react";
import { Link } from "react-router-dom";

export default function Navigation({ isLoggedIn, currentUser }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>

        {isLoggedIn && (
          <li>
            <Link to='/profile'>
              {currentUser.displayName || currentUser.email} Profile
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
