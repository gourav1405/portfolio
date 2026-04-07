import React, { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logoSVG from "../assets/logo.png";
import { gsap } from "gsap";

const Navbar = ({ isMenuOpen, toggleMenu, onAnimationComplete }) => {
  const logoRef = useRef(null);
  const navLinksRef = useRef([]);
  const contactRef = useRef(null);
  const navigate = useNavigate();
  navLinksRef.current = [];

  useEffect(() => {
    const navItems = navLinksRef.current.filter(Boolean);
    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 1 },
      onComplete: () => {
        onAnimationComplete();
      },
    });
    tl.from(logoRef.current, { y: -50, opacity: 0 })
      .from(navItems, {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        duration: 0.8,
      })
      .from(contactRef.current, { y: -30, opacity: 0 }, "-=0.5");
  }, [onAnimationComplete]);

  const links = [
    { to: "/", label: "Home", exact: true },
    { to: "/about", label: "About" },
    { to: "/experience", label: "Experience" },
    { to: "/skills", label: "Skills" },
    { to: "/contact", label: "Contact", mobileOnly: true },
  ];

  return (
    <nav className="navbar">
      <div className="logo" ref={logoRef}>
        <img src={logoSVG} alt="M Gourav Logo" width="60" height="40" />
      </div>
      <div className="mobile-menu">
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        {links.map((link, i) => (
          <li
            key={link.to}
            className={link.mobileOnly ? "mobile-contact" : ""}
            ref={(el) => (navLinksRef.current[i] = el)}
          >
            <NavLink
              to={link.to}
              end={link.exact}
              onClick={() => {
                if (isMenuOpen) toggleMenu();
              }}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <button
        className="contact-button desktop-only"
        ref={contactRef}
        onClick={() => navigate("/contact")}
      >
        Contact
      </button>
    </nav>
  );
};

export default Navbar;
