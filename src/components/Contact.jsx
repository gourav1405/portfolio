import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/contact.css";

const ContactPage = () => {
  const contactRef = useRef();

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

    return () => ctx.revert();
  }, []);

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
