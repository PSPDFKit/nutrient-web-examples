import React from "react";
import { NavLink } from "react-router-dom";

const Menu = ({ documents }) => (
  <ul>
    {documents.map((doc) => (
      <li key={doc} className="menuItem">
        <NavLink
          to={`/${encodeURIComponent(doc)}`}
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          {doc}
        </NavLink>
      </li>
    ))}
  </ul>
);

export { Menu };
