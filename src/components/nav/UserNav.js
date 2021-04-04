import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/user/history" className="nav-link nav-link btn btn-outlined-primary btn-lg btn-block btn-raised">
          History
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link nav-link btn btn-outlined-primary btn-lg btn-block btn-raised">
          Password
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/wishlist" className="nav-link nav-link btn btn-outlined-primary btn-lg btn-block btn-raised">
          Wishlist
        </Link>
      </li>
    </ul>
  </nav>
);

export default UserNav;
