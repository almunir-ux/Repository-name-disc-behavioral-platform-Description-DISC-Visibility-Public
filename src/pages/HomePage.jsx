import React, { useState } from 'react';
import { ChevronRight, Clock, CheckCircle2 } from 'lucide-react';
import { DISC_COLORS, DISC_TRAITS } from '../data/discQuestions';

const HomePage = ({ onStart }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStart = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onStart();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">منصة DISC</h1>
            </div>
            <p className="text-sm text-gray-600">اختبار السمات السلوكية</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                اكتشف نمطك السلوكي
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                فهم عميق لشخصيتك وأسلوب تعاملك مع الآخرين والمواقف المختلفة من خلال اختبار DISC العلمي المعروف عالمياً
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">تقرير شامل ودقيق</h3>
                  <p className="text-gray-600">تحليل عميق لسماتك السلوكية مع مؤشرات موثوقة</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">رسوم بيانية ملونة</h3>
                  <p className="text-gray-600">عرض بصري واضح لنمطك الطبيعي والضغط والآخرين</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">توصيات عملية</h3>
                  <p className="text-gray-600">نصائح قابلة للتطبيق لتطوير نفسك والعمل مع الآخرين</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <button
              onClick={handleStart}
              className={`w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                isAnimating ? 'scale-95 opacity-75' : ''
              }`}
            >
              ابدأ الاختبار الآن
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Section - DISC Traits */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(DISC_TRAITS).map(([key, trait]) => (
              <div
                key={key}
                className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: trait.color }}
                >
                  {key}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{trait.name}</h3>
                <p className="text-sm text-gray-600">{trait.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Info Section */}
      <section className="bg-gradient-to-r from-blue-50 to-green-50 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">10-15 دقيقة</h3>
              <p className="text-gray-600">يستغرق الاختبار وقتاً قصيراً جداً</p>
            </div>
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">موثوق وعلمي</h3>
              <p className="text-gray-600">معتمد من خبراء السلوك الدوليين</p>
            </div>
            <div className="text-center">
              <ChevronRight className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">نتائج فورية</h3>
              <p className="text-gray-600">احصل على تقرير شامل فوراً</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
