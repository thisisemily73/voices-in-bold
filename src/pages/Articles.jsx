import { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { Link } from "react-router-dom";

import { db } from "../firebase";
import "../styles/pages/Articles.css";

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /* Load published articles */

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const articlesQuery = query(
                    collection(db, "articles"),
                    where("status", "==", "published")
                );

                const snapshot = await getDocs(articlesQuery);

                const publishedArticles = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                /* Newest published articles first */

                publishedArticles.sort((a, b) => {
                    const aTime =
                        a.publishedAt?.toMillis?.() ||
                        a.updatedAt?.toMillis?.() ||
                        0;

                    const bTime =
                        b.publishedAt?.toMillis?.() ||
                        b.updatedAt?.toMillis?.() ||
                        0;

                    return bTime - aTime;
                });

                setArticles(publishedArticles);
            } catch (error) {
                console.error(error);
                setError(
                    "We couldn't load the latest stories."
                );
            } finally {
                setLoading(false);
            }
        };

        loadArticles();
    }, []);

    /* Format date */

    const formatDate = (timestamp) => {
        if (!timestamp?.toDate) {
            return "";
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

    return (
        <main className="articles-page">

            {/* Header */}

            <section className="articles-header">
                <div className="articles-header-inner">

                    <span className="section-label">
                        Voices in BOLD / Stories
                    </span>

                    <h1>
                        Student
                        <em>voices.</em>
                    </h1>

                    <p>
                        Stories, ideas, and perspectives from
                        students in our community.
                    </p>

                </div>
            </section>


            {/* Articles */}

            <section className="articles-section">

                {loading ? (
                    <div className="articles-empty">
                        Loading stories...
                    </div>
                ) : error ? (
                    <div className="articles-error">
                        {error}
                    </div>
                ) : articles.length === 0 ? (
                    <div className="articles-empty">
                        <h2>
                            No stories yet.
                        </h2>

                        <p>
                            Check back soon for new student writing.
                        </p>
                    </div>
                ) : (
                    <div className="articles-grid">

                        {articles.map((article) => (
                            <article
                                className="article-card"
                                key={article.id}
                            >

                                <span className="article-card-category">
                                    {article.category}
                                </span>

                                <h2>
                                    {article.title}
                                </h2>

                                {article.excerpt && (
                                    <p>
                                        {article.excerpt}
                                    </p>
                                )}

                                <div className="article-card-footer">

                                    <span>
                                        By{" "}
                                        {article.author ||
                                            "Unknown author"}
                                    </span>

                                    <span>
                                        {formatDate(
                                            article.publishedAt ||
                                            article.updatedAt
                                        )}
                                    </span>

                                </div>

                                <Link
                                    to={`/articles/${article.id}`}
                                    className="article-card-link"
                                >
                                    Read Story
                                    <span>↗</span>
                                </Link>

                            </article>
                        ))}

                    </div>
                )}

            </section>

        </main>
    );
}