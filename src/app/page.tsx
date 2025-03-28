'use client';
// app/pages.tsx

import React, { useState } from 'react';
import TranslateTextComponent from '@/components/TranslateTextComponent';
import TranslateDocumentComponent from '@/components/TranslateDocumentComponent';
import styles from "@/styles/Tabs.module.css";
import textStyles from "@/styles/TranslateText.module.css";
import documentStyles from "@/styles/TranslateDocument.module.css";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('translateText');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>mtrans: AI translation tool</h1>
      <div className={styles.tabs}>
        <button
          className={styles.tabButton}
          onClick={() => setActiveTab('translateText')}
          style={{ fontWeight: activeTab === 'translateText' ? 'bold' : 'normal' }}
        >
          Translate Text
        </button>
        <button
          className={styles.tabButton}
          onClick={() => setActiveTab('translateDocument')}
          style={{ fontWeight: activeTab === 'translateDocument' ? 'bold' : 'normal' }}
        >
          Translate Document
        </button>
        <button
          className={styles.tabButton}
          onClick={() => setActiveTab('translateWithStyle')}
          style={{ fontWeight: activeTab === 'translateWithStyle' ? 'bold' : 'normal' }}
        >
          Translate with Style
        </button>
      </div>
      {activeTab === 'translateText' && <TranslateTextComponent />}
      {activeTab === 'translateDocument' && <TranslateDocumentComponent/>}
      {activeTab === 'translateWithStyle' && <div className={styles.comingSoon}>Translate with Style coming soon</div>}
    </div>
  );
};

export default HomePage;