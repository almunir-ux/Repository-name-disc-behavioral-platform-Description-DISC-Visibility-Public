import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Download, Eye, EyeOff } from 'lucide-react';
import { DISC_COLORS, DISC_TRAITS } from '../data/discQuestions';
import scoringEngine from '../core/scoringEngine';

const ReportPage = ({ responses, timeElapsed, onBack }) => {
  const [reportData, setReportData] = useState(null);
  const [showExpertMetrics, setShowExpertMetrics] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    // Analyze responses
    const analysis = scoringEngine.analyzeResponses(responses);
    setReportData(analysis);
    setIsGenerating(false);
  }, [responses]);

  if (isGenerating || !reportData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">جاري إعداد التقرير...</h2>
          <p className="text-gray-600">يرجى الانتظار</p>
        </div>
      </div>
    );
  }

  const { traits: scores, hiddenMetrics, reliability } = reportData;
  const dominantTrait = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

  // Data for charts
  const scoreData = Object.entries(scores).map(([trait, score]) => ({
    trait: DISC_TRAITS[trait].name,
    score,
    fill: DISC_COLORS[trait]
  }));

  const radarData = Object.entries(scores).map(([trait, score]) => ({
    trait: trait,
    value: score,
    fullMark: 100
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">تقريرك الشخصي</h1>
              <p className="text-gray-600 mt-1">نمطك السلوكي DISC</p>
            </div>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              العودة
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section 1: Main Scores & Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">درجات السمات</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="trait" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">الملف الشامل</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="trait" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="السمة" dataKey="value" stroke="#0284c7" fill="#3b82f6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Section 2: Dominant Profile */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">نمطك السائد</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="p-8 rounded-lg"
              style={{ backgroundColor: `${DISC_COLORS[dominantTrait]}20`, borderLeft: `4px solid ${DISC_COLORS[dominantTrait]}` }}
            >
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-3xl mb-4"
                style={{ backgroundColor: DISC_COLORS[dominantTrait] }}
              >
                {dominantTrait}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{DISC_TRAITS[dominantTrait].name}</h3>
              <p className="text-gray-700 mb-4">{DISC_TRAITS[dominantTrait].description}</p>
              <p className="text-sm text-gray-600">
                درجتك: <span className="font-bold text-lg">{scores[dominantTrait]}/100</span>
              </p>
            </div>

            {/* Profile Description */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">خصائصك الرئيسية:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-lg font-bold text-gray-400 flex-shrink-0">•</span>
                  <span className="text-gray-700">أنت تتمتع بشخصية قيادية وحازمة</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg font-bold text-gray-400 flex-shrink-0">•</span>
                  <span className="text-gray-700">تركز على النتائج والإنجازات</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg font-bold text-gray-400 flex-shrink-0">•</span>
                  <span className="text-gray-700">تتخذ القرارات بسرعة وحزم</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg font-bold text-gray-400 flex-shrink-0">•</span>
                  <span className="text-gray-700">تحب التحديات والمنافسة</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3: Reliability & Hidden Metrics */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Reliability Assessment */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">موثوقية الاختبار</h2>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700">درجة الموثوقية</span>
                <span className="text-2xl font-bold text-blue-600">{reliability.score}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${reliability.score}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">المستوى: {reliability.level}</p>
            </div>
            {reliability.issues.length > 0 && (
              <div className="space-y-2">
                <p className="font-semibold text-gray-700">ملاحظات:</p>
                {reliability.issues.map((issue, idx) => (
                  <p key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="flex-shrink-0">⚠️</span>
                    <span>{issue}</span>
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Hidden Metrics */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">مؤشرات متقدمة</h2>
              <button
                onClick={() => setShowExpertMetrics(!showExpertMetrics)}
                className="text-gray-600 hover:text-gray-900"
              >
                {showExpertMetrics ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {showExpertMetrics && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">ثبات الإجابات</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${hiddenMetrics.confidenceScore}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{hiddenMetrics.confidenceScore}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">الاتساق الداخلي</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${hiddenMetrics.consistencyScore}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{hiddenMetrics.consistencyScore}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">تجميل الصورة الذاتية</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${hiddenMetrics.socialDesirabilityScore}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{hiddenMetrics.socialDesirabilityScore}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">التغير تحت الضغط</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${hiddenMetrics.stressVariance}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{hiddenMetrics.stressVariance}%</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Download Button */}
        <div className="text-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
            <Download className="w-5 h-5" />
            تحميل التقرير PDF
          </button>
        </div>
      </main>
    </div>
  );
};

export default ReportPage;
