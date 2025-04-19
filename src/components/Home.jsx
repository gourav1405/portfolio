import React, { useEffect, useState } from "react";
import "../styles/home.css";
import logoSVG from "../../src/assets/logo.png";
import myPic from "../../src/assets/myPic1.png";

export default function HomePage() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo">
          <img src={logoSVG} alt="M Gourav Logo" width="60" height="40" />
        </div>
        <div className="mobile-menu">
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>Home</li>
          <li>About</li>
          <li>Experience</li>
          <li>Skills</li>
          <li className="mobile-contact">Contact</li>
        </ul>
        <button className="contact-button desktop-only">Contact</button>
      </nav>
      <main className="main-content">
        <h1>M Gourav</h1>
        <p className="subtitle">Full Stack Developer | Web Enthusiast</p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <a
            href="https://drive.google.com/file/d/1K5yVJZZEJWqIIQXCg3lVwwyuwtNTGED5/view"
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button"
          >
            View Resume
          </a>
        </div>
        <div className="illustration">
          <img
            src={myPic}
            alt="M Gourav illustration"
            className="profile-image"
          />
        </div>
      </main>
      <div className="footer-overlay">
        <div className="footer-content">
          <span className="footer-text">© M Gourav</span>
          <div className="footer-icons">
            <a
              href="https://github.com/gourav0514"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://x.com/gouravsai63"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/munikotigourav0514/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
