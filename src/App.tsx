import React, { useCallback, useState } from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutPage from "./components/About";
import Navbar from "./components/Navbar";
import ExperiencePage from "./components/Experience";
import Skills from "./components/Skills";
import ContactPage from "./components/Contact";

const App = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);
  const handleNavbarAnimationComplete = useCallback(() => {}, []);
  return (
    <Router>
      <Navbar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        onAnimationComplete={handleNavbarAnimationComplete}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
};

export default App;
