import React, { useCallback, useEffect, useRef } from "react";
import "../styles/home.css";
import myPic from "../../src/assets/myPic1.png";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

export default function HomePage() {
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const resumeBtnRef = useRef(null);
  const beaconRef = useRef(null);
  const imageRef = useRef(null);
  const footerLeftRef = useRef(null);
  const footerRightRef = useRef(null);

  const navigate = useNavigate();

  const SCROLL_THRESHOLD = 140;
  const SCROLL_COOLDOWN = 1200;
  const TRANSITION_DURATION = 0.8;
  const SWIPE_MIN_DISTANCE = 50;

  const scrollingRef = useRef(false);
  const wheelDeltaRef = useRef(0);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const triggerNavigate = useCallback(() => {
    if (scrollingRef.current) return;

    scrollingRef.current = true;

    gsap.to(".homepage", {
      opacity: 0,
      duration: TRANSITION_DURATION,
      onComplete: () => {
        navigate("/about");
        setTimeout(() => {
          scrollingRef.current = false;
        }, SCROLL_COOLDOWN);
      }
    });
  }, [navigate]);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 1 }
    });

    tl.from(nameRef.current, { opacity: 0, y: 30 }, "-=0.2")
      .from(roleRef.current, { opacity: 0, y: 20 }, "-=0.7")
      .from(resumeBtnRef.current, { opacity: 0, y: 20 }, "-=0.6")
      .from(beaconRef.current, { opacity: 0, y: 18, scale: 0.95 }, "-=0.45")
      .from(imageRef.current, { scale: 0.8, opacity: 0, duration: 1.2 }, "-=1")
      .from(footerLeftRef.current, { opacity: 0, x: -30 }, "-=1")
      .from(footerRightRef.current, { opacity: 0, x: 30 }, "-=1");

    const homepageEl = document.querySelector(".homepage");

    const handleWheel = (e) => {
      if (scrollingRef.current) return;

      wheelDeltaRef.current += e.deltaY;

      if (wheelDeltaRef.current > SCROLL_THRESHOLD) {
        wheelDeltaRef.current = 0;
        triggerNavigate();
      } else if (Math.abs(e.deltaY) < 4) {
        wheelDeltaRef.current = 0;
      }
    };

    const handleTouchStart = (e) => {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartXRef.current;
      const deltaY = touchEndY - touchStartYRef.current;

      if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < -SWIPE_MIN_DISTANCE) {
        triggerNavigate();
      } else if (
        Math.abs(deltaX) > Math.abs(deltaY) &&
        deltaX < -SWIPE_MIN_DISTANCE
      ) {
        triggerNavigate();
      }
    };

    if (homepageEl) {
      homepageEl.addEventListener("wheel", handleWheel);
      homepageEl.addEventListener("touchstart", handleTouchStart);
      homepageEl.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (homepageEl) {
        homepageEl.removeEventListener("wheel", handleWheel);
        homepageEl.removeEventListener("touchstart", handleTouchStart);
        homepageEl.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [triggerNavigate]);

  return (
    <div className="homepage">
      <div className="home-stage">
        <main className="main-content">
          <h1 ref={nameRef}>Munikoti Gourav</h1>
          <p className="subtitle" ref={roleRef}>
            Front End Developer | Web Enthusiast
          </p>
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            <a
              ref={resumeBtnRef}
              href="https://drive.google.com/file/d/1mmDHPmeBzGchokyIg8OczVcl32a1s6U_/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button"
            >
              View Resume
            </a>
          </div>
        </main>

        <div
          className="nav-beacon home-beacon"
          aria-hidden="true"
          ref={beaconRef}
        >
          <div className="nav-beacon-core">
            <span className="nav-beacon-ring nav-beacon-ring-one" />
            <span className="nav-beacon-ring nav-beacon-ring-two" />
            <span className="nav-beacon-dot" />
          </div>
          <div className="nav-beacon-copy">
            <span className="nav-beacon-label">Enter</span>
            <strong>Scroll to begin the journey</strong>
          </div>
          <div className="nav-beacon-direction nav-beacon-direction-down">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="illustration">
          <img
            src={myPic}
            alt="M Gourav illustration"
            className="profile-image"
            ref={imageRef}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      <div className="footer-overlay">
        <div className="footer-content">
          <span className="footer-text" ref={footerLeftRef}>
            © M Gourav
          </span>
          <div className="footer-icons" ref={footerRightRef}>
            <a
              href="https://github.com/gourav1405"
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
