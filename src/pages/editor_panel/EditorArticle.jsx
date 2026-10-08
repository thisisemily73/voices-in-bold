import { useEffect, useState } from "react";
import {
    doc,
    getDoc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";

import { auth, db } from "../../firebase";
import "../../styles/pages/EditorArticle.css";

export default function EditorArticle() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [action, setAction] = useState("");
    const [error, setError] = useState("");

    const [feedback, setFeedback] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);

    /* Load article */

    useEffect(() => {
        const loadArticle = async () => {
            if (!auth.currentUser) {
                setError("You must be logged in.");
                setLoading(false);
                return;
            }

            try {
                const articleRef = doc(db, "articles", id);
                const snapshot = await getDoc(articleRef);

                if (!snapshot.exists()) {
                    setError("This article could not be found.");
                    setLoading(false);
                    return;
                }

                const data = snapshot.data();

                if (data.status !== "pending") {
                    setError(
                        "This article is not currently waiting for review."
                    );
                    setLoading(false);
                    return;
                }

                setArticle({
                    id: snapshot.id,
                    ...data,
                });
            } catch (error) {
                console.error(error);

                setError(
                    "We couldn't load this submission."
                );
            } finally {
                setLoading(false);
            }
        };

        loadArticle();
    }, [id]);

    /* Publish article */

    const handlePublish = async () => {
        if (!article) return;

        setError("");
        setAction("publishing");

        try {
            const articleRef = doc(
                db,
                "articles",
                article.id
            );

            await updateDoc(articleRef, {
                status: "published",
                publishedAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            navigate("/editor");
        } catch (error) {
            console.error(error);

            setError(
                "We couldn't publish this article. Please try again."
            );
        } finally {
            setAction("");
        }
    };

    /* Request changes */

    const handleRequestChanges = async () => {
        if (!article) return;

        if (!feedback.trim()) {
            setError(
                "Please add feedback before requesting changes."
            );
            return;
        }

        setError("");
        setAction("requesting");

        try {
            const articleRef = doc(
                db,
                "articles",
                article.id
            );

            await updateDoc(articleRef, {
                status: "rejected",
                editorFeedback: feedback.trim(),
                updatedAt: serverTimestamp(),
            });

            navigate("/editor");
        } catch (error) {
            console.error(error);

            setError(
                "We couldn't send the feedback. Please try again."
            );
        } finally {
            setAction("");
        }
    };

    /* Format date */

    const formatDate = (timestamp) => {
        if (!timestamp?.toDate) {
            return "Recently submitted";
        }

        return timestamp.toDate().toLocaleDateString(
            "en-US",
            {
                month: "long",
                day: "numeric",
                year: "numeric",
            }
        );
    };

    if (loading) {
        return (
            <main className="editor-article-page">
                <section className="editor-article-loading">
                    Loading submission...
                </section>
            </main>
        );
    }

    if (error && !article) {
        return (
            <main className="editor-article-page">
                <section className="editor-article-error-page">
                    <span className="section-label">
                        Voices in BOLD / Editorial
                    </span>

                    <h1>
                        Unable to load
                        <em>submission.</em>
                    </h1>

                    <p>{error}</p>

                    <Link
                        to="/editor"
                        className="editor-back-button"
                    >
                        ← Back to Editor
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="editor-article-page">

            {/* Header */}

            <header className="editor-article-header">

                <div className="editor-article-header-inner">

                    <Link
                        to="/editor"
                        className="editor-article-back"
                    >
                        ← Editorial Queue
                    </Link>

                    <span className="editor-article-category">
                        {article.category}
                    </span>

                    <h1>
                        {article.title}
                    </h1>

                    <div className="editor-article-meta">

                        <span>
                            By {article.author || "Unknown author"}
                        </span>

                        <span>
                            Submitted{" "}
                            {formatDate(
                                article.updatedAt ||
                                article.createdAt
                            )}
                        </span>

                    </div>

                </div>

            </header>


            {/* Article */}

            <section className="editor-article-section">

                <div className="editor-article-layout">

                    {/* Main Content */}

                    <article className="editor-article-content">

                        {article.excerpt && (
                            <p className="editor-article-excerpt">
                                {article.excerpt}
                            </p>
                        )}

                        {Array.isArray(article.content) &&
                            article.content.map(
                                (paragraph, index) => (
                                    <p key={index}>
                                        {paragraph}
                                    </p>
                                )
                            )}

                    </article>


                    {/* Editorial Controls */}

                    <aside className="editor-controls">

                        <div className="editor-controls-label">
                            Editorial Decision
                        </div>

                        {error && (
                            <div className="editor-action-error">
                                {error}
                            </div>
                        )}

                        <button
                            type="button"
                            className="editor-publish-button"
                            onClick={handlePublish}
                            disabled={action !== ""}
                        >
                            {action === "publishing"
                                ? "Publishing..."
                                : "Publish Article"}

                            <span>↗</span>
                        </button>

                        <button
                            type="button"
                            className="editor-changes-button"
                            onClick={() =>
                                setShowFeedback(!showFeedback)
                            }
                            disabled={action !== ""}
                        >
                            Request Changes
                        </button>

                        {showFeedback && (
                            <div className="editor-feedback">

                                <label htmlFor="editor-feedback">
                                    Feedback for writer
                                </label>

                                <textarea
                                    id="editor-feedback"
                                    value={feedback}
                                    onChange={(e) =>
                                        setFeedback(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Explain what the writer should revise..."
                                    rows="6"
                                />

                                <button
                                    type="button"
                                    className="editor-send-feedback"
                                    onClick={
                                        handleRequestChanges
                                    }
                                    disabled={action !== ""}
                                >
                                    {action === "requesting"
                                        ? "Sending..."
                                        : "Send Feedback"}
                                </button>

                            </div>
                        )}

                    </aside>

                </div>

            </section>

        </main>
    );
}