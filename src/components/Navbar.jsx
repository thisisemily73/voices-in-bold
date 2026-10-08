import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import "../styles/components/Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Voices in BOLD"
            className="navbar-logo"
          />
        </Link>

        <nav className="navbar-links" aria-label="Main navigation">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/articles" className="nav-link">
            Articles
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>
        </nav>

        <div className="navbar-account">
          <Link to="/login" className="login-link">
            Log in
          </Link>
          <Link to="/signup" className="signup-button">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}