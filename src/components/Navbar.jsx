import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../firebase";
import logo from "../assets/logo.svg";
import "./../styles/components/Navbar.css";

export default function Navbar({ user }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    /* Sign out */

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setMenuOpen(false);
            navigate("/");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <header className="navbar">
            <div className="navbar-inner">

                {/* Logo */}

                <Link to="/" className="navbar-brand">
                    <img
                        src={logo}
                        alt="Voices in BOLD"
                        className="navbar-logo"
                    />
                </Link>


                {/* Navigation */}

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


                {/* Account */}
                <div className="navbar-account">

                    {user ? (
                        <div className="profile-menu">

                            <button
                                type="button"
                                className="profile-button"
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-expanded={menuOpen}
                                aria-label="Open account menu"
                            >
                                <img
                                    src={user.photoURL}
                                    alt="Profile"
                                    className="profile-picture"
                                />
                            </button>

                            {menuOpen && (
                                <div className="profile-dropdown">

                                    <div className="profile-dropdown-header">
                                        <strong>
                                            {user.displayName || "Your Account"}
                                        </strong>

                                        <span>
                                            {user.email}
                                        </span>
                                    </div>

                                    <div className="profile-dropdown-divider" />

                                    <Link
                                        to="/settings"
                                        className="profile-dropdown-link"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Settings
                                    </Link>

                                    <Link
                                        to="/profile"
                                        className="profile-dropdown-link"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        My Profile
                                    </Link>

                                    <button
                                        type="button"
                                        className="profile-dropdown-signout"
                                        onClick={handleSignOut}
                                    >
                                        Sign Out
                                    </button>

                                </div>
                            )}

                        </div>
                    ) : (
                        <>
                            <Link to="/auth" className="login-link">
                                Log in
                            </Link>

                            <Link to="/auth" className="signup-button">
                                Sign up
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </header>
    );
}