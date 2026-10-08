import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../firebase";
import "../styles/pages/NewArticle.css";

export default function NewArticle() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Opinion");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    /* Save article as a draft */

    const handleSaveDraft = async () => {
        if (!auth.currentUser) {
            setError("You must be logged in to create an article.");
            return;
        }

        if (!title.trim()) {
            setError("Please add a title.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const user = auth.currentUser;

            await addDoc(collection(db, "articles"), {
                title: title.trim(),
                category,
                excerpt: excerpt.trim(),
                content: content
                    .split("\n")
                    .map((paragraph) => paragraph.trim())
                    .filter(Boolean),

                authorId: user.uid,
                author: user.displayName || user.email || "Unknown author",

                status: "drafting",

                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            navigate("/profile");
        } catch (error) {
            console.error(error);
            setError("We couldn't save your article. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="new-article-page">

            {/* Header */}

            <section className="new-article-header">
                <div className="new-article-header-inner">

                    <span className="section-label">
                        Voices in BOLD / New Article
                    </span>

                    <h1>
                        Tell your
                        <em>story.</em>
                    </h1>

                    <p>
                        Write, save, and submit your piece for review.
                    </p>

                </div>
            </section>

            {/* Editor */}

            <section className="new-article-section">

                <div className="new-article-card">

                    {/* Error */}

                    {error && (
                        <div className="new-article-error">
                            {error}
                        </div>
                    )}

                    {/* Title */}

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
                            placeholder="Give your piece a title"
                        />

                    </div>

                    {/* Category */}

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

                    {/* Excerpt */}

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
                            placeholder="A short description of your piece"
                            rows="3"
                        />

                    </div>

                    {/* Content */}

                    <div className="new-article-field">

                        <label htmlFor="article-content">
                            Article
                        </label>

                        <span className="new-article-hint">
                            Separate paragraphs with a blank line.
                        </span>

                        <textarea
                            id="article-content"
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value)
                            }
                            placeholder="Start writing your piece..."
                            rows="18"
                        />

                    </div>

                    {/* Actions */}

                    <div className="new-article-actions">

                        <button
                            type="button"
                            className="new-article-cancel"
                            onClick={() => navigate("/profile")}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="new-article-save"
                            onClick={handleSaveDraft}
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : "Save Draft"}

                            <span>↗</span>
                        </button>

                    </div>

                </div>

            </section>

        </main>
    );
}