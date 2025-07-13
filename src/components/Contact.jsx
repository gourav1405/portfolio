import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import "../styles/contact.css";

const ContactPage = () => {
  const contactRef = useRef();
  const navigate = useNavigate();
  const isNavigatingRef = useRef(false);
  const [allowNavigation, setAllowNavigation] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-wrapper", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });

      gsap.from([".contact-heading", ".contact-item"], {
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
      if (!isNavigatingRef.current && e.deltaY < 0) {
        isNavigatingRef.current = true;
        navigate("/skills");
      }
    };

    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchEndY = e.touches[0].clientY;
      const diffY = touchEndY - touchStartY;

      if (diffY > 50 && !isNavigatingRef.current) {
        isNavigatingRef.current = true;
        navigate("/skills");
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [allowNavigation, navigate]);

  return (
    <div className="contact-wrapper" ref={contactRef}>
      <h2 className="contact-heading">CONTACT</h2>
      <div className="contact-item">
        <strong>EMAIL:</strong> gouravsai63@gmail.com
      </div>
      <div className="contact-item">
        <strong>PHONE:</strong> +91 821-721-1105
      </div>
      <div className="contact-item">
        <strong>LOCATION:</strong> Bengaluru, Karnataka
      </div>
    </div>
  );
};

export default ContactPage;
