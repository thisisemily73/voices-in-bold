import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "../firebase";
import "../styles/pages/Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* Email authentication */

  const handleEmailAuth = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      navigate("/");
    } catch (error) {
      setError(getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };


  /* Google authentication */

  const handleGoogleAuth = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

      navigate("/");
    } catch (error) {
      setError(getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };


  /* Switch between login and signup */

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setEmail("");
    setPassword("");
  };


  return (
    <main className="auth-page">

      {/* Auth Header */}

      <section className="auth-header">
        <div className="auth-header-inner">

          <span className="section-label">
            Voices in BOLD / Account
          </span>

          <h1>
            {isLogin ? "Welcome" : "Join the"}
            <em>
              {isLogin ? "back." : "conversation."}
            </em>
          </h1>

          <p>
            {isLogin
              ? "Log in to your Voices in BOLD account."
              : "Create an account and make your voice heard."}
          </p>

        </div>
      </section>


      {/* Auth Form */}

      <section className="auth-section">
        <div className="auth-card">

          <div className="auth-card-header">
            <h2>
              {isLogin ? "Log in" : "Sign up"}
            </h2>

            <p>
              {isLogin
                ? "Enter your account information below."
                : "Create your account to get started."}
            </p>
          </div>


          {/* Error */}

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}


          {/* Email Form */}

          <form onSubmit={handleEmailAuth}>

            <div className="auth-field">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                required
              />
            </div>


            <div className="auth-field">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                required
              />
            </div>


            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Log in"
                  : "Create account"}

              <span>↗</span>
            </button>

          </form>


          {/* Divider */}

          <div className="auth-divider">
            <span>or</span>
          </div>


          {/* Google */}

          <button
            type="button"
            className="google-button"
            onClick={handleGoogleAuth}
            disabled={loading}
          >
            Continue with Google
          </button>


          {/* Toggle */}

          <div className="auth-toggle">

            <span>
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>

            <button
              type="button"
              onClick={toggleMode}
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>

          </div>

        </div>
      </section>

    </main>
  );
}


/* Firebase error messages */

function getAuthErrorMessage(code) {
  switch (code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/user-not-found":
      return "No account was found with that email.";

    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "The email or password is incorrect.";

    case "auth/email-already-in-use":
      return "An account already exists with this email.";

    case "auth/weak-password":
      return "Your password needs to be stronger.";

    case "auth/popup-closed-by-user":
      return "The Google sign-in window was closed.";

    default:
      return "Something went wrong. Please try again.";
  }
}