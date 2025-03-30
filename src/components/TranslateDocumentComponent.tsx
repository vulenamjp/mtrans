import React, { useState } from 'react';
import { languages } from '@/utils/languages';
import styles from '@/styles/TranslateDocument.module.css';

const TranslateDocumentComponent = () => {
  const [sourceLang, setSourceLang] = useState('vi');
  const [targetLang, setTargetLang] = useState('ja');
  const [documentText, setDocumentText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { files: FileList };
  }

  const handleFileChange = async (e: FileChangeEvent) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('pdfFile', file);

    setIsLoading(true);
    try {
      const response = await fetch('/api/extracttext', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to extract text from the PDF file.');
      }

      const data = await response.json();
      setDocumentText(data.text || ''); // Set the extracted text
      setTranslatedText(''); // Clear previous translation
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      setDocumentText('Error extracting text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslate = () => {
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
        accept=".pdf"
      />
      {isLoading && <p>Extracting text from PDF...</p>}
      <button className={styles.translateButton} onClick={handleTranslate} disabled={isLoading}>
        Translate Document
      </button>
      <div className={styles.documentContainer}>
        {translatedText ? (
          <pre>{translatedText}</pre>
        ) : (
          <p>{documentText || 'Upload a document and click Translate to see the result here.'}</p>
        )}
      </div>
    </>
  );
};

export default TranslateDocumentComponent;