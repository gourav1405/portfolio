import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import "../styles/skills.css";

import htmlIcon from "../assets/html.png";
import cssIcon from "../assets/css.png";
import jsIcon from "../assets/javascript.png";
import tsIcon from "../assets/typescript.png";
import angularIcon from "../assets/angularjs.png";
import reactNativeIcon from "../assets/reactnative.png";
import reactIcon from "../assets/react.png";
import reduxIcon from "../assets/redux.png";
import gitIcon from "../assets/git.png";
import nodeJsIcon from "../assets/nodejs.png";
import expressIcon from "../assets/expressjs.png";
import postgresIcon from "../assets/postgres.png";
import prismaIcon from "../assets/prisma.png";

const skills = [
  {
    name: "HTML",
    icon: htmlIcon,
    description: "Semantic layouts and clean structure."
  },
  {
    name: "CSS",
    icon: cssIcon,
    description: "Responsive styling, layout systems, and polish."
  },
  {
    name: "JavaScript",
    icon: jsIcon,
    description: "Interactive UI behavior and front-end logic."
  },
  {
    name: "TypeScript",
    icon: tsIcon,
    description: "Safer, more maintainable application code."
  },
  {
    name: "Angular",
    icon: angularIcon,
    description: "Structured enterprise and dashboard applications."
  },
  {
    name: "React Native",
    icon: reactNativeIcon,
    description: "Mobile-first product experiences for real users."
  },
  {
    name: "React",
    icon: reactIcon,
    description: "Reusable component-driven web interfaces."
  },
  {
    name: "Redux",
    icon: reduxIcon,
    description: "Predictable state handling for larger apps."
  },
  {
    name: "Git",
    icon: gitIcon,
    description: "Version control and collaborative workflows."
  },
  {
    name: "Node Js",
    icon: nodeJsIcon,
    description: "Server-side JavaScript runtime environment."
  },
  {
    name: "Express Js",
    icon: expressIcon,
    description: "Fast, unopinionated, minimalist web framework for Node.js."
  },
  {
    name: "PostgreSQL",
    icon: postgresIcon,
    description: "Powerful, open-source relational database system."
  },
  {
    name: "Prisma",
    icon: prismaIcon,
    description: "Next-generation ORM for Node.js and TypeScript."
  }
];

const Skills = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const isNavigatingRef = useRef(false);
  const wheelDeltaRef = useRef(0);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const canNavigateRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    canNavigateRef.current = false;
    container.scrollTo({ top: 0, behavior: "auto" });
    const navigationTimer = window.setTimeout(() => {
      canNavigateRef.current = true;
    }, 700);

    let ctx = gsap.context(() => {
      gsap.from(".skills-intro > *", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out"
      });

      gsap.fromTo(
        ".skills-wrapper",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }
      );

      gsap.fromTo(
        ".skill-card",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.2,
          delay: 0.15
        }
      );
    }, containerRef);

    const navigateTo = (path) => {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;

      gsap.to(container, {
        opacity: 0,
        y: path === "/experience" ? 50 : -50,
        duration: 0.45,
        ease: "power2.inOut",
        onComplete: () => navigate(path)
      });
    };

    const handleWheel = (event) => {
      if (!canNavigateRef.current) return;
      if (isNavigatingRef.current) return;

      const nearTop = container.scrollTop <= 8;
      const nearBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 8;

      if (!nearTop && !nearBottom) {
        wheelDeltaRef.current = 0;
        return;
      }

      wheelDeltaRef.current += event.deltaY;

      if (nearTop && wheelDeltaRef.current < -120) {
        wheelDeltaRef.current = 0;
        navigateTo("/experience");
      } else if (nearBottom && wheelDeltaRef.current > 120) {
        wheelDeltaRef.current = 0;
        navigateTo("/contact");
      } else if (Math.abs(event.deltaY) < 4) {
        wheelDeltaRef.current = 0;
      }
    };

    const handleTouchStart = (event) => {
      touchStartXRef.current = event.touches[0].clientX;
      touchStartYRef.current = event.touches[0].clientY;
    };

    const handleTouchEnd = (event) => {
      if (!canNavigateRef.current) return;
      if (isNavigatingRef.current) return;

      const touchEndX = event.changedTouches[0].clientX;
      const touchEndY = event.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartXRef.current;
      const deltaY = touchEndY - touchStartYRef.current;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      const nearTop = container.scrollTop <= 8;
      const nearBottom =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 8;

      if (Math.max(absX, absY) < 50) return;

      if (nearTop) {
        if ((absY >= absX && deltaY > 60) || (absX > absY && deltaX > 60)) {
          navigateTo("/experience");
        }
      } else if (nearBottom) {
        if ((absY >= absX && deltaY < -60) || (absX > absY && deltaX < -60)) {
          navigateTo("/contact");
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: true });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.clearTimeout(navigationTimer);
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      ctx.revert();
      gsap.killTweensOf("*");
    };
  }, [navigate]);

  return (
    <div className="skills-wrapper" ref={containerRef}>
      <div className="skills-shell">
        <div className="skills-intro">
          <span className="skills-kicker">Skills</span>
          <h2 className="skills-title">Tools I use to build real products.</h2>
          <p className="skills-description">
            A front-end stack shaped by production work, responsiveness, and
            interface quality across web and mobile.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <img
                src={skill.icon}
                alt={skill.name}
                className="skill-icon"
                loading="lazy"
                decoding="async"
              />
              <h3 className="skill-name">{skill.name}</h3>
              <p className="skill-description">{skill.description}</p>
            </div>
          ))}
        </div>

        <div className="nav-beacon skills-beacon" aria-hidden="true">
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
            <span className="nav-beacon-label">Transit</span>
            <strong>Experience above • Contact below</strong>
          </div>
          <div className="nav-beacon-direction nav-beacon-direction-down">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
