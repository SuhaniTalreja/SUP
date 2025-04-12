import React from "react";
import "./STYLESHEETS/HomePage.css";
import NavBar from "./NavBar";
import Footer from './Footer';
import Features from './Features';
import UpcomingMatches from './UpcomingMatches';
import { useNavigate } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter';

function Home() {
  const navigate = useNavigate();
  return (
      <div className="home-container">
        {/* Space for the Navbar */}
        <NavBar />

        {/* Main Content */}
        <div className="intro-container">
          <div className="content-h">
            {/* Left section with tagline */}
            <div className="tagline">
              <h1 className="tagline-heading">
                <Typewriter 
                    words={['ATHELINK']} 
                    loop={true} 
                    cursor 
                    cursorStyle="|"
                    typeSpeed={100} 
                    deleteSpeed={50} 
                    delaySpeed={2000}
                />
              </h1>
              <p className="tag">Level Up Your Game, One Match at a Time.<br /></p>
              <p className="desc">Effortlessly connect, share, and engage like never before! Our platform is designed to bring communities closer, streamline communication, and enhance collaboration—all in a beautifully simple and intuitive interface. Welcome to the future of seamless interaction!</p>
              <div className="home-buttons">
                <button class="animated-button" onClick={() => navigate('/login/player')}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="arr-2" viewBox="0 0 24 24">
                    <path
                      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                  </svg>
                  <span class="text">For Players</span>
                  <span class="circle"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="arr-1" viewBox="0 0 24 24">
                    <path
                      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                  </svg>
                </button>
                
                                
                <button class="animated-button" onClick={() => navigate('/login/coach')}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="arr-2" viewBox="0 0 24 24">
                    <path
                      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                  </svg>
                  <span class="text">For Coaches</span>
                  <span class="circle"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="arr-1" viewBox="0 0 24 24">
                    <path
                      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                  </svg>
                </button>

              </div>
            </div>

            {/* Right section with image */}
            <div className="image-section">
            <img src="/IMAGES/homePageImg.png" alt="Sports" />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <Features />

        {/* Upcoming Matches Section */}
        <UpcomingMatches />

      
        {/* Footer Section */}
        <Footer />
    </div>

  );
}

export default Home;
