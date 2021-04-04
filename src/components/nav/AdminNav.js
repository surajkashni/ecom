import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
  <nav className="">
    <ul className=" navbar-nav flex-column">
      <li className="nav-item m-1  " >
        <Link to="/admin/dashboard" className="nav-link btn btn-outlined-primary btn-lg btn-block btn-raised" style={{ textDecoration: 'none' }}>
          Dashboard
        </Link>
      </li>

      <li className="nav-item m-1">
        <Link to="/admin/product" className="nav-link btn btn-outlined-primary btn-lg btn-block btn-raised"  style={{ textDecoration: 'none' }}>
          Product
        </Link>
      </li>

      <li className="nav-item m-1">
        <Link to="/admin/products" className="nav-link btn btn-outlined-primary btn-lg btn-block btn-raised"  style={{ textDecoration: 'none' }}>
          Products
        </Link>
      </li>

      <li className="nav-item m-1">
        <Link to="/admin/category" className="nav-link btn btn-outlined-primary btn-lg btn-block btn-raised"  style={{ textDecoration: 'none' }}>
          Category
        </Link>
      </li>

      <li className="nav-item m-1">
        <Link to="/admin/sub" className="nav-link btn btn-outlined-primary btn-lg btn-block btn-raised" style={{ textDecoration: 'none' }}>
          Sub Category
        </Link>
      </li>

      <li className="nav-item m-1">
        <Link to="/admin/coupon" className="nav-link btn btn-outlined-primary btn-lg btn-block btn-raised" style={{ textDecoration: 'none' }}>
          Coupon
        </Link>
      </li>

      
      <li className="nav-item m-1">
        <Link to="/user/password" className="nav-link btn btn-outlined-primary btn-lg btn-block btn-raised" style={{ textDecoration: 'none' }}>
          Password
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
