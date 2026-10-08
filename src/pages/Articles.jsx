import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/Articles.css";

import articles from "../data/articles.json";

const categories = [
  "All",
  "News",
  "Opinion",
  "Features",
  "Culture",
  "Media",
];

export default function Articles() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredArticle = articles.find(
    (article) => article.featured
  );

  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter(
          (article) => article.category === activeCategory
        );

  return (
    <main className="articles-page">

      {/* Hero */}

      <section className="articles-hero">
        <div className="articles-hero-inner">
          <span className="section-label">
            Voices in BOLD / Articles
          </span>

          <h1>
            Stories
            <em>worth hearing.</em>
          </h1>

          <p>
            Reporting, opinions, features, and stories from the
            student community.
          </p>
        </div>
      </section>


      {/* Featured */}

      {featuredArticle && activeCategory === "All" && (
        <section className="articles-featured">
          <div className="section-container">

            <div className="articles-section-heading">
              <span className="section-label">
                01 / Featured
              </span>
            </div>

            <Link
              to={`/articles/${featuredArticle.id}`}
              className="featured-article"
            >
              <div className="featured-article-content">

                <span className="article-category">
                  {featuredArticle.category}
                </span>

                <h2>
                  {featuredArticle.title}
                </h2>

                <p>
                  {featuredArticle.excerpt}
                </p>

                <div className="article-meta">
                  <span>
                    {featuredArticle.author}
                  </span>

                  <span>
                    {featuredArticle.date}
                  </span>
                </div>

              </div>

              <div className="featured-article-arrow">
                ↗
              </div>
            </Link>

          </div>
        </section>
      )}


      {/* Articles */}

      <section className="articles-list-section">
        <div className="section-container">

          <div className="articles-list-header">
            <div>
              <span className="section-label">
                {activeCategory === "All"
                  ? "02 / All Stories"
                  : `02 / ${activeCategory}`}
              </span>

              <h2>Latest.</h2>
            </div>

            <span className="article-count">
              {filteredArticles.length}{" "}
              {filteredArticles.length === 1
                ? "story"
                : "stories"}
            </span>
          </div>


          {/* Filters */}

          <div
            className="article-filters"
            aria-label="Filter articles"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  activeCategory === category
                    ? "filter-button active"
                    : "filter-button"
                }
                onClick={() =>
                  setActiveCategory(category)
                }
              >
                {category}
              </button>
            ))}
          </div>


          {/* Article Grid */}

          <div className="articles-grid">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                to={`/articles/${article.id}`}
                className="article-card"
              >

                <div className="article-card-top">

                  <span className="article-category">
                    {article.category}
                  </span>

                  <span className="article-card-number">
                    {String(article.id).padStart(2, "0")}
                  </span>

                </div>

                <div className="article-card-content">

                  <h3>
                    {article.title}
                  </h3>

                  <p>
                    {article.excerpt}
                  </p>

                </div>

                <div className="article-meta">

                  <span>
                    {article.author}
                  </span>

                  <span>
                    {article.date}
                  </span>

                </div>

                <span className="article-card-arrow">
                  ↗
                </span>

              </Link>
            ))}
          </div>


          {/* Empty State */}

          {filteredArticles.length === 0 && (
            <div className="articles-empty">
              <h3>No stories yet.</h3>

              <p>
                There aren't any articles in this category yet.
              </p>
            </div>
          )}

        </div>
      </section>


      {/* CTA */}

      <section className="articles-cta">
        <div className="articles-cta-inner">

          <span className="section-label">
            03 / Your Voice
          </span>

          <h2>
            Have a story
            <em>to tell?</em>
          </h2>

          <p>
            [... information about submitting a story or
            getting involved goes here]
          </p>

          <Link
            to="/contact"
            className="articles-cta-button"
          >
            Get in touch
            <span>↗</span>
          </Link>

        </div>
      </section>

    </main>
  );
}