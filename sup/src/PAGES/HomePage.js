import React from "react";
import "./STYLESHEETS/HomePage.css";
import NavBar from "./NavBar";
import Footer from './Footer';
import Features from './Features';
import UpcomingMatches from './UpcomingMatches'
function Home() {
  return (
      <div className="home-container">
        {/* Space for the Navbar */}
        <NavBar />

        {/* Main Content */}
        <div className="intro-container">
          <div className="content-h">
            {/* Left section with tagline */}
            <div className="tagline">
              <h1 className="logo">ATHELINK</h1>
              <p className="tag">Level Up Your Game, One Match at a Time.<br /></p>
              <p className="desc">Effortlessly connect, share, and engage like never before! Our platform is designed to bring communities closer, streamline communication, and enhance collaboration—all in a beautifully simple and intuitive interface. Welcome to the future of seamless interaction!</p>
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
