import { Link } from "react-router-dom";
import "../styles/pages/About.css";

export default function About() {
  return (
    <main className="about-page">

      {/* Hero */}

      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="section-label">About Voices in BOLD</span>

          <h1>
            More than
            <span>a publication.</span>
          </h1>

          <p className="about-hero-description">
            [... short description of Voices in BOLD goes here]

            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse varius enim in eros elementum tristique.
          </p>
        </div>
      </section>


      {/* Who We Are */}

      <section className="about-section">
        <div className="about-section-grid">
          <div className="about-section-heading">
            <span className="section-label">01 / Who We Are</span>

            <h2>
              Our
              <em>story.</em>
            </h2>
          </div>

          <div className="about-section-copy">
            <h3>[... organization description goes here]</h3>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Integer nec odio. Praesent libero. Sed cursus ante dapibus
              diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
            </p>

            <p>
              [... additional information about how Voices in BOLD
              started, why it was created, and what it hopes to accomplish
              goes here]

              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec quam felis, ultricies nec, pellentesque eu, pretium
              quis, sem.
            </p>
          </div>
        </div>
      </section>


      {/* Mission */}

      <section className="about-mission">
        <div className="about-mission-inner">
          <span className="section-label">02 / Our Mission</span>

          <h2>
            [... mission statement
            <em>goes here]</em>
          </h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Maecenas nec odio et ante tincidunt tempus.
          </p>
        </div>
      </section>


      {/* What We Do */}

      <section className="about-section about-areas">
        <div className="section-container">
          <div className="section-header">
            <div>
              <span className="section-label">03 / What We Do</span>

              <h2>Our areas.</h2>
            </div>

            <span className="section-number">04</span>
          </div>

          <div className="about-area-grid">

            <article className="about-area-card">
              <span>01</span>
              <h3>Public Speaking</h3>

              <p>
                [... information about your public speaking program goes here]

                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </article>

            <article className="about-area-card">
              <span>02</span>
              <h3>Speech & Debate</h3>

              <p>
                [... information about your speech and debate program goes here]

                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </article>

            <article className="about-area-card">
              <span>03</span>
              <h3>Journalism</h3>

              <p>
                [... information about your journalism program goes here]

                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </article>

            <article className="about-area-card">
              <span>04</span>
              <h3>Media Literacy</h3>

              <p>
                [... information about your media literacy program goes here]

                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </article>

          </div>
        </div>
      </section>


      {/* Values */}

      <section className="about-values">
        <div className="section-container">
          <span className="section-label">04 / What We Value</span>

          <div className="values-grid">

            <div className="value">
              <span>01</span>
              <h3>[... value goes here]</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            <div className="value">
              <span>02</span>
              <h3>[... value goes here]</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            <div className="value">
              <span>03</span>
              <h3>[... value goes here]</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* Get Involved */}

      <section className="about-cta">
        <div className="about-cta-inner">
          <span className="section-label">05 / Get Involved</span>

          <h2>
            Have a story
            <em>to tell?</em>
          </h2>

          <p>
            [... information about joining, contributing, submitting,
            or getting involved goes here]

            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <Link to="/contact" className="about-cta-button">
            Get in touch
            <span>↗</span>
          </Link>
        </div>
      </section>

    </main>
  );
}