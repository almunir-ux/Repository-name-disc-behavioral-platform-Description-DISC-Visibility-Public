import React, { useState, useEffect } from 'react';
import { AlertCircle, Clock } from 'lucide-react';
import { DISC_QUESTIONS, RESPONSE_SCALE } from '../data/discQuestions';

const TestPage = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [startTime] = useState(Date.now());

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimeElapsed(elapsed);
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const handleResponse = (questionId, value) => {
    const newResponses = {
      ...responses,
      [questionId]: value
    };
    setResponses(newResponses);

    // Move to next question
    if (currentQuestion < DISC_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Complete test
      onComplete(newResponses, timeElapsed);
    }
  };

  const question = DISC_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / DISC_QUESTIONS.length) * 100;
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">اختبار DISC</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span className="font-mono">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            السؤال {currentQuestion + 1} من {DISC_QUESTIONS.length}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {question.text}
            </h2>
            <p className="text-sm text-gray-500">
              {question.type === 'normal' && 'أسلوبك الطبيعي'}
              {question.type === 'stress' && 'تحت الضغط'}
              {question.type === 'verification' && 'التحقق'}
              {question.type === 'trap' && 'سؤال تحقق'}
            </p>
          </div>

          {/* Response Options */}
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => handleResponse(question.id, value)}
                className={`w-full p-4 text-right rounded-lg border-2 transition-all duration-200 font-semibold ${
                  responses[question.id] === value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <span className="block">{RESPONSE_SCALE[value].label}</span>
                <span className="text-xs text-gray-500 mt-1">القيمة: {value}</span>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => {
                if (currentQuestion > 0) {
                  setCurrentQuestion(currentQuestion - 1);
                }
              }}
              disabled={currentQuestion === 0}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              السابق
            </button>
            <button
              onClick={() => {
                if (currentQuestion < DISC_QUESTIONS.length - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                }
              }}
              disabled={currentQuestion === DISC_QUESTIONS.length - 1}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              التالي
            </button>
          </div>

          {/* Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              اختر الإجابة التي تعكس انطباعك الفوري دون التفكير الطويل. لا توجد إجابة صحيحة أو خاطئة.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestPage;
