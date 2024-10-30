import React, { useState } from 'react';

const TranslateComponent = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLang, setTargetLang] = useState('es'); // Default language

  const translateText = async () => {
    try {
      const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: inputText,
          source: 'en', // Adjust if needed, or make dynamic
          target: targetLang,
          format: 'text',
        }),
      });
      const result = await response.json();
      setTranslatedText(result.translatedText);
    } catch (error) {
      console.error('Translation failed:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        {/* Add more languages */}
      </select>
      <button onClick={translateText}>Translate</button>
      {translatedText && <p>Translated: {translatedText}</p>}
    </div>
  );
};

export default TranslateComponent;