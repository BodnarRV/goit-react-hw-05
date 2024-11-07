import React from "react";
import s from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <header className={s.header}>
      <nav className={s.navigation}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? s.active : s.link)}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? s.active : s.link)}
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
