import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/Home.css";
import logo from "../assets/logo.svg";

const featuredArticles = [
    {
        id: 1,
        category: "Opinion",
        title: "The Power of Student Voices",
        excerpt:
            "Why sharing our experiences can change the way we understand our school and community.",
        date: "Oct. 4, 2026",
        color: "red",
    },
    {
        id: 2,
        category: "Features",
        title: "What Matters to Us",
        excerpt:
            "A closer look at the ideas, questions, and conversations shaping student life.",
        date: "Oct. 2, 2026",
        color: "yellow",
    },
    {
        id: 3,
        category: "Culture",
        title: "Beyond the Headlines",
        excerpt:
            "The people, places, and moments that make our community what it is.",
        date: "Sept. 29, 2026",
        color: "dark",
    },
];

const recentArticles = [
    {
        id: 4,
        category: "Opinion",
        title: "A New Perspective",
        date: "Oct. 6",
    },
    {
        id: 5,
        category: "Community",
        title: "Inside Our Community",
        date: "Oct. 5",
    },
    {
        id: 6,
        category: "Culture",
        title: "What We're Talking About",
        date: "Oct. 3",
    },
    {
        id: 7,
        category: "Features",
        title: "Meet the People Behind the Stories",
        date: "Oct. 1",
    },
];

export default function Home() {
    const carouselRef = useRef(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const moveCarousel = (direction) => {
        const carousel = carouselRef.current;

        if (!carousel) return;

        const card = carousel.querySelector(".featured-card");

        if (!card) return;

        const amount = card.offsetWidth + 24;

        carousel.scrollBy({
            left: direction * amount,
            behavior: "smooth",
        });

        setActiveSlide((current) => {
            const next = current + direction;

            if (next < 0) return featuredArticles.length - 1;
            if (next >= featuredArticles.length) return 0;

            return next;
        });
    };

    const goToSlide = (index) => {
        const carousel = carouselRef.current;
        const card = carousel?.querySelector(".featured-card");

        if (!carousel || !card) return;

        carousel.scrollTo({
            left: index * (card.offsetWidth + 24),
            behavior: "smooth",
        });

        setActiveSlide(index);
    };

    return (
        <main className="home">

            {/* Hero */}

            <section className="hero">
                <div className="hero-noise" />

                <div className="hero-inner">
                    <div className="hero-copy">
                        <span className="hero-kicker">The student publication</span>

                        <h1 className="hero-title">
                            <span className="hero-title-small">Voices in</span>
                            <span className="hero-title-bold">BOLD.</span>
                        </h1>

                        <p className="hero-tagline">
                            Your Voice. Your Story. Your Stage.
                        </p>

                        <p className="hero-description">
                            Report. Publish. Make your stories known.
                        </p>

                        <Link to="/articles" className="hero-button">
                            Read the latest stories
                            <span>↗</span>
                        </Link>
                    </div>

                    <div className="hero-visual">
                        <div className="hero-mouth">
                            <img
                                src={logo}
                                alt=""
                                className="hero-mouth-image"
                            />
                        </div>
                    </div>
                </div>

                <div className="hero-bottom">
                    <span>Stories worth hearing</span>
                    <span>Voices in BOLD · 2026</span>
                </div>
            </section>

            {/* Intro */}

            <section className="intro-section">
                <div className="section-container intro-grid">
                    <div className="intro-heading">
                        <span className="section-label">Welcome to Voices</span>

                        <h2>
                            Say it.
                            <br />
                            <em>Share it.</em>
                            <br />
                            Make it <strong>bold.</strong>
                        </h2>
                    </div>

                    <div className="intro-copy">
                        <p>
                            Voices in BOLD is a student publication built around one
                            simple idea: students have something worth saying.
                        </p>

                        <p>
                            From opinions and culture to community stories, we're here
                            to give those ideas a place to live.
                        </p>

                        <Link to="/about" className="editorial-link">
                            More about Voices <span>→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured */}

            <section className="featured-section">
                <div className="section-container">

                    <div className="section-header">
                        <div>
                            <span className="section-label">Editor's picks</span>
                            <h2>Featured</h2>
                        </div>

                        <span className="section-number">01—03</span>
                    </div>

                    <div className="featured-carousel" ref={carouselRef}>
                        {featuredArticles.map((article, index) => (
                            <article
                                className={`featured-card featured-${article.color}`}
                                key={article.id}
                            >
                                <div className="featured-top">
                                    <span className="article-category">
                                        {article.category}
                                    </span>

                                    <span className="article-number">
                                        0{index + 1}
                                    </span>
                                </div>

                                <div className="featured-content">
                                    <div className="article-image-placeholder">
                                        <span>PHOTO</span>
                                    </div>

                                    <div className="featured-text">
                                        <h3>{article.title}</h3>

                                        <p>{article.excerpt}</p>

                                        <div className="featured-meta">
                                            <span>{article.date}</span>
                                            <span>Read story ↗</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="carousel-controls">
                        <button
                            className="carousel-button"
                            onClick={() => moveCarousel(-1)}
                            aria-label="Previous article"
                        >
                            ←
                        </button>

                        <div className="carousel-dots">
                            {featuredArticles.map((article, index) => (
                                <button
                                    key={article.id}
                                    className={`carousel-dot ${activeSlide === index ? "active" : ""
                                        }`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to article ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            className="carousel-button"
                            onClick={() => moveCarousel(1)}
                            aria-label="Next article"
                        >
                            →
                        </button>
                    </div>
                </div>
            </section>

            {/* Recent */}

            <section className="recent-section">
                <div className="section-container">

                    <div className="recent-header">
                        <div>
                            <span className="section-label">Fresh off the press</span>
                            <h2>This Week</h2>
                        </div>

                        <span className="new-badge">NEW</span>
                    </div>

                    <div className="recent-list">
                        {recentArticles.map((article, index) => (
                            <Link
                                to={`/articles/${article.id}`}
                                className="recent-article"
                                key={article.id}
                            >
                                <span className="recent-index">
                                    0{index + 1}
                                </span>

                                <div className="recent-info">
                                    <span>{article.category}</span>
                                    <h3>{article.title}</h3>
                                </div>

                                <span className="recent-date">
                                    {article.date}
                                </span>

                                <span className="recent-arrow">↗</span>
                            </Link>
                        ))}
                    </div>

                    <Link to="/articles" className="all-articles">
                        See all articles <span>→</span>
                    </Link>
                </div>
            </section>

            {/* Statement */}

            <section className="statement-section">
                <div className="statement-decoration">✦</div>

                <div className="statement-content">
                    <span className="section-label">Our idea</span>

                    <h2>
                        There is no
                        <br />
                        <em>“just a student”</em>
                        <br />
                        story.
                    </h2>

                    <p>
                        Every perspective adds something to the conversation.
                    </p>
                </div>
            </section>

            {/* About */}

            <section className="about-teaser">
                <div className="section-container about-grid">
                    <div>
                        <span className="section-label">About us</span>

                        <h2>
                            Made by
                            <br />
                            <span>students.</span>
                        </h2>
                    </div>

                    <div className="about-copy">
                        <p>
                            Voices in BOLD gives students a place to write, create,
                            question, and connect.
                        </p>

                        <Link to="/about" className="editorial-link light">
                            Meet the team <span>→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact */}

            <section className="contact-section">
                <div className="contact-decoration">SPEAK UP.</div>

                <div className="contact-content">
                    <span className="section-label">Have something to say?</span>

                    <h2>
                        Your voice
                        <br />
                        belongs here.
                    </h2>

                    <Link to="/contact" className="contact-button">
                        Get in touch <span>↗</span>
                    </Link>
                </div>
            </section>

        </main>
    );
}