import { useEffect, useState } from "react";
import {
    doc,
    getDoc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";

import { auth, db } from "../firebase";
import "../styles/pages/NewArticle.css";

export default function EditArticle() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Opinion");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(true);
    const [savingAction, setSavingAction] = useState("");
    const [error, setError] = useState("");

    const [articleFeedback, setArticleFeedback] = useState("");

    /* Load article */

    useEffect(() => {
        const loadArticle = async () => {
            if (!auth.currentUser) {
                setError("You must be logged in to edit an article.");
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

                const article = snapshot.data();

                /* Only the author should be editing */

                if (article.authorId !== auth.currentUser.uid) {
                    setError("You do not have permission to edit this article.");
                    setLoading(false);
                    return;
                }

                /* Only drafts are editable by writers */

                if (!["drafting", "rejected"].includes(article.status)) {
                    setError(
                        "This article is awaiting review or has already been published."
                    );
                    setLoading(false);
                    return;
                }

                setTitle(article.title || "");
                setCategory(article.category || "Opinion");
                setExcerpt(article.excerpt || "");

                setContent(
                    Array.isArray(article.content)
                        ? article.content.join("\n\n")
                        : ""
                );

                setArticleFeedback(article.editorFeedback || "");
            } catch (error) {
                console.error(error);
                setError("We couldn't load this article.");
            } finally {
                setLoading(false);
            }
        };

        loadArticle();
    }, [id]);

    /* Save changes */

    const handleSave = async (status) => {
        if (!auth.currentUser) {
            setError("You must be logged in.");
            return;
        }

        if (!title.trim()) {
            setError("Please add a title.");
            return;
        }

        if (status === "pending" && !content.trim()) {
            setError("Please add some article content before submitting.");
            return;
        }

        setError("");
        setSavingAction(status);

        try {
            const paragraphs = content
                .split(/\n\s*\n/)
                .map((paragraph) => paragraph.trim())
                .filter(Boolean);

            const articleRef = doc(db, "articles", id);

            await updateDoc(articleRef, {
                title: title.trim(),
                category,
                excerpt: excerpt.trim(),
                content: paragraphs,
                status,
                editorFeedback: "",
                updatedAt: serverTimestamp(),
            });

            navigate("/profile");
        } catch (error) {
            console.error(error);
            setError(
                "We couldn't save your changes. Please try again."
            );
        } finally {
            setSavingAction("");
        }
    };

    if (loading) {
        return (
            <main className="new-article-page">
                <section className="new-article-section">
                    <div className="new-article-card">
                        <p>Loading article...</p>
                    </div>
                </section>
            </main>
        );
    }

    if (error && !title) {
        return (
            <main className="new-article-page">
                <section className="new-article-section">
                    <div className="new-article-card">
                        <div className="new-article-error">
                            {error}
                        </div>

                        <Link
                            to="/profile"
                            className="profile-add-button"
                        >
                            Back to Profile
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="new-article-page">
            {/* Header */}

            <section className="new-article-header">
                <div className="new-article-header-inner">
                    <span className="section-label">
                        Voices in BOLD / Edit Article
                    </span>

                    <h1>
                        Edit your
                        <em>story.</em>
                    </h1>

                    <p>
                        Make your changes, save your draft, or submit it
                        for editorial review.
                    </p>
                </div>
            </section>

            {/* Editor */}

            <section className="new-article-section">
                <div className="new-article-card">

                    {error && (
                        <div className="new-article-error">
                            {error}
                        </div>
                    )}

                    {error && (
                        <div className="new-article-error">
                            {error}
                        </div>
                    )}

                    {articleFeedback && (
                        <div className="editor-feedback-notice">
                            <strong>Changes requested by your editor</strong>
                            <p>{articleFeedback}</p>
                        </div>
                    )}

                    <div className="new-article-field">
                        <label htmlFor="article-title">
                            Title
                        </label>

                        <input
                            id="article-title"
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                        />
                    </div>

                    <div className="new-article-field">
                        <label htmlFor="article-category">
                            Category
                        </label>

                        <select
                            id="article-category"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        >
                            <option>News</option>
                            <option>Opinion</option>
                            <option>Features</option>
                            <option>Culture</option>
                            <option>Media</option>
                        </select>
                    </div>

                    <div className="new-article-field">
                        <label htmlFor="article-excerpt">
                            Excerpt
                        </label>

                        <textarea
                            id="article-excerpt"
                            value={excerpt}
                            onChange={(e) =>
                                setExcerpt(e.target.value)
                            }
                            rows="3"
                        />
                    </div>

                    <div className="new-article-field">
                        <label htmlFor="article-content">
                            Article
                        </label>

                        <textarea
                            id="article-content"
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value)
                            }
                            rows="18"
                        />

                        <span className="new-article-hint">
                            Separate paragraphs with a blank line.
                        </span>
                    </div>

                    {/* Actions */}

                    <div className="new-article-actions">

                        <button
                            type="button"
                            className="new-article-cancel"
                            onClick={() => navigate("/profile")}
                            disabled={savingAction !== ""}
                        >
                            Cancel
                        </button>

                        <div className="new-article-submit-actions">

                            <button
                                type="button"
                                className="new-article-draft"
                                onClick={() =>
                                    handleSave("drafting")
                                }
                                disabled={savingAction !== ""}
                            >
                                {savingAction === "drafting"
                                    ? "Saving..."
                                    : "Save Draft"}
                            </button>

                            <button
                                type="button"
                                className="new-article-save"
                                onClick={() =>
                                    handleSave("pending")
                                }
                                disabled={savingAction !== ""}
                            >
                                {savingAction === "pending"
                                    ? "Submitting..."
                                    : "Submit for Review"}

                                <span>↗</span>
                            </button>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}