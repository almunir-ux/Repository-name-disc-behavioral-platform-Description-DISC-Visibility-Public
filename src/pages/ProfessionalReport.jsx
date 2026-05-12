/**
 * صفحة التقرير الاحترافية الشاملة
 * تحتوي على جميع الأقسام والرسوم البيانية الملونة
 */

import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, RadarChart, Radar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell
} from 'recharts';
import { Download, Eye, EyeOff, Printer } from 'lucide-react';
import { DISC_TRAITS, DISC_COLORS } from '../data/discQuestions';
import scoringEngine from '../core/scoringEngine';

const ProfessionalReport = ({ responses, userData, onBack }) => {
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showExpertMetrics, setShowExpertMetrics] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    // محاكاة تحليل البيانات
    setTimeout(() => {
      const analysis = scoringEngine.analyzeResponses(responses);
      setReportData(analysis);
      setIsLoading(false);
    }, 2000);
  }, [responses]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">جاري إعداد التقرير الشامل</h2>
          <p className="text-gray-600 text-lg">يرجى الانتظار...</p>
        </div>
      </div>
    );
  }

  if (!reportData || !userData) {
    return <div className="text-center text-red-500 py-20">حدث خطأ في تحميل البيانات</div>;
  }

  const { traits: scores, hiddenMetrics, reliability } = reportData;
  const dominantTrait = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

  // بيانات الرسوم البيانية
  const scoreData = Object.entries(scores).map(([trait, score]) => ({
    name: DISC_TRAITS[trait].shortName,
    value: score,
    fill: DISC_COLORS[trait]
  }));

  const radarData = Object.entries(scores).map(([trait, score]) => ({
    trait: trait,
    value: score,
    fullMark: 100
  }));

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">مقياس الأنماط السلوكية DiSC</h1>
              <p className="text-blue-100 mt-1">تقرير شامل لـ: {userData.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">التاريخ: {new Date().toLocaleDateString('ar-SA')}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-md sticky top-24 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'overview', label: '🎯 نظرة عامة', icon: '📊' },
              { id: 'profile', label: '👤 الملف الشخصي', icon: '📋' },
              { id: 'strengths', label: '💪 نقاط القوة', icon: '✨' },
              { id: 'communication', label: '💬 التواصل', icon: '🗣️' },
              { id: 'workplace', label: '🏢 بيئة العمل', icon: '🎯' },
              { id: 'expert', label: '🔍 مؤشرات متقدمة', icon: '📈' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-6 py-4 font-semibold whitespace-nowrap border-b-4 transition-all ${
                  activeSection === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* ===== القسم الأول: نظرة عامة ===== */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            {/* المقدمة */}
            <section className="bg-white rounded-xl shadow-lg p-8 border-r-4 border-blue-600">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-right">المقدمة</h2>
              <div className="prose prose-sm max-w-none text-right text-gray-700 space-y-4">
                <p>
                  إن قدرتنا على التفاعل مع الناس قد تكون هي الفرق بين النجاح والفشل. يبدأ هذا التفاعل أولا بفهم دقيق لأنفسنا. على مر السنين، بنينا تصورنا الذاتي بناءً على معلومات تلقيناها من الآخرين.
                </p>
                <p>
                  صُمم هذا التقرير لتقييم معلوماتك حول نظرتك لنفسك. وسيرتبط استخدامك لهذه المعلومات ارتباطًا مباشرًا بنجاحك في تحسين علاقاتك الشخصية بشكل ملحوظ.
                </p>
                <p>
                  يُحدد هذا التقرير المجالات الرئيسية لتحسين العلاقات الشخصية. ضع علامة نجمة على العبارات الأكثر أهمية بالنسبة لك، وإن أمكن، شارك سبب أهميتها مع شخص ما.
                </p>
              </div>
            </section>

            {/* الرسوم البيانية الثلاث */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* الرسم البياني الأول: كيف يرى نفسه */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">كيف يرى نفسه</h3>
                  <p className="text-sm text-gray-500">النمط الطبيعي</p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={scoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {scoreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* الرسم البياني الثاني: كيف يراه الآخرون */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">كيف يراه الآخرون</h3>
                  <p className="text-sm text-gray-500">التأثير الخارجي</p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="trait" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="الدرجة" dataKey="value" stroke="#0284c7" fill="#3b82f6" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* الرسم البياني الثالث: كيف هو تحت الضغط */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">تحت الضغط</h3>
                  <p className="text-sm text-gray-500">السلوك في الأزمات</p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={scoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* جدول الدرجات */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-right">جدول الدرجات التفصيلي</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {Object.entries(scores).map(([trait, score]) => (
                  <div key={trait} className="p-6 rounded-lg border-2" style={{ borderColor: DISC_COLORS[trait] }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                        style={{ backgroundColor: DISC_COLORS[trait] }}
                      >
                        {trait}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{DISC_TRAITS[trait].name}</h4>
                        <p className="text-xs text-gray-500">{DISC_TRAITS[trait].shortName}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold" style={{ color: DISC_COLORS[trait] }}>{score}</p>
                      <p className="text-xs text-gray-500 mt-1">من 100</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{ width: `${score}%`, backgroundColor: DISC_COLORS[trait] }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== القسم الثاني: الملف الشخصي ===== */}
        {activeSection === 'profile' && (
          <div className="space-y-8">
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-right border-r-4 border-blue-600 pr-4">الملف الشخصي</h2>
              
              {/* النمط السائد */}
              <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: `${DISC_COLORS[dominantTrait]}15`, borderLeft: `4px solid ${DISC_COLORS[dominantTrait]}` }}>
                <div className="flex items-start gap-6">
                  <div
                    className="w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold text-4xl flex-shrink-0"
                    style={{ backgroundColor: DISC_COLORS[dominantTrait] }}
                  >
                    {dominantTrait}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{DISC_TRAITS[dominantTrait].name}</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">{DISC_TRAITS[dominantTrait].description}</p>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold" style={{ color: DISC_COLORS[dominantTrait] }}>{scores[dominantTrait]}</p>
                        <p className="text-xs text-gray-600 mt-1">درجة السمة</p>
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-4">
                        <div
                          className="h-4 rounded-full transition-all"
                          style={{ width: `${scores[dominantTrait]}%`, backgroundColor: DISC_COLORS[dominantTrait] }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* الوصف التفصيلي */}
              <div className="prose max-w-none text-right">
                <h4 className="text-xl font-bold text-gray-900 mb-4">الخصائص الرئيسية:</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">✓</span>
                    <span>أنت شخص يتمتع بشخصية قوية وحاضرة تؤثر على من حولك</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">✓</span>
                    <span>تركز على النتائج والأهداف الملموسة في عملك</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">✓</span>
                    <span>تتمتع بثقة عالية في قدراتك وقراراتك</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">✓</span>
                    <span>تفضل العمل بكفاءة وسرعة دون تعقيدات غير ضرورية</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        )}

        {/* ===== القسم الثالث: نقاط القوة ===== */}
        {activeSection === 'strengths' && (
          <div className="space-y-8">
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-right border-r-4 border-green-600 pr-4">نقاط القوة والمميزات</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: '⚡', title: 'الحزم والقيادة', desc: 'تتمتع بقدرة طبيعية على ق��ادة الفريق وتوجيهه نحو الأهداف' },
                  { icon: '🎯', title: 'التركيز على النتائج', desc: 'تركيز قوي على الإنجازات الملموسة والقابلة للقياس' },
                  { icon: '⚙️', title: 'الكفاءة والسرعة', desc: 'قدرة على إنجاز المهام بكفاءة وبسرعة معقولة' },
                  { icon: '💡', title: 'الجرأة والمبادرة', desc: 'شجاعة في اتخاذ القرارات والتحرك نحو الفرص الجديدة' },
                  { icon: '🔥', title: 'المثابرة', desc: 'إصرار قوي على تحقيق الأهداف رغم العقبات' },
                  { icon: '📈', title: 'الطموح', desc: 'طموح عالي وسعي مستمر نحو التطور والتقدم' }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-lg bg-green-50 border-r-4 border-green-500">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{item.icon}</span>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-gray-700 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ===== القسم الرابع: التواصل ===== */}
        {activeSection === 'communication' && (
          <div className="space-y-8">
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-right border-r-4 border-purple-600 pr-4">أسلوب التواصل</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* مفاتيح التواصل */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-right">مفاتيح التواصل الفعال معي:</h3>
                  <ul className="space-y-4">
                    {[
                      'كن موجزاً وواضحاً ومباشراً في رسالتك',
                      'ركز على الفوائد والنتائج المتوقعة',
                      'قدم خيارات واضحة واترك المجال للاختيار',
                      'كن منظماً ودقيقاً في المواعيد والالتزامات',
                      'تجنب الكلام العاطفي والتفاصيل الزائدة',
                      'استعد للأسئلة والاعتراضات الجادة'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <span className="text-2xl text-blue-600 flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* معوقات التواصل */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-right">تجنب معي:</h3>
                  <ul className="space-y-4">
                    {[
                      'الكلام الطويل والمحاضرات الممله',
                      'الغموض وترك الأمور غير واضحة',
                      'تأخير المتابعة والعودة عن الوعود',
                      'الكلام بتعالٍ أو إملاء الأوامر',
                      'عدم احترام الوقت والمواعيد',
                      'التركيز على التفاصيل البسيطة والثانوية'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <span className="text-2xl text-red-600 flex-shrink-0">✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ===== القسم الخامس: بيئة العمل ===== */}
        {activeSection === 'workplace' && (
          <div className="space-y-8">
            <section className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-right border-r-4 border-orange-600 pr-4">بيئة العمل المناسبة</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* الدوافع والاحتياجات */}
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-right">ما يحفزك:</h3>
                  <ul className="space-y-3">
                    {[
                      'تقدير واعتراف واضح بإنجازاتك',
                      'فرص للقيادة والتأثير في القرارات',
                      'تحديات جديدة تتطلب حلاً مبتكراً',
                      'بيئة تنافسية تقدر الإنجازات',
                      'استقلالية في العمل وحرية الحركة',
                      'نتائج ملموسة ومرئية للعمل'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <span className="text-2xl">⭐</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ما يحبط */}
                <div className="p-6 bg-red-50 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-right">ما يحبطك:</h3>
                  <ul className="space-y-3">
                    {[
                      'عدم وضوح الأهداف والتوقعات',
                      'البيروقراطية والإجراءات المعقدة',
                      'الروتين والعمل الممل',
                      'الفشل والخسارة في المنافسة',
                      'الأشخاص الذين يتحركون ببطء',
                      'عدم الاعتراف بالإنجازات'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <span className="text-2xl">⚠️</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ===== القسم السادس: المؤشرات المتقدمة ===== */}
        {activeSection === 'expert' && (
          <div className="space-y-8">
            <section className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => setShowExpertMetrics(!showExpertMetrics)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {showExpertMetrics ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  {showExpertMetrics ? 'إخفاء المؤشرات' : 'عرض المؤشرات'}
                </button>
                <h2 className="text-3xl font-bold text-gray-900 text-right border-r-4 border-pink-600 pr-4">المؤشرات المتقدمة</h2>
              </div>

              {showExpertMetrics && (
                <div className="space-y-6">
                  {[
                    {
                      label: 'ثبات الإجابات',
                      value: hiddenMetrics.confidenceScore,
                      color: 'from-green-400 to-green-600',
                      desc: 'مدى تأكدك من إجاباتك'
                    },
                    {
                      label: 'الاتساق الداخلي',
                      value: hiddenMetrics.consistencyScore,
                      color: 'from-blue-400 to-blue-600',
                      desc: 'مدى اتسّاق إجاباتك مع بعضها'
                    },
                    {
                      label: 'تجميل الصورة الذاتية',
                      value: hiddenMetrics.socialDesirabilityScore,
                      color: 'from-orange-400 to-orange-600',
                      desc: 'محاولة إظهار صورة أفضل من الواقع'
                    },
                    {
                      label: 'التغير تحت الضغط',
                      value: hiddenMetrics.stressVariance,
                      color: 'from-red-400 to-red-600',
                      desc: 'درجة تغير السلوك تحت الضغط'
                    }
                  ].map((metric, idx) => (
                    <div key={idx} className="p-6 rounded-lg border-2 border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">{metric.label}</h4>
                          <p className="text-sm text-gray-500 mt-1">{metric.desc}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-4xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>{metric.value}%</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className={`h-4 rounded-full bg-gradient-to-r ${metric.color} transition-all`}
                          style={{ width: `${metric.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}

                  {/* موثوقية التقرير */}
                  <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: `${reliability.score >= 70 ? '#dcfce7' : '#fef3c7'}` }}>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">مستوى موثوقية التقرير</h4>
                    <p className={`text-2xl font-bold mb-2 ${reliability.score >= 70 ? 'text-green-600' : 'text-orange-600'}`}>
                      {reliability.level}
                    </p>
                    <div className="w-full bg-gray-300 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          reliability.score >= 70
                            ? 'bg-green-500'
                            : reliability.score >= 50
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        } transition-all`}
                        style={{ width: `${reliability.score}%` }}
                      ></div>
                    </div>
                    {reliability.issues.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="font-semibold text-gray-800">ملاحظات مهمة:</p>
                        {reliability.issues.map((issue, idx) => (
                          <p key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span>⚠️</span>
                            <span>{issue}</span>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      {/* Action Buttons */}
      <footer className="bg-white shadow-lg border-t-2 border-gray-200 sticky bottom-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              <Printer className="w-5 h-5" />
              طباعة
            </button>
            <button
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <Download className="w-5 h-5" />
              تحميل PDF
            </button>
          </div>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
          >
            العودة
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalReport;
