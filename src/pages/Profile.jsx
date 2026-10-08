import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";

import { auth } from "../firebase";
import "../styles/pages/Profile.css";

export default function Profile() {
    const user = auth.currentUser;

    const [displayName, setDisplayName] = useState(
        user?.displayName || ""
    );

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    /* Update profile */

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            await updateProfile(user, {
                displayName: displayName.trim(),
            });

            setMessage("Profile updated successfully.");
        } catch (error) {
            console.error(error);
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <main className="profile-page">

            {/* Profile Header */}

            <section className="profile-header">
                <div className="profile-header-inner">

                    <span className="section-label">
                        Voices in BOLD / Profile
                    </span>

                    <h1>
                        Your
                        <em>profile.</em>
                    </h1>

                    <p>
                        Manage your profile, articles, and saved stories.
                    </p>

                </div>
            </section>


            {/* Profile Information */}

            <section className="profile-section">

                <div className="profile-card">

                    <div className="profile-avatar-section">

                        {user.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt=""
                                className="profile-avatar"
                            />
                        ) : (
                            <div className="profile-avatar profile-avatar-fallback">
                                {user.email?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )}

                        <div>
                            <h2>
                                {user.displayName || "Your Account"}
                            </h2>

                            <p>{user.email}</p>
                        </div>

                    </div>


                    {/* Profile Form */}

                    <form
                        className="profile-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="profile-field">

                            <label htmlFor="displayName">
                                Display Name
                            </label>

                            <input
                                id="displayName"
                                type="text"
                                value={displayName}
                                onChange={(e) =>
                                    setDisplayName(e.target.value)
                                }
                                placeholder="Your name"
                            />

                        </div>


                        <div className="profile-field">

                            <label htmlFor="profileEmail">
                                Email
                            </label>

                            <input
                                id="profileEmail"
                                type="email"
                                value={user.email || ""}
                                disabled
                            />

                        </div>


                        {message && (
                            <p className="profile-message">
                                {message}
                            </p>
                        )}


                        <button
                            type="submit"
                            className="profile-save"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save changes"}
                        </button>

                    </form>

                </div>


                {/* My Articles */}

                <section className="profile-content-section">

                    <div className="profile-section-heading">

                        <div>
                            <span className="profile-section-label">
                                Your writing
                            </span>

                            <h2>My Articles</h2>
                        </div>

                        <Link
                            to="/articles/new"
                            className="profile-add-button"
                        >
                            + Add New
                        </Link>

                    </div>


                    <div className="my-articles-list">

                        {/* Temporary example articles */}

                        <div className="my-article-row">

                            <div className="my-article-info">
                                <h3>The Power of Student Voices</h3>
                                <span>Updated Oct. 4, 2026</span>
                            </div>

                            <span className="article-status status-published">
                                Published
                            </span>

                        </div>


                        <div className="my-article-row">

                            <div className="my-article-info">
                                <h3>Why Student Perspectives Matter</h3>
                                <span>Updated Oct. 5, 2026</span>
                            </div>

                            <span className="article-status status-review">
                                Under Review
                            </span>

                        </div>


                        <div className="my-article-row">

                            <div className="my-article-info">
                                <h3>Student Voices in Action</h3>
                                <span>Submitted Oct. 7, 2026</span>
                            </div>

                            <span className="article-status status-pending">
                                Pending Review
                            </span>

                        </div>


                        <div className="my-article-row">

                            <div className="my-article-info">
                                <h3>My Campus Story</h3>
                                <span>Last edited Oct. 8, 2026</span>
                            </div>

                            <span className="article-status status-drafting">
                                Drafting
                            </span>

                        </div>

                    </div>

                </section>


                {/* Saved Articles */}

                <section className="profile-content-section">

                    <div className="profile-section-heading">

                        <div>
                            <span className="profile-section-label">
                                Your library
                            </span>

                            <h2>Saved Articles</h2>
                        </div>

                    </div>


                    <div className="saved-articles-empty">

                        <span className="saved-articles-icon">
                            ☆
                        </span>

                        <h3>
                            Nothing saved yet.
                        </h3>

                        <p>
                            Bookmark articles you want to come back to
                            and they'll appear here.
                        </p>

                        <Link
                            to="/articles"
                            className="saved-articles-button"
                        >
                            Browse articles
                            <span>↗</span>
                        </Link>

                    </div>

                </section>

            </section>

        </main>
    );
}