import React, { useState } from 'react';
import axios from 'axios';

const CaptionGenerator = () => {
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const prompt = 'A football player scores a goal in the final match of a championship, winning the game for their team. Generate a caption that reflects the excitement and celebration of the moment.';

  const generateCaption = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/generate-caption', { prompt });
      setCaption(response.data.caption); // Set the generated caption
    } catch (error) {
      console.error('Error generating caption:', error);
      alert('Failed to generate a caption. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>AI Caption Generator</h1>
      <button
        onClick={generateCaption}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          color: 'white',
          backgroundColor: '#007BFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Caption'}
      </button>

      {caption && (
        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <h3>Generated Caption:</h3>
          <p style={{ fontSize: '18px' }}>{caption}</p>
        </div>
      )}
    </div>
  );
};

export default CaptionGenerator;
