import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NewArticle from './pages/NewArticle';

import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  /* Listen for Firebase authentication changes */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Firebase user:", currentUser);
      console.log("Photo URL:", currentUser?.photoURL);

      setUser(currentUser);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  /* Wait for Firebase to check the current session */

  if (authLoading) {
    return null;
  }

  return (
    <div className="app">

      <Navbar user={user} />

      <main>
        <ScrollToTop />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/articles/:id"
            element={<Article />}
          />

          <Route
            path="/articles"
            element={<Articles />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/auth"
            element={<Auth />}
          />

          <Route
            path="/profile"
            element={
              user ? <Profile /> : <Navigate to="/auth" replace />
            }
          />

          <Route
            path="/settings"
            element={
              user ? <Settings /> : <Navigate to="/auth" replace />
            }
          />

          <Route
            path="/articles/new"
            element={
              user ? <NewArticle /> : <Navigate to="/auth" replace />
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      </main>

      <Footer />

    </div>
  );
}

export default App;