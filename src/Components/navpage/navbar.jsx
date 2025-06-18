import React from "react";
import "./navbar.css";
import carlogo from "../../Images/smilcars-logo.png";
import { Link } from "react-router-dom";
import navLinks from "../../data/navbar.json";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img src={carlogo} alt="RentCars Logo" />
      </div>

      <nav className="navbar-links">
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path} className="link">
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="navbar-auth">
        <Link to="/signin" className="link">
          Sign in
        </Link>
        <button type="button" className="signup-button">
          Sign up
        </button>
      </div>
    </header>
  );
};

export default Navbar;
