import React, { useMemo } from 'react';

const GeneratedImageComponent = () => {
  const prompt = "A poster of a girl winning in a badminton tournament with congratulations written over it";
  const options = {
    width: 1080,
    height: 1080,
    model: 'flux',
    seed: 864252,
    nologo: true,
    enhance: true,
  };

  const imageUrl = useMemo(() => {
    const params = new URLSearchParams(options);
    return `https://pollinations.ai/p/${encodeURIComponent(prompt)}?${params.toString()}`;
  }, [prompt, options]);

  return (
    <div>
      <h1>Generated Image</h1>
      {imageUrl ? <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%' }} /> : <p>Loading...</p>}
    </div>
  );
};

export default GeneratedImageComponent;
