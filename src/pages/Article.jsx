import { Link, useParams } from "react-router-dom";
import "../styles/pages/Article.css";

import articles from "../data/articles.json";

export default function Article() {
    const { id } = useParams();

    const article = articles.find(
        (item) => item.id === Number(id)
    );

    if (!article) {
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

                    <h1>{article.title}</h1>

                    <p className="article-excerpt">
                        {article.excerpt}
                    </p>

                    <div className="article-header-meta">
                        <span>
                            By {article.author}
                        </span>

                        <span>
                            {article.date}
                        </span>
                    </div>

                </div>
            </header>


            {/* Article Body */}

            <article className="article-body">
                <div className="article-body-inner">

                    <div className="article-content">

                        {article.content?.map(
                            (paragraph, index) => (
                                <p key={index}>
                                    {paragraph}
                                </p>
                            )
                        )}

                        {!article.content && (
                            <p>
                                [... article content goes here]
                            </p>
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