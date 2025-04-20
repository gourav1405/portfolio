import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import "../styles/experience.css";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "ICUST MOBILE BANKING",
    year: "2024",
    description: (
      <>
        • Built scalable and reusable <em>UI components</em> using{" "}
        <strong>React Native</strong> and <strong>TypeScript</strong>.
        <br />• Integrated <strong>RESTful APIs</strong> via{" "}
        <strong>Axios</strong> for real-time banking.
        <br />• Used <strong>React Hook Form</strong> for nested form control
        and validation.
        <br />• Managed global state with <strong>Context API</strong> + custom
        hooks.
        <br />• Built seamless navigation using <strong>Expo Router</strong>.
        <br />
        <br />
        <span style={{ fontSize: "0.9rem", color: "#999" }}>
          <strong>Tech Stack:</strong> React Native, TypeScript, React Hook
          Form, Axios, Context API, Expo Router
        </span>
      </>
    ),
  },
  {
    title: "CAR-DEALER MOBILE",
    year: "2023",
    description: (
      <>
        • Contributed to a car dealership app supporting various{" "}
        <em>user roles</em> like Manager, Sales, and Admin.
        <br />• Built a <em>responsive UI</em> and used{" "}
        <strong>Ionic Angular</strong> + <strong>NgRx</strong> for state
        management.
        <br />
        • Worked closely with clients, implementing feature requests and
        resolving issues.
        <br />• Successfully launched on <strong>
          Google Play Store
        </strong> & <strong>App Store</strong>.
        <br />
        <br />
        <span style={{ fontSize: "0.9rem", color: "#999" }}>
          <strong>Tech Stack:</strong> Ionic 7, Cordova, Angular, NgRx,
          TypeScript
        </span>
      </>
    ),
  },
  {
    title: "ICUST WEB PLATFORM",
    year: "2023",
    description: (
      <>
        • Developed a responsive web interface for seamless banking experiences.
        <br />
        • Implemented KYC, onboarding, loan management & task workflows with
        multi-level approvals.
        <br />
        • Created admin tools: user roles, branches, locations, and
        configuration screens.
        <br />
        • Enabled dynamic data verification/editing to improve real-time data
        accuracy.
        <br />
        • Enhanced system accountability through advanced approval processes.
        <br />
        <br />
        <span style={{ fontSize: "0.9rem", color: "#999" }}>
          <strong>Tech Stack:</strong> Angular 14, TypeScript, HTML, CSS
        </span>
      </>
    ),
  },
];

const ExperiencePage = () => {
  const containerRef = useRef();
  const hasNavigatedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const container = containerRef.current;
    const slides = gsap.utils.toArray(".exp-slide");

    let ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power2.out" }
      );
      gsap.from(".experience-track", {
        opacity: 0,
        x: 100,
        duration: 1,
        ease: "power3.out",
      });
      gsap.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          snap: 1 / (slides.length - 1),
          end: () => `+=${window.innerWidth * slides.length}`,
          onUpdate: (self) => {
            const progress = self.progress;
            const direction = self.direction;

            if (progress < 0.02 && direction < 0 && !hasNavigatedRef.current) {
              hasNavigatedRef.current = true;
              ScrollTrigger.getAll().forEach((t) => t.kill());
              navigate("/about");
            } else if (
              progress > 0.98 &&
              direction > 0 &&
              !hasNavigatedRef.current
            ) {
              hasNavigatedRef.current = true;
              ScrollTrigger.getAll().forEach((t) => t.kill());
              navigate("/skills");
            } else if (progress > 0.05 && progress < 0.95) {
              hasNavigatedRef.current = false;
            }
          },
        },
      });
      slides.forEach((slide) => {
        gsap.fromTo(
          slide.querySelector(".exp-card"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: slide,
              start: "top 80%", // Trigger when the top of the slide is 80% into the viewport
              end: "bottom top", // End when the bottom of the slide reaches the top of the viewport
              toggleActions: "play none none reverse", // Play animation when scrolling to this slide, and reverse when scrolling away
            },
          }
        );
      });
      gsap.fromTo(
        ".scroll-hint",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          delay: 0.6,
          duration: 1,
          ease: "power2.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [navigate]);

  return (
    <div className="experience-wrapper" ref={containerRef}>
      <div className="experience-track">
        {experiences.map((exp, index) => (
          <div className="exp-slide" key={index}>
            <div className="exp-card">
              <h3>{exp.title}</h3>
              <p>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="scroll-hint" id="scroll-hint">
        Scroll to explore
      </div>
    </div>
  );
};

export default ExperiencePage;
