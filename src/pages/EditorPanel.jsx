import { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { Link } from "react-router-dom";

import { auth, db } from "../firebase";
import "../styles/pages/EditorPanel.css";

export default function EditorPanel() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /* Load pending submissions */

    useEffect(() => {
        const loadPendingArticles = async () => {
            try {
                const pendingQuery = query(
                    collection(db, "articles"),
                    where("status", "==", "pending")
                );

                const snapshot = await getDocs(pendingQuery);

                const pendingArticles = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                pendingArticles.sort((a, b) => {
                    const aTime =
                        a.updatedAt?.toMillis?.() ||
                        a.createdAt?.toMillis?.() ||
                        0;

                    const bTime =
                        b.updatedAt?.toMillis?.() ||
                        b.createdAt?.toMillis?.() ||
                        0;

                    return bTime - aTime;
                });

                setArticles(pendingArticles);
            } catch (error) {
                console.error(error);

                setError(
                    "You don't have permission to access the editor panel."
                );
            } finally {
                setLoading(false);
            }
        };

        if (auth.currentUser) {
            loadPendingArticles();
        } else {
            setError("You must be logged in to access the editor panel.");
            setLoading(false);
        }
    }, []);

    /* Format dates */

    const formatDate = (timestamp) => {
        if (!timestamp?.toDate) {
            return "Recently submitted";
        }

        return timestamp.toDate().toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        );
    };

    if (loading) {
        return (
            <main className="editor-page">
                <section className="editor-section">
                    <p>Loading submissions...</p>
                </section>
            </main>
        );
    }

    if (error) {
        return (
            <main className="editor-page">
                <section className="editor-section">
                    <div className="editor-error">
                        {error}
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="editor-page">

            {/* Header */}

            <section className="editor-header">
                <div className="editor-header-inner">
                    <span className="section-label">
                        Voices in BOLD / Editorial
                    </span>

                    <h1>
                        Editor
                        <em>panel.</em>
                    </h1>

                    <p>
                        Review student submissions and decide what
                        gets published.
                    </p>
                </div>
            </section>


            {/* Submissions */}

            <section className="editor-section">

                <div className="editor-section-heading">
                    <div>
                        <span className="profile-section-label">
                            Editorial queue
                        </span>

                        <h2>
                            Pending Review
                        </h2>
                    </div>

                    <span className="editor-count">
                        {articles.length}{" "}
                        {articles.length === 1
                            ? "submission"
                            : "submissions"}
                    </span>
                </div>


                {articles.length === 0 ? (
                    <div className="editor-empty">
                        <h3>
                            Nothing waiting for review.
                        </h3>

                        <p>
                            New submissions will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="editor-list">

                        {articles.map((article) => (
                            <div
                                className="editor-row"
                                key={article.id}
                            >

                                <div className="editor-row-info">

                                    <span className="editor-category">
                                        {article.category}
                                    </span>

                                    <h3>
                                        {article.title}
                                    </h3>

                                    <p>
                                        By {article.author || "Unknown author"}
                                        {" · "}
                                        Submitted{" "}
                                        {formatDate(
                                            article.updatedAt ||
                                            article.createdAt
                                        )}
                                    </p>

                                </div>

                                <Link
                                    to={`/editor/articles/${article.id}`}
                                    className="editor-review-button"
                                >
                                    Review
                                    <span>↗</span>
                                </Link>

                            </div>
                        ))}

                    </div>
                )}

            </section>

        </main>
    );
}