import React from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Articles from './pages/Articles';
import About from './pages/About';
import Contact from './pages/Contact';

const pathToView = {
  '/': 'home',
  '/about': 'about',
};

function App({ user }) {
  const location = useLocation();
  const navigate = useNavigate();

  const activeView = pathToView[location.pathname] || '';

  const setView = (nextView) => {
    const path = nextView === 'home' ? '/' : `/${nextView}`;
    navigate(path);
  };

  return (
    <div className="app">
      <Navbar setView={setView} activeView={activeView} user={user} />

      <main>
        <Routes>
          <Route path="/" element={<Home setView={setView} />} />
          <Route path="/articles" element={<Articles setView={setView} />} />
          <Route path="/about" element={<About setView={setView} />} />
          <Route path="/contact" element={<Contact setView={setView} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer setView={setView} />
    </div>
  );
}

export default App;