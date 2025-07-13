import React, { useEffect, useRef } from "react";
import myPic from "../../src/assets/myPic1.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import "../styles/about.css";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const aboutWrapperRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const navigate = useNavigate();

  const lastScrollTimeRef = useRef(0);
  const scrollCooldown = 1200;
  const scrollThreshold = 30;

  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });
    tl.fromTo(aboutWrapperRef.current, { opacity: 0 }, { opacity: 1 })
      .from(imageRef.current, { opacity: 0, x: -80 }, "-=0.6")
      .from(textRef.current, { opacity: 0, x: 80 }, "-=0.6");

    if (scrollIndicatorRef.current) {
      ScrollTrigger.create({
        trigger: aboutWrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          scrollIndicatorRef.current.style.width = `${self.progress * 100}%`;
        }
      });
    }

    const handleNavigate = (path) => {
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
      const now = Date.now();
      if (now - lastScrollTimeRef.current < scrollCooldown) return;

      if (e.deltaY > scrollThreshold || e.deltaX > scrollThreshold) {
        handleNavigate("/experience");
      } else if (e.deltaY < -scrollThreshold || e.deltaX < -scrollThreshold) {
        handleNavigate("/");
      }
    };

    const handleTouchStart = (e) => {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const now = Date.now();
      if (now - lastScrollTimeRef.current < scrollCooldown) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartXRef.current;
      const deltaY = touchEndY - touchStartYRef.current;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      if (Math.max(absX, absY) < 50) return;

      if (absY > absX) {
        deltaY < 0 ? handleNavigate("/experience") : handleNavigate("/");
      } else {
        deltaX < 0 ? handleNavigate("/experience") : handleNavigate("/");
      }
    };

    const aboutEl = aboutWrapperRef.current;
    if (aboutEl) {
      aboutEl.addEventListener("wheel", handleWheel);
      aboutEl.addEventListener("touchstart", handleTouchStart);
      aboutEl.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (aboutEl) {
        aboutEl.removeEventListener("wheel", handleWheel);
        aboutEl.removeEventListener("touchstart", handleTouchStart);
        aboutEl.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [navigate]);

  return (
    <div className="about-wrapper" ref={aboutWrapperRef}>
      <div className="about-container">
        <div className="about-section">
          <div className="about-image" ref={imageRef}>
            <img src={myPic} alt="About Me" />
          </div>
          <div className="about-text" ref={textRef}>
            <p>
              My tech journey started at Silicon, where I graduated with a focus
              on development. As a front-end developer skilled in HTML, CSS, and
              JavaScript, I bring extensive experience with React Native, Ionic,
              React, Angular and frameworks to craft dynamic, responsive web and
              mobile applications.
            </p>
            <p>
              I’m driven to continuously grow my skills in modern web
              technologies, with a goal to expand into full-stack development
              soon. I’m excited to contribute to impactful projects, write
              efficient code, and collaborate with teams that prioritize
              innovation.
            </p>
            <p>
              Outside of tech, I’m an anime lover, inspired by its creativity
              and storytelling.
            </p>
            <div className="scroll-indicator" ref={scrollIndicatorRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
