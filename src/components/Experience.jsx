import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import "../styles/experience.css";

const officeWork = [
  {
    year: "Aug 2024 - Jan 2025",
    company: "Rumango Software and Consulting Services Pvt Ltd.",
    title: "CAR-DEALER MOBILE",
    subtitle: "Software Developer • Multi-role mobile application",
    points: [
      "Developed a mobile application for a car dealership supporting roles like Manager, Sales, Admin, and Management.",
      "Built responsive UI and managed state using Ionic Angular and NgRx for smooth multi-role interactions.",
      "Collaborated directly with clients to resolve issues and deliver feature enhancements.",
      "Successfully launched the app, now actively used on Google Play Store and App Store."
    ],
    stack: "Ionic 7 • Angular • NgRx • TypeScript • Cordova"
  },
  {
    year: "Jan 2024 - Present",
    company: "Rumango Software and Consulting Services Pvt Ltd.",
    title: "ICUST MOBILE BANKING",
    subtitle: "Software Developer • Mobile Banking",
    points: [
      "Architected UI components with React Native and TypeScript for Mobile Banking, Internet Banking, and Wallet Banking flows.",
      "Integrated RESTful APIs using Axios to keep interactions dynamic and responsive.",
      "Implemented advanced form handling with React Hook Form, conditional fields, and validations.",
      "Used Context API and custom hooks to manage shared state across screens without prop drilling.",
      "Built smooth navigation flows with Expo Router and shared state across routes."
    ],
    stack:
      "React Native • TypeScript • React Hook Form • Axios • Context API • Redux • Expo Router"
  },
  {
    year: "May 2023 - Jan 2026",
    company: "Rumango Software and Consulting Services Pvt Ltd.",
    title: "ICUST",
    subtitle: "Software Developer • Modular enterprise platform",
    points: [
      "Engineered modular UI components in Angular 14 to improve maintainability and reduce feature delivery time.",
      "Optimized components, reducing average load time by 25% and improving user retention.",
      "Enhanced and integrated features across ICUST Website, Loan Creation, Internet Banking, Agent Banking, KYC, Onboarding, Task Summary, Teller, and Maintenance."
    ],
    stack: "Angular 14 • TypeScript • HTML • CSS"
  }
];

const personalProjects = [
  {
    year: "Personal Project",
    title: "CHESS GAME",
    subtitle: "Interactive logic-based game build",
    points: [
      "Developed a full-stack multiplayer chess application with React, Express, WebSockets, Prisma, and PostgreSQL, enabling realtime gameplay between authenticated users.",
      "Implemented OAuth login and JWT-based session flow to connect authenticated users across HTTP and WebSocket services.",
      "Built matchmaking, room joining, move broadcasting, game result handling, and move persistence with board-state reconstruction for rejoining ongoing or past games.",
      "Structured the project as a Turborepo monorepo with shared packages for UI, state, linting, and TypeScript configuration,improving scalability and maintainability"
    ],
    stack: "React • Express • Websocket • Prisma • PostgreSQL"
  },
  {
    year: "Personal Project",
    title: "TODO APPLICATION",
    subtitle: "Dockerized authentication-based task manager",
    points: [
      "Developed a Dockerized full-stack Todo application with secure user authentication and personalized task management.",
      "Implemented JWT-based authentication and bcrypt password hashing to protect APIs and user data.",
      "Designed database schema using Prisma ORM with PostgreSQL, including migrations and data persistence.",
      "Built RESTful APIs for CRUD operations, enabling efficient management of user-specific todos."
    ],
    stack: "Node.js • Express • PostgreSQL • Prisma • JWT • Docker"
  }
];

const ExperiencePage = () => {
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

    const ctx = gsap.context(() => {
      gsap.from(".experience-hero > *", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out"
      });

      gsap.from(".lane-card", {
        opacity: 0,
        y: 48,
        duration: 0.8,
        stagger: 0.12,
        delay: 0.25,
        ease: "power2.out"
      });

      gsap.from(".experience-divider", {
        scaleX: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out"
      });
    }, containerRef);

    const navigateTo = (path) => {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;

      gsap.to(containerRef.current, {
        opacity: 0,
        y: path === "/about" ? 50 : -50,
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
        navigateTo("/about");
      } else if (nearBottom && wheelDeltaRef.current > 120) {
        wheelDeltaRef.current = 0;
        navigateTo("/skills");
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
          navigateTo("/about");
        }
      } else if (nearBottom) {
        if ((absY >= absX && deltaY < -60) || (absX > absY && deltaX < -60)) {
          navigateTo("/skills");
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
    };
  }, [navigate]);

  return (
    <div className="experience-wrapper" ref={containerRef}>
      <section className="experience-hero">
        <span className="experience-kicker">Experience</span>
        <h2>
          Professional delivery on one side. Personal obsession on the other.
        </h2>
        <p>
          This section now separates the work I shipped in a real company setup
          from the projects I built to sharpen logic, UI quality, and product
          thinking on my own.
        </p>
      </section>

      <div className="experience-divider" />

      <section className="experience-showcase">
        <div className="experience-lane office-lane">
          <div className="lane-header">
            <span className="lane-tag">PROFESSIONAL EXPERIENCE</span>
            <h3>Rumango Software and Consulting Services Pvt Ltd.</h3>
            <p>
              Software Developer • Feb 2023 - Present • Production work across
              mobile apps, banking flows, and enterprise modules.
            </p>
          </div>

          <div className="lane-cards">
            {officeWork.map((item) => (
              <article className="lane-card office-card" key={item.title}>
                <div className="lane-card-top">
                  <span className="lane-year">{item.year}</span>
                  <span className="lane-subtitle">{item.subtitle}</span>
                </div>
                <p className="lane-company">{item.company}</p>
                <h4>{item.title}</h4>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <p className="lane-stack">{item.stack}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="experience-lane personal-lane">
          <div className="lane-header">
            <span className="lane-tag personal-tag">PROJECTS</span>
            <h3>Built to explore and sharpen</h3>
            <p>
              Personal builds where I push beyond office requirements and work
              on interaction detail, logic, and UI craft.
            </p>
          </div>

          <div className="lane-cards personal-cards">
            {personalProjects.map((item) => (
              <article className="lane-card personal-card" key={item.title}>
                <div className="lane-card-top">
                  <span className="lane-year">{item.year}</span>
                  <span className="lane-subtitle">{item.subtitle}</span>
                </div>
                <h4>{item.title}</h4>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <p className="lane-stack">{item.stack}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="nav-beacon experience-beacon" aria-hidden="true">
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
          <span className="nav-beacon-label">Warp Gate</span>
          <strong>About above • Skills below</strong>
        </div>
        <div className="nav-beacon-direction nav-beacon-direction-down">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
