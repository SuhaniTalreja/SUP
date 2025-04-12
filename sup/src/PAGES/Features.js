import React from "react";
import "./STYLESHEETS/Features.css";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="features-section">
      <h2 className="features-heading">Features</h2>
      <div className="features-grid">
        <div className="card">
          <div className="icon">🧠</div>
          <h3>SmartPost</h3>
          <p>
            Auto-generate match posters and captions for social media with just
            one click.
          </p>
        </div>
        <div className="card">
          <div className="icon">📜</div>
          <h3>Automatic Certificates</h3>
          <p>
            Instantly generate and share participation and winning certificates
            for events.
          </p>
        </div>
        <div className="card">
          <div className="icon">📖</div>
          <h3>Know Your Sport</h3>
          <p>
            Explore the rules, formats, and history of all university-level
            sports.
          </p>
        </div>
        <div className="card">
          <div className="icon">🎓</div>
          <h3>Know Your Coaches & Authorities</h3>
          <p>
            Meet your sports mentors and organizing authorities—know who guides
            you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
