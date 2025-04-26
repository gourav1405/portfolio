import React, { useEffect, useRef } from "react";
import "../styles/skills.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "Illustration", icon: "../../src/assets/html.png" },
  { name: "Photography", icon: "../../src/assets/css.png" },
  { name: "Videography", icon: "../../src/assets/javascript.png" },
  { name: "Video Editing", icon: "../../src/assets/typescript.png" },
  { name: "Web Development", icon: "../../src/assets/angularjs.png" },
  { name: "Data Analysis", icon: "../../src/assets/reactnative.png" },
  { name: "Graphic Design", icon: "../../src/assets/react.png" },
  { name: "Motion Graphics", icon: "../../src/assets/redux.png" },
  { name: "Git Versioning", icon: "../../src/assets/git.png" },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const horizontalRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const horizontal = horizontalRef.current;
    const totalWidth = horizontal.scrollWidth;

    gsap.to(horizontal, {
      x: () => `-${totalWidth - window.innerWidth}px`,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Landing Animation
    gsap.from(".skills-title", {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(".skill-card", {
      opacity: 0,
      scale: 0.5,
      stagger: 0.2,
      delay: 0.5,
      duration: 1,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <section className="skills-section" ref={sectionRef}>
      <h1 className="skills-title">Skills</h1>
      <div className="skills-horizontal" ref={horizontalRef}>
        {skills.map((skill, index) => (
          <div key={index} className="skill-card">
            <img src={skill?.icon} alt={skill?.name} className="skill-icon" />
            <p className="skill-name">{skill?.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
