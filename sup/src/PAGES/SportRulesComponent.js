import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../PAGES/STYLESHEETS/SportRulesComponent.css";
import NavBarUser from "./NavBarUser";
import Footer from "./Footer";

const SportRulesComponent = () => {
  const [sportName, setSportName] = useState("");
  const [rules, setRules] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideIntervalRef = useRef(null);

  const carouselImages = [
    "/IMAGES/sport-1.jpeg",
    "/IMAGES/sport-2.jpeg",
    "/IMAGES/sport-3.jpeg",
  ];

  useEffect(() => {
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 2500);

    return () => clearInterval(slideIntervalRef.current);
  }, []);

  const fetchSportRules = async () => {
    if (!sportName.trim()) return;

    setLoading(true);
    setError(null);
    setRules(null);

    try {
      const formattedName = sportName.toLowerCase().replace(/\s+/g, "-");
      const url = `https://www.rulesofsport.com/sports/${formattedName}.html`;

      const response = await axios.get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
      );

      if (response.data.contents) {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(
          response.data.contents,
          "text/html"
        );

        const title = htmlDoc.querySelector("h1.entry-title");

        const ruleSections = Array.from(htmlDoc.querySelectorAll("h2, h3, h4"));
        const extractedRules = [];

        ruleSections.forEach((section) => {
          if (
            section.classList.contains("widget-title") ||
            section.classList.contains("screen-reader-text")
          )
            return;

          const sectionData = {
            title: section.textContent.trim(),
            content: [],
          };

          let nextNode = section.nextElementSibling;
          while (
            nextNode &&
            !["H2", "H3", "H4", "HR"].includes(nextNode.tagName)
          ) {
            if (nextNode.tagName === "P") {
              sectionData.content.push({
                type: "paragraph",
                text: nextNode.textContent.trim(),
              });
            } else if (nextNode.tagName === "UL") {
              const items = Array.from(nextNode.querySelectorAll("li")).map(
                (li) => ({
                  type: "list-item",
                  text: li.textContent.trim(),
                })
              );
              sectionData.content.push(...items);
            }
            nextNode = nextNode.nextElementSibling;
          }

          if (sectionData.content.length > 0) {
            extractedRules.push(sectionData);
          }
        });

        setRules({
          title: title
            ? title.textContent.trim()
            : `${sportName.charAt(0).toUpperCase() + sportName.slice(1)} Rules`,
          url,
          sections: extractedRules,
        });
      } else {
        setError("No content found for this sport");
      }
    } catch (err) {
      setError(
        err.response?.status === 404
          ? `Could not find rules for "${sportName}". Please check the name and try again.`
          : "Failed to fetch rules. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSportRules();
  };

  return (
    <div className="spc">
      <NavBarUser />
      <div className="hero-banner">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Discover Sports Rules</h1>
            <p className="subheading">
              Find comprehensive rules for any sport in seconds.
              <br />
              Courtesy of Rules Of Sport!
            </p>
          </div>
          <div className="custom-carousel">
            <div
              className="custom-carousel-images"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {carouselImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="custom-carousel-image"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sport-rules-container">
        <h1>Know Your Sport!</h1>
        <form onSubmit={handleSubmit}>
          <div className="rules-input-group">
            <input
              type="text"
              value={sportName}
              onChange={(e) => setSportName(e.target.value)}
              placeholder="Enter the sport you wanna read about"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Get Rules"}
            </button>
          </div>
        </form>

        {error && <div className="error-message">{error}</div>}

        {rules && (
          <div className="rules-content">
            <h2>{rules.title}</h2>
            <p className="source-url">
              Source:{" "}
              <a href={rules.url} target="_blank" rel="noopener noreferrer">
                {rules.url}
              </a>
            </p>
            {rules.sections.map((section, index) => (
              <div key={index} className="rule-section">
                <h3>{section.title}</h3>
                {section.content.map((item, idx) =>
                  item.type === "paragraph" ? (
                    <p key={idx}>{item.text}</p>
                  ) : (
                    <ul key={idx}>
                      <li>{item.text}</li>
                    </ul>
                  )
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default SportRulesComponent;
