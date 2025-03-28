import React, { useState } from 'react';
import { languages } from '@/utils/languages';
import styles from '@/styles/TranslateDocument.module.css';

const TranslateDocumentComponent = () => {
  const [sourceLang, setSourceLang] = useState('vi');
  const [targetLang, setTargetLang] = useState('ja');
  const [documentText, setDocumentText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { files: FileList };
  }

  const handleFileChange = (e: FileChangeEvent) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result && typeof event.target.result === 'string') {
          setDocumentText(event.target.result);
        }
        setTranslatedText(''); // Clear previous translation
      };
      reader.readAsText(file); // Assumes text files; extend for other types later
    }
  };

  const handleTranslate = () => {
    alert('Handle translate called');
    if (!documentText) return;
    // Placeholder: In a real app, call a translation API
    setTranslatedText(`Translated to ${targetLang}: ${documentText}`);
  };
  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  return (
    <>
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
      </div>
      <input
        type="file"
        className={styles.fileInput}
        onChange={handleFileChange}
        accept=".txt"
      />
      <button className={styles.translateButton} onClick={handleTranslate}>
        Translate Document
      </button>
      <div className={styles.documentContainer}>
        {translatedText ? (
          <pre>{translatedText}</pre>
        ) : (
          <p>Upload a document and click Translate to see the result here.</p>
        )}
      </div>
    </>
  );
};

export default TranslateDocumentComponent;