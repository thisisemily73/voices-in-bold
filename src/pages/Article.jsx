import { useEffect, useState } from "react";
import {
    doc,
    getDoc,
} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";

import { auth, db } from "../firebase";
import "../styles/pages/Article.css";

export default function Article() {
    const { id } = useParams();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    /* Load article */

    useEffect(() => {
        const loadArticle = async () => {
            try {
                const articleRef = doc(
                    db,
                    "articles",
                    id
                );

                const snapshot = await getDoc(articleRef);

                if (!snapshot.exists()) {
                    setNotFound(true);
                    setLoading(false);
                    return;
                }

                const data = snapshot.data();

                /*
                 * Public users can only view published articles.
                 * Authors can still view their own unpublished articles.
                 * Editors can view unpublished articles.
                 *
                 * Firestore rules already protect this,
                 * but this check keeps the public UI clean.
                 */

                const currentUser = auth.currentUser;

                const canView =
                    data.status === "published" ||
                    data.authorId === currentUser?.uid;

                if (!canView) {
                    setNotFound(true);
                    setLoading(false);
                    return;
                }

                setArticle({
                    id: snapshot.id,
                    ...data,
                });
            } catch (error) {
                console.error(error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        loadArticle();
    }, [id]);

    /* Format date */

    const formatDate = (timestamp) => {
        if (!timestamp?.toDate) {
            return "";
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

    /* Loading */

    if (loading) {
        return (
            <main className="article-not-found">
                Loading story...
            </main>
        );
    }

    /* Not found */

    if (notFound || !article) {
        return (
            <main className="article-not-found">

                <span className="section-label">
                    404 / Story Not Found
                </span>

                <h1>
                    That story
                    <em>doesn't exist.</em>
                </h1>

                <Link
                    to="/articles"
                    className="article-back-button"
                >
                    Back to articles
                    <span>↗</span>
                </Link>

            </main>
        );
    }

    return (
        <main className="article-page">

            {/* Header */}

            <header className="article-header">

                <div className="article-header-inner">

                    <Link
                        to="/articles"
                        className="article-back"
                    >
                        ← All articles
                    </Link>

                    <span className="article-category">
                        {article.category}
                    </span>

                    <h1>
                        {article.title}
                    </h1>

                    {article.excerpt && (
                        <p className="article-excerpt">
                            {article.excerpt}
                        </p>
                    )}

                    <div className="article-header-meta">

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

                </div>

            </header>


            {/* Body */}

            <article className="article-body">

                <div className="article-body-inner">

                    <div className="article-content">

                        {Array.isArray(article.content) &&
                            article.content.map(
                                (paragraph, index) => (
                                    <p key={index}>
                                        {paragraph}
                                    </p>
                                )
                            )}

                    </div>

                </div>

            </article>


            {/* Footer */}

            <section className="article-footer">

                <Link
                    to="/articles"
                    className="article-back-button"
                >
                    ← Read more stories
                </Link>

            </section>

        </main>
    );
}