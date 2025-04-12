import React from 'react';
import NavBarUser from './NavBarUser';
import './STYLESHEETS/Coaches.css';
import coaches from './CoachesInfo.json';
import authorities from './AuthoritiesInfo.json';
import Footer from './Footer';

function Coaches() {
  return (
    <div>
      <NavBarUser />
      <div className="all">
        {/* Authorities Section */}
        <section className="authorities-section">
          <p className="heading">Meet the <span>Authorities</span></p>
          <p className="description">
            Our dedicated authorities ensure smooth operations and top-quality sports management.
          </p>
          <div className="authorities-container">
            {authorities.map((authority, index) => (
              <div key={index} className="authority-card">
                <img
                  src={authority.photo}
                  alt={`Authority ${authority.name}`}
                  className="authority-photo"
                />
                <div className="authority-details">
                  <h3>{authority.name}</h3>
                  <p>Role: {authority.role}</p>
                  <p>Email: {authority.email}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Coaches Section */}
        <section className="coaches-section">
          <p className="heading">Know Your <span>Coaches!</span></p>
          <p className="description">
            To provide you with assistance in the sport of your choice, we bring to you the
            finest coaches for your bright future. Let's play and learn together!
          </p>
          <div className="coaches-container">
            {coaches.map((coach, index) => (
              <div key={index} className="coach-card">
                <img
                  src={coach.photo}
                  alt={`Coach ${coach.name}`}
                  className="coach-photo"
                />
                <div className="coach-details">
                  <h3>{coach.name}</h3>
                  <p>Sport: {coach.sport}</p>
                  <p>Phone: {coach.phone}</p>
                  <p>Email: {coach.email}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
}

export default Coaches;
