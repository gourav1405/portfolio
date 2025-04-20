import React, { useState } from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutPage from "./components/About";
import Navbar from "./components/Navbar";
import ExperiencePage from "./components/Experience";

const App = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [navbarReady, setNavbarReady] = useState(false);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const handleNavbarAnimationComplete = () => {
    setNavbarReady(true);
  };
  return (
    <Router>
      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        onAnimationComplete={handleNavbarAnimationComplete}
      />
      <Routes>
        <Route path="/" element={navbarReady ? <Home /> : null} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/skills" element={null} />
        <Route path="/contact" element={null} />
      </Routes>
    </Router>
  );
};

export default App;
