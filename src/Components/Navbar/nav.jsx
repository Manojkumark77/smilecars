import React from "react";
import "./nav.css"
import carlogo from "../../Images/smilcars-logo.png"
import {Link} from "react-router-dom";

const Navigations = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img src={carlogo} alt="RentCars Logo" />
      </div>
      <nav className="navbar-links">
        <Link to="/" className="link">Home</Link>
        <Link to="/offers" className="link">Offers</Link>
        <Link to="/aboutus" className="link">About Us</Link>
        <Link to="/cars" className="link">Pick Your Wheels</Link>
        <Link to="/contact" className="link">Contact Us</Link>
      </nav>
      <div className="navbar-auth">
        <Link to="/signin" className="link">Sign in</Link>
        <button className="signup-button">Sign up</button>
      </div>
    </header>
  );
};

export default Navigations;