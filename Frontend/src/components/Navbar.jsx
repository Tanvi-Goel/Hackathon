import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">SkillProof</div>
      <div className="nav-links">
        <NavLink to="/upload">Upload</NavLink>
        <NavLink to="/skills">Skills</NavLink>
        <NavLink to="/challenge">Challenge</NavLink>
        <NavLink to="/evaluation">Evaluation</NavLink>
        <NavLink to="/proof">Proof</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
