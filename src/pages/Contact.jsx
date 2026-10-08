import { Link } from "react-router-dom";
import "../styles/pages/Contact.css";

export default function Contact() {
  return (
    <main className="contact-page">

      {/* Hero */}

      <section className="contact-hero">
        <div className="contact-hero-inner">
          <span className="section-label">Contact</span>

          <h1>
            Let's
            <em>talk.</em>
          </h1>

          <p>
            [... short introduction about how people can contact
            Voices in BOLD goes here]

            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis.
          </p>
        </div>
      </section>


      {/* Contact Information */}

      <section className="contact-info-section">
        <div className="section-container">

          <div className="contact-info-header">
            <span className="section-label">01 / Get in Touch</span>

            <h2>
              Have something
              <em>to say?</em>
            </h2>
          </div>

          <div className="contact-info-grid">

            <div className="contact-info-card">
              <span className="contact-info-number">01</span>

              <h3>Email</h3>

              <p>
                [... organization email goes here]
              </p>

              <a href="mailto:your-email@example.com">
                your-email@example.com
                <span>↗</span>
              </a>
            </div>

            <div className="contact-info-card">
              <span className="contact-info-number">02</span>

              <h3>Social</h3>

              <p>
                [... social media information goes here]
              </p>

              <a href="#" target="_blank" rel="noreferrer">
                [... social media handle]
                <span>↗</span>
              </a>
            </div>

            <div className="contact-info-card">
              <span className="contact-info-number">03</span>

              <h3>Questions?</h3>

              <p>
                [... information about questions, submissions,
                partnerships, or other inquiries goes here]

                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* Contact Form */}

      <section className="contact-form-section">
        <div className="contact-form-grid">

          <div className="contact-form-intro">
            <span className="section-label">02 / Send a Message</span>

            <h2>
              Your voice
              <em>matters.</em>
            </h2>

            <p>
              [... explain what people should use this form for]

              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <form className="contact-form">

            <div className="form-field">
              <label htmlFor="name">Name</label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="[... your name]"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="[... your email]"
              />
            </div>

            <div className="form-field">
              <label htmlFor="subject">Subject</label>

              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="[... what is this about?]"
              />
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>

              <textarea
                id="message"
                name="message"
                rows="7"
                placeholder="[... write your message here]"
              />
            </div>

            <button type="submit" className="contact-submit">
              Send message
              <span>↗</span>
            </button>

          </form>
        </div>
      </section>


      {/* Submissions */}

      <section className="contact-submissions">
        <div className="contact-submissions-inner">

          <span className="section-label">03 / Submissions</span>

          <h2>
            Got a story
            <em>to tell?</em>
          </h2>

          <p>
            [... explain how students can submit articles, stories,
            ideas, or other work goes here]

            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <Link to="/articles" className="contact-secondary-button">
            Read our stories
            <span>↗</span>
          </Link>

        </div>
      </section>

    </main>
  );
}