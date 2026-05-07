import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import ReportPage from './pages/ReportPage';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [testResults, setTestResults] = useState(null);
  const [testTime, setTestTime] = useState(0);

  // Load cached data on mount
  useEffect(() => {
    const cached = localStorage.getItem('disc_report');
    if (cached) {
      try {
        const data = JSON.parse(cached);
        setTestResults(data.responses);
        setTestTime(data.timeElapsed);
        setCurrentPage('report');
      } catch (e) {
        console.log('Invalid cached data');
      }
    }
  }, []);

  const handleStartTest = () => {
    setCurrentPage('test');
  };

  const handleTestComplete = (responses, timeElapsed) => {
    // Cache the results
    const cacheData = {
      responses,
      timeElapsed,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('disc_report', JSON.stringify(cacheData));

    setTestResults(responses);
    setTestTime(timeElapsed);
    setCurrentPage('report');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setTestResults(null);
    localStorage.removeItem('disc_report');
  };

  return (
    <div className="min-h-screen bg-white font-arabic" dir="rtl">
      {currentPage === 'home' && <HomePage onStart={handleStartTest} />}
      {currentPage === 'test' && <TestPage onComplete={handleTestComplete} />}
      {currentPage === 'report' && testResults && (
        <ReportPage
          responses={testResults}
          timeElapsed={testTime}
          onBack={handleBackToHome}
        />
      )}
    </div>
  );
}

export default App;
