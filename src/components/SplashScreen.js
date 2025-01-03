// SplashScreen.js
import React, { useEffect } from "react";
import "./SplashScreen.css"; 

const SplashScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Add a fade-out effect before hiding
      document.body.classList.add("fade-out");
    }, 2500); // Fade out before transitioning to the app content

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="splash-screen">
      <a href="https://maatramfoundation.com" target="_blank" rel="noopener noreferrer">
        <img 
          src="https://www.bing.com/images/blob?bcid=r4AERrz3x-0HaQ" 
          alt="Maatram Foundation Logo" 
          className="logo" 
        />
      </a>
    </div>
  );
};

export default SplashScreen;
