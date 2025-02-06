import React from "react";
import "./STYLESHEETS/Features.css";

const FeatureCard = ({ icon, title, description }) => {
    return(
        <div className="features-section">
            <h2 className="features-heading">Features</h2>
            <div className="features-grid">
                <div className="card">
                    <div className="icon">🏅</div>
                    <h3>Achievements</h3>
                    <p>Showcase athlete achievements and team accolades.</p>
                </div>
                <div className="card">
                    <div className="icon">📊</div>
                    <h3>Statistics</h3>
                    <p>Get detailed statistics on players and matches.</p>
                </div>
                <div className="card">
                    <div className="icon">📖</div>
                    <h3>Know Your Sport</h3>
                    <p>Learn the rules, history, and techniques of your favorite sports.</p>
                </div>
                <div className="card">
                    <div className="icon">👩‍🏫</div>
                    <h3>Coaches</h3>
                    <p>Connect with experienced coaches for guidance and training.</p>
                </div>
            </div>
        </div>

    );
};

export default FeatureCard;