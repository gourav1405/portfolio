import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "Illustration", icon: htmlIcon },
  { name: "Photography", icon: cssIcon },
  { name: "Videography", icon: jsIcon },
  { name: "Video Editing", icon: tsIcon },
  { name: "Web Development", icon: angularIcon },
  { name: "Data Analysis", icon: reactNativeIcon },
  { name: "Graphic Design", icon: reactIcon },
  { name: "Motion Graphics", icon: reduxIcon },
  { name: "Git Versioning", icon: gitIcon },
];

const Skills = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const horizontal = container.querySelector(".skills-horizontal");
    const slides = gsap.utils.toArray(".skill-card");
    const totalWidth = horizontal.scrollWidth;
    const windowWidth = window.innerWidth;
    const scrollDistance = totalWidth - windowWidth + 20;
    document.body.style.height = `${
      scrollDistance + window.innerHeight + 20
    }px`;

    let ctx = gsap.context(() => {
      gsap.to(".skills-horizontal", {
        x: () => `-${scrollDistance}px`,
        ease: "none",
        scrollTrigger: {
          trigger: ".pin-wrap",
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const direction = self.direction;

            if (progress < 0.02 && direction < 0 && !hasNavigatedRef.current) {
              hasNavigatedRef.current = true;
              ScrollTrigger.getAll().forEach((t) => t.kill());
              requestAnimationFrame(() => navigate("/experience"));
            } else if (
              progress >= 1 &&
              direction > 0 &&
              !hasNavigatedRef.current
            ) {
              hasNavigatedRef.current = true;
              ScrollTrigger.getAll().forEach((t) => t.kill());
              requestAnimationFrame(() => navigate("/contact"));
            } else if (progress > 0.05 && progress < 0.95) {
              hasNavigatedRef.current = false;
            }
          },
        },
      });

      gsap.fromTo(
        slides,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".skills-horizontal",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".skills-title",
        { opacity: 0, y: -100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skills-title",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf("*");
      document.body.style.height = "";
    };
  }, [navigate]);

  return (
    <div className="skills-wrapper" ref={containerRef}>
      <div className="pin-wrap">
        <div className="skills-title">Skills</div>
        <div className="skills-horizontal">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <img src={skill.icon} alt={skill.name} className="skill-icon" />
              {/* <p className="skill-name">{skill.name}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
