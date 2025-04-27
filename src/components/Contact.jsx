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
      gsap.from(".contact-heading", {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(".contact-item", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.3,
        delay: 0.5,
        ease: "power2.out",
      });
    }, contactRef);

    const timeout = setTimeout(() => {
      setAllowNavigation(true);
    }, 1500);

    return () => {
      ctx.revert();
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!allowNavigation) return;

    const handleWheel = (e) => {
      if (!isNavigatingRef.current) {
        isNavigatingRef.current = true;
        if (e.deltaY < 0 || e.deltaX < 0) {
          navigate("/skills");
        } else if (e.deltaY > 0 || e.deltaX > 0) {
          navigate("/skills");
        }
      }
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!isNavigatingRef.current) {
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        if (Math.abs(diffX) > 50 || Math.abs(diffY) > 50) {
          isNavigatingRef.current = true;
          navigate("/skills");
        }
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
