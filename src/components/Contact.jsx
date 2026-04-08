import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import "../styles/contact.css";

const ContactPage = () => {
  const contactRef = useRef();
  const navigate = useNavigate();
  const isNavigatingRef = useRef(false);
  const wheelDeltaRef = useRef(0);
  const [allowNavigation, setAllowNavigation] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-shell", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });

      gsap.from([".contact-heading", ".contact-intro", ".contact-panel"], {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.25,
        delay: 0.3,
        ease: "power2.out"
      });
    }, contactRef);

    const timeout = setTimeout(() => {
      setAllowNavigation(true);
    }, 1600);

    return () => {
      ctx.revert();
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!allowNavigation) return;

    const handleWheel = (e) => {
      if (isNavigatingRef.current || !allowNavigation) return;

      wheelDeltaRef.current += e.deltaY;

      if (wheelDeltaRef.current < -140) {
        isNavigatingRef.current = true;
        navigate("/skills");
      } else if (Math.abs(e.deltaY) < 4) {
        wheelDeltaRef.current = 0;
      }
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (!allowNavigation) return;
      if (isNavigatingRef.current) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      const absX = Math.abs(diffX);
      const absY = Math.abs(diffY);

      if (Math.max(absX, absY) < 60) return;

      if ((absY >= absX && diffY > 60) || (absX > absY && diffX > 60)) {
        isNavigatingRef.current = true;
        navigate("/skills");
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [allowNavigation, navigate]);

  return (
    <div className="contact-wrapper" ref={contactRef}>
      <div className="contact-shell">
        <div className="contact-copy">
          <span className="contact-kicker">Contact</span>
          <h2 className="contact-heading">
            Let’s build something people remember.
          </h2>
          <p className="contact-intro">
            I enjoy building polished front-end experiences, product interfaces,
            and responsive flows that feel clean, modern, and reliable. If your
            team is looking for a developer who cares about both logic and look,
            let’s connect.
          </p>

          <div className="contact-cta-row">
            <a
              className="contact-cta primary-contact-cta"
              href="mailto:gouravsai63@gmail.com"
            >
              Email Me
            </a>
            <a className="contact-cta" href="tel:+918217211105">
              Call Me
            </a>
          </div>
        </div>

        <div className="contact-panels">
          <div className="contact-panel">
            <span className="contact-label">Email</span>
            <a href="mailto:gouravsai63@gmail.com" className="contact-value">
              gouravsai63@gmail.com
            </a>
          </div>

          <div className="contact-panel">
            <span className="contact-label">Phone</span>
            <a href="tel:+918217211105" className="contact-value">
              +91 821-721-1105
            </a>
          </div>

          <div className="contact-panel">
            <span className="contact-label">Location</span>
            <span className="contact-value">Bengaluru, Karnataka</span>
          </div>

          <div className="contact-panel">
            <span className="contact-label">Profiles</span>
            <div className="contact-links">
              <a
                href="https://github.com/gourav1405"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/munikotigourav0514/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/gouravsai63"
                target="_blank"
                rel="noreferrer"
              >
                X
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="nav-beacon contact-beacon" aria-hidden="true">
        <div className="nav-beacon-direction nav-beacon-direction-up">
          <span />
          <span />
          <span />
        </div>
        <div className="nav-beacon-core">
          <span className="nav-beacon-ring nav-beacon-ring-one" />
          <span className="nav-beacon-ring nav-beacon-ring-two" />
          <span className="nav-beacon-dot" />
        </div>
        <div className="nav-beacon-copy">
          <span className="nav-beacon-label">Return Path</span>
          <strong>Scroll up to move back to Skills</strong>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
