import React, { useEffect, useRef } from "react";
import myPic from "../../src/assets/myPic1.png";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import "../styles/about.css";

const AboutPage = () => {
  const aboutWrapperRef = useRef(null);
  const aboutContainerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const navigate = useNavigate();

  const lastScrollTimeRef = useRef(0);
  const isNavigatingRef = useRef(false);
  const wheelDeltaRef = useRef(0);
  const canNavigateRef = useRef(false);
  const scrollCooldown = 1000;
  const scrollThreshold = 140;

  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  useEffect(() => {
    const container = aboutContainerRef.current;
    canNavigateRef.current = false;
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });
    tl.fromTo(aboutWrapperRef.current, { opacity: 0 }, { opacity: 1 })
      .from(imageRef.current, { opacity: 0, x: -80 }, "-=0.6")
      .from(textRef.current, { opacity: 0, x: 80 }, "-=0.6");

    const navigationTimer = window.setTimeout(() => {
      canNavigateRef.current = true;
    }, 700);

    const handleNavigate = (path) => {
      if (isNavigatingRef.current) return;

      isNavigatingRef.current = true;
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.width =
          path === "/experience" ? "100%" : "0%";
      }
      gsap.to(aboutWrapperRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          navigate(path);
        }
      });
      lastScrollTimeRef.current = Date.now();
    };

    const handleWheel = (e) => {
      if (!container) return;
      if (!canNavigateRef.current) return;

      const now = Date.now();
      if (now - lastScrollTimeRef.current < scrollCooldown) return;

      const primaryDelta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const nearTop = container.scrollTop <= 8;
      const nearBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 8;

      if (primaryDelta > 0 && !nearBottom) {
        wheelDeltaRef.current = 0;
        return;
      }

      if (primaryDelta < 0 && !nearTop) {
        wheelDeltaRef.current = 0;
        return;
      }

      wheelDeltaRef.current += primaryDelta;

      if (wheelDeltaRef.current > scrollThreshold) {
        wheelDeltaRef.current = 0;
        handleNavigate("/experience");
      } else if (wheelDeltaRef.current < -scrollThreshold) {
        wheelDeltaRef.current = 0;
        handleNavigate("/");
      } else if (Math.abs(e.deltaY) < 4 && Math.abs(e.deltaX) < 4) {
        wheelDeltaRef.current = 0;
      }
    };

    const handleTouchStart = (e) => {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (!container) return;
      if (!canNavigateRef.current) return;

      const now = Date.now();
      if (now - lastScrollTimeRef.current < scrollCooldown) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartXRef.current;
      const deltaY = touchEndY - touchStartYRef.current;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      const nearTop = container.scrollTop <= 8;
      const nearBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 8;
      if (Math.max(absX, absY) < 50) return;

      if (absY > absX) {
        if (deltaY < 0 && nearBottom) {
          handleNavigate("/experience");
        } else if (deltaY > 0 && nearTop) {
          handleNavigate("/");
        }
      } else {
        if (deltaX < 0 && nearBottom) {
          handleNavigate("/experience");
        } else if (deltaX > 0 && nearTop) {
          handleNavigate("/");
        }
      }
    };

    const aboutEl = aboutContainerRef.current;
    if (aboutEl) {
      aboutEl.addEventListener("wheel", handleWheel);
      aboutEl.addEventListener("touchstart", handleTouchStart);
      aboutEl.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.clearTimeout(navigationTimer);
      if (aboutEl) {
        aboutEl.removeEventListener("wheel", handleWheel);
        aboutEl.removeEventListener("touchstart", handleTouchStart);
        aboutEl.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [navigate]);

  return (
    <div className="about-wrapper" ref={aboutWrapperRef}>
      <div className="about-container" ref={aboutContainerRef}>
        <div className="about-section">
          <div className="about-image" ref={imageRef}>
            <img src={myPic} alt="About Me" />
          </div>
          <div className="about-text" ref={textRef}>
            <p>
              I build products, not just interfaces. With 3+ years of experience
              as a Software Engineer, I specialize in crafting scalable,
              high-performance web and mobile applications using technologies
              like React Native, React, Angular, Node Js and modern JavaScript
              frameworks.
            </p>

            <p>
              At Rumango, I’ve worked on real-world applications in banking and
              automotive domains—designing complex UI flows, integrating APIs,
              and delivering seamless user experiences. I enjoy solving problems
              that involve performance, scalability, and clean architecture.
            </p>

            <p>
              Recently, I developed a real-time multiplayer chess platform using
              WebSockets, enabling live gameplay, matchmaking, and seamless
              reconnections—combining system design with interactive user
              experience.
            </p>

            <p>
              I’m continuously evolving as a developer, currently expanding into
              full-stack development with a growing focus on backend systems and
              system design. Outside of tech, I find inspiration in anime, drawn
              to its creativity and storytelling.
            </p>
            <div className="scroll-indicator" ref={scrollIndicatorRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
