import React, { useState, useEffect, useRef, useCallback } from 'react';
import './STYLESHEETS/Certificate.css';
import NavBarUser from './NavBarUser';
import Footer from './Footer';
import { toPng } from 'html-to-image';
import axios from 'axios';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

const Certificate = () => {
    const ref = useRef(null);
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [matches, setMatches] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);
    const { width, height } = useWindowSize();
    const playerId = localStorage.getItem('playerId');

    useEffect(() => {
        if (!playerId) return;

        axios.get(`http://localhost:3001/player-info/${playerId}`)
            .then(res => {
                setName(res.data.name);
            })
            .catch(err => {
                console.error("Error fetching player info:", err);
            });

        axios.get(`http://localhost:3001/matches/${playerId}`)
            .then(res => {
                setMatches(res.data);
            })
            .catch(err => {
                console.error("Error fetching matches:", err);
            });
    }, [playerId]);

    const onButtonClick = useCallback(() => {
        if (ref.current === null) return;

        setShowConfetti(true); // Show confetti

        toPng(ref.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'certificate_winner.png';
                link.href = dataUrl;
                link.click();

                // Hide confetti after 3 seconds
                setTimeout(() => setShowConfetti(false), 10000);
            })
            .catch((err) => {
                console.log(err);
                setShowConfetti(false); // Hide on error too
            });
    }, [ref]);
 
    return (
        <div>
            <NavBarUser />
            {showConfetti && <Confetti width={width} height={height} />}
            <div className="certificate-page">
                <h1>Generate your Certificate 🎉</h1>
                <div className="input-inline-wrapper">
                    <label className="inline-label">Player Name</label><br />
                    <input className="name-input" type='text' value={name} disabled /><br /><br />
 
                    <label className="inline-label">Select Match</label><br />
                    <select className="match-select" value={course} onChange={(e) => setCourse(e.target.value)}>
                        <option value="">Select your match </option>
                        {matches.map(({ match_id, tournament }) => (
                            <option key={match_id} value={tournament}>
                                {tournament}
                            </option>
                        ))}
                    </select><br /><br />
                </div>
                <div className='certificate-container' ref={ref}>
                    <img src="/IMAGES/certificate_winner.png" alt="winner certificate" height={400} />
                    <div className='content-winner'>
                        <h2>{name}</h2>
                        <h3>{course}</h3>
                    </div>
                </div>

                <button className="certificate-button" onClick={onButtonClick}>Download Certificate</button>
            </div>
            <Footer />
        </div>
    );
};

export default Certificate;
