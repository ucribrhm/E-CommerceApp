import React from "react";
import { Link ,Outlet} from "react-router";
import "./style.css";
function Admin() {
  return (
    <div>
      <nav >
        <ul className="adminmenu">
          <li>
            <Link to="/admin">Home</Link>
          </li>
          <li>
            <Link to="/admin/orders">orders</Link>
          </li>
          <li>
            <Link to="/admin/products">products</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Admin;
