import React, { useState, useMemo } from "react";
import { Instagram, X, Linkedin, Share2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./STYLESHEETS/SmartPost.css";
import NavBarUser from "./NavBarUser";
import Footer from "./Footer";

const sportsOptions = [
  "Badminton",
  "Basketball",
  "Cricket",
  "Football",
  "Tennis",
  "Volleyball",
];
const positions = ["1st Place", "2nd Place", "3rd Place", "Participated"];
const genderOptions = ["Male", "Female"];

const SmartPost = () => {
  const [gender, setGender] = useState("");
  const [sport, setSport] = useState("");
  const [position, setPosition] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  // Generate a customized image prompt
  const imagePrompt = useMemo(() => {
    if (!sport || !position || !gender)
      return "A generic sports achievement poster";

    let prompt = `A poster of a ${gender} athlete celebrating after winning ${position} in a ${sport} tournament. Congratulations message displayed.`;

    if (specifications) {
      prompt += ` Additional details: ${specifications}.`;
    }

    return prompt;
  }, [gender, sport, position, specifications]);

  const imageUrl = useMemo(() => {
    const options = {
      width: 1080,
      height: 1080,
      model: "flux",
      seed: 864252,
      nologo: true,
      enhance: true,
    };
    const params = new URLSearchParams(options);
    return `https://pollinations.ai/p/${encodeURIComponent(
      imagePrompt
    )}?${params.toString()}`;
  }, [imagePrompt]);

  const generateCaption = async () => {
    if (!sport || !position || !gender) {
      alert("Please fill in all fields before generating a caption.");
      return;
    }

    setLoading(true);
    const genAI = new GoogleGenerativeAI(
      "AIzaSyDeskCnC-SB3hAwRjGkkhc7Gi7XQpjpaMI"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    let captionPrompt = `Generate a social media caption in about 40 words. I just won ${position} in a ${sport} tournament at my college. Gender: ${gender}. Make it exciting and celebratory!`;

    try {
      const result = await model.generateContent(captionPrompt);
      const response = await result.response.text();
      setCaption(response);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setCaption("Error generating caption. Try again!");
    }
    setLoading(false);
  };

  const sharePost = async () => {
    if (!caption) {
      alert("Please generate a caption first!");
      return;
    }

    try {
      const shareData = {
        title: "My Championship Win!",
        text: caption,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert("Sharing is not supported on this device.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Error sharing the post.");
    }
  };

  return (
    <div><NavBarUser />
    <div className="smart-post">
      <div className="smart-post__container">
        <h1 className="smart-post__title">Smart Post Generator</h1>
        
        <div className="smart-post__card">
          <div className="smart-post__content">
            {/* Form Section */}
            <div className="smart-post__form">
              <h2 className="smart-post__subtitle">Achievement Details</h2>
              
              <div className="smart-post__inputs">
                <select 
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="smart-post__select"
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>

                <select
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  className="smart-post__select"
                >
                  <option value="">Select Sport</option>
                  {sportsOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>

                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="smart-post__select"
                >
                  <option value="">Select Position</option>
                  {positions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>

                <textarea
                  placeholder="Additional specifications (optional)"
                  value={specifications}
                  onChange={(e) => setSpecifications(e.target.value)}
                  className="smart-post__textarea"
                />

                <button
                  onClick={generateCaption}
                  disabled={loading}
                  className="smart-post__button"
                >
                  {loading ? "Generating..." : "Generate Caption"}
                </button>
              </div>
            </div>

            {/* Preview Section */}
            <div className="smart-post__preview">
              <h2 className="smart-post__subtitle">Preview</h2>
              
              <div className="smart-post__image-container">
                <img
                  src={imageUrl}
                  alt="Generated preview"
                  className="smart-post__image"
                />
              </div>

              {caption && (
                <div className="smart-post__caption-container">
                  <p className="smart-post__caption">{caption}</p>
                </div>
              )}

              <div className="smart-post__actions">
                <div className="smart-post__social-buttons">
                  <button className="smart-post__social-button">
                    <Instagram className="smart-post__icon" />
                  </button>
                  <button className="smart-post__social-button">
                    <X className="smart-post__icon" />
                  </button>
                  <button className="smart-post__social-button">
                    <Linkedin className="smart-post__icon" />
                  </button>
                </div>
                
                <button
                  onClick={sharePost}
                  className="smart-post__share-button"
                >
                  <Share2 className="smart-post__share-icon" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default SmartPost;
