import React, { useEffect, useState } from "react";
import "./STYLESHEETS/Dashboard.css";
import NavBarUser from "./NavBarUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
/* global VANTA */

function Dashboard() {
  const [timeOfDay, setTimeOfDay] = useState("afternoon");

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setTimeOfDay("morning");
    } else if (currentHour < 18) {
      setTimeOfDay("afternoon");
    } else {
      setTimeOfDay("evening");
    }

    // Initialize Vanta.js Waves effect
    const wavesEffect = VANTA.WAVES({
      el: "#waves-background",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x173b61,
      shininess: 29.0,
      waveHeight: 19.5,
      waveSpeed: 0.75,
    });

    // Cleanup effect on component unmount
    return () => {
      if (wavesEffect) {
        wavesEffect.destroy();
      }
    };
  }, []);

  axios.defaults.withCredentials = true;
  const [name,setName] = useState('');
  const[sport,setSport] =useState('');
  const navigate=useNavigate();
  useEffect(() => {
    axios.get('http://localhost:3001/dashboard')
      .then(res => {
        if (res.data.valid) {
          setName(res.data.username);
          setSport(res.data.sport);  
        } else {
          navigate('/login/player');
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);  

  return (
    <div>
      <NavBarUser />
      <div className="all">
        <div className="dashboard-container">
          <div className="rectangle">
            {/* Upper section for Vanta.js Waves effect */}
            <div id="waves-background" className="upper-section"></div>

            <div className="lower-section">
              <p className="heading">
                Welcome <span>{name}!</span>
                <br /> How are you feeling this <span>{timeOfDay}?</span>
                <br /> How was <span>{sport}</span> practice?
              </p>
            </div>

            <div className="circle">
              <img
                src={`${process.env.PUBLIC_URL}/IMAGES/user.png`}
                alt="User"
                className="circle-img"
              />
            </div>
          </div>
        </div>
        <p className="heading"><a href="/user-profile"><span>Your first time logging in? </span>Update your profile now!</a></p>
        <p className="heading-2">
          Let's Get <span>Started!</span>
        </p>
        <div className="features">
          {/* Flip card components */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <p className="title">Upcoming Matches</p>
                <p>Hover Me</p>
              </div>
              <div className="flip-card-back">
                <p className="title">BACK</p>
                <div className="button-container">
                  <button href="/matches" className="button" style={{ "--clr": "#fd8916" }} onClick={() => navigate("/matches")}>
                    <span className="button__icon-wrapper">
                      <svg
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="button__icon-svg"
                        width="10"
                      >
                        <path
                          d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <svg
                        viewBox="0 0 14 15"
                        fill="none"
                        width="10"
                        xmlns="http://www.w3.org/2000/svg"
                        className="button__icon-svg button__icon-svg--copy"
                      >
                        <path
                          d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    Explore All
                  </button>
                </div>
                <p>Leave Me</p>
              </div>
            </div>
          </div>

          {/* Additional flip cards */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <p className="title">Rewards</p>
                <p>Hover Me</p>
              </div>
              <div className="flip-card-back">
                <p className="title">BACK</p>
                <div className="button-container">
                  <button href="#" className="button" style={{ "--clr": "#fd8916" }} onClick={() => navigate("/smart-post")}>
                    <span className="button__icon-wrapper">
                      <svg
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="button__icon-svg"
                        width="10"
                      >
                        <path
                          d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <svg
                        viewBox="0 0 14 15"
                        fill="none" 
                        width="10"
                        xmlns="http://www.w3.org/2000/svg"
                        className="button__icon-svg button__icon-svg--copy"
                      >
                        <path
                          d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    Explore All
                  </button>
                </div>
                <p>Leave Me</p>
              </div>
            </div>
          </div>

          {/* Flip card for Coaches */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <p className="title">Coaches</p>
                <p>Hover Me</p>
              </div>
              <div className="flip-card-back">
                <p className="title">BACK</p>
                <div className="button-container">
                  <button href="/coaches" className="button" style={{ "--clr": "#fd8916" }} onClick={() => navigate("/coaches")}>
                    <span className="button__icon-wrapper">
                      <svg
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="button__icon-svg"
                        width="10"
                      >
                        <path
                          d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <svg
                        viewBox="0 0 14 15"
                        fill="none"
                        width="10"
                        xmlns="http://www.w3.org/2000/svg"
                        className="button__icon-svg button__icon-svg--copy"
                      >
                        <path
                          d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    Explore All
                  </button>
                </div>
                <p>Leave Me</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
