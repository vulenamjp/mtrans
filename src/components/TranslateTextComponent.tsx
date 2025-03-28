import React, { useState, useEffect } from 'react';
import { languages } from '@/utils/languages';
import { generateResponse, Message } from '@/utils/ai'; // Import the generateResponse method
import styles from '@/styles/TranslateText.module.css';

const TranslateTextComponent = () => {
  const [sourceLang, setSourceLang] = useState('vi');
  const [targetLang, setTargetLang] = useState('ja');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  // Simulate translation with debouncing
  useEffect(() => {
    if (!inputText) {
      setOutputText('');
      return;
    }
    const timer = setTimeout(() => {
      handleTranslate();
    }, 500); // Debounce for 500ms
    return () => clearTimeout(timer);
  }, [inputText, sourceLang, targetLang]);

  const handleTranslate = async () => {
    if (!inputText) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: inputText }],
          sourceLang,
          targetLang,
        }),
      });

      const data = await response.json();
      setOutputText(data.response || 'Error translating text.');
    } catch (error) {
      console.error('Error translating text:', error);
      setOutputText('Error translating text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  return (
    <div>
      <div className={styles.header}>
        <select
          className={styles.select}
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <button className={styles.swapButton} onClick={swapLanguages}>
          Swap
        </button>
        <select
          className={styles.select}
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <button
          className={styles.glossaryButton}
          onClick={() => alert('Add Glossaries feature coming soon')}
        >
          Add Glossaries
        </button>
      </div>
      <div className={styles.textAreas}>
        <textarea
          className={styles.textArea}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to translate"
          rows={5}
          cols={50}
        />
        <textarea
          className={`${styles.textArea} ${styles.readOnly}`}
          value={isLoading ? 'Translating...' : outputText} // Show loading message
          readOnly
          placeholder="Translation"
          rows={5}
          cols={50}
        />
      </div>
    </div>
  );
};

export default TranslateTextComponent;