import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { Link } from "react-router-dom";

import { auth, db } from "../firebase";
import "../styles/pages/Profile.css";

export default function Profile() {
    const user = auth.currentUser;

    const [displayName, setDisplayName] = useState(
        user?.displayName || ""
    );

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [articles, setArticles] = useState([]);
    const [articlesLoading, setArticlesLoading] = useState(true);

    /* Load user's articles */

    useEffect(() => {
        const loadArticles = async () => {
            if (!user) {
                setArticlesLoading(false);
                return;
            }

            try {
                const articlesQuery = query(
                    collection(db, "articles"),
                    where("authorId", "==", user.uid)
                );

                const snapshot = await getDocs(articlesQuery);

                const userArticles = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                /* Newest articles first */

                userArticles.sort((a, b) => {
                    const aTime = a.updatedAt?.toMillis?.() || 0;
                    const bTime = b.updatedAt?.toMillis?.() || 0;

                    return bTime - aTime;
                });

                setArticles(userArticles);
            } catch (error) {
                console.error("Error loading articles:", error);
            } finally {
                setArticlesLoading(false);
            }
        };

        loadArticles();
    }, [user]);

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

    /* Format article date */

    const formatDate = (timestamp) => {
        if (!timestamp?.toDate) {
            return "Recently updated";
        }

        return `Updated ${timestamp.toDate().toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        )}`;
    };

    /* Get readable status */

    const getStatusLabel = (status) => {
        switch (status) {
            case "published":
                return "Published";

            case "pending":
                return "Pending Review";

            case "drafting":
                return "Drafting";

            case "rejected":
                return "Changes Requested";

            default:
                return "Drafting";
        }
    };

    /* Get status CSS class */

    const getStatusClass = (status) => {
        switch (status) {
            case "published":
                return "status-published";

            case "pending":
                return "status-pending";

            case "rejected":
                return "status-review";

            case "drafting":
            default:
                return "status-drafting";
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

                        {articlesLoading ? (
                            <div className="my-articles-empty">
                                Loading your articles...
                            </div>
                        ) : articles.length === 0 ? (
                            <div className="my-articles-empty">
                                <h3>
                                    No articles yet.
                                </h3>

                                <p>
                                    Start writing your first story.
                                </p>

                                <Link
                                    to="/articles/new"
                                    className="profile-add-button"
                                >
                                    + Add New
                                </Link>
                            </div>
                        ) : (
                            articles.map((article) => (
                                <div
                                    className="my-article-row"
                                    key={article.id}
                                >
                                    <div className="my-article-info">
                                        <h3>
                                            {article.title}
                                        </h3>

                                        <span>
                                            {formatDate(
                                                article.updatedAt ||
                                                article.createdAt
                                            )}
                                        </span>
                                    </div>

                                    <div className="my-article-actions">

                                        <span
                                            className={`article-status ${getStatusClass(
                                                article.status
                                            )}`}
                                        >
                                            {getStatusLabel(
                                                article.status
                                            )}
                                        </span>

                                        {["drafting", "rejected"].includes(article.status) && (
                                            <Link
                                                to={`/articles/${article.id}/edit`}
                                                className="my-article-edit"
                                            >
                                                {article.status === "rejected"
                                                    ? "Revise Article"
                                                    : "Edit"}
                                            </Link>
                                        )}

                                    </div>
                                </div>
                            ))
                        )}

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