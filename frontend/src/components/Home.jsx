import React, { useState, useEffect } from 'react';

import BackgroundImage from '../assets/backgroundImage';


const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
      <div className="video-container">
      <BackgroundImage />
      </div>
    </>
  );
};


export default Home;
