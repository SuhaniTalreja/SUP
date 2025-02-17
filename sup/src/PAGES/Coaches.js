import React from 'react';
import NavBarUser from './NavBarUser';
import './STYLESHEETS/Coaches.css';
import coaches from './CoachesInfo.json';

function Coaches() {
  return (
    <div>
      <NavBarUser />
      <div className="all">
        <p className="heading">Know Your <span> Coaches!</span></p>
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
      </div>
    </div>
  );
}

export default Coaches;
