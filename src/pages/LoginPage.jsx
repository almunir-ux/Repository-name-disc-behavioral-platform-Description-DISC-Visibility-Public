/**
 * صفحة التسجيل والدخول
 */

import React, { useState } from 'react';
import { Mail, Phone, Eye, EyeOff } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [loginMethod, setLoginMethod] = useState('email'); // email or phone
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // التحقق البسيط
    if (!name) {
      setError('يرجى إدخال اسمك');
      setLoading(false);
      return;
    }

    if (loginMethod === 'email' && !email) {
      setError('يرجى إدخال البريد الإلكتروني');
      setLoading(false);
      return;
    }

    if (loginMethod === 'phone' && !phone) {
      setError('يرجى إدخال رقم الهاتف');
      setLoading(false);
      return;
    }

    if (!password) {
      setError('يرجى إدخال كلمة المرور');
      setLoading(false);
      return;
    }

    // محاكاة تسجيل الدخول
    setTimeout(() => {
      onLogin({
        name,
        email: loginMethod === 'email' ? email : '',
        phone: loginMethod === 'phone' ? phone : '',
        id: Math.random().toString(36).substr(2, 9)
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-green-500 rounded-lg p-3 mb-4">
            <span className="text-white text-3xl font-bold">DiSC</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">مقياس الأنماط السلوكية</h1>
          <p className="text-gray-600">اكتشف أسلوبك السلوكي الفريد</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                الاسم الكامل
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="أدخل اسمك الكامل"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Login Method Tabs */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 rounded font-semibold transition-colors flex items-center justify-center gap-2 ${
                  loginMethod === 'email'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">البريد الإلكتروني</span>
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('phone')}
                className={`flex-1 py-2 rounded font-semibold transition-colors flex items-center justify-center gap-2 ${
                  loginMethod === 'phone'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">الهاتف</span>
              </button>
            </div>

            {/* Email or Phone Input */}
            {loginMethod === 'email' ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+966 50 0000000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
            )}

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري التسجيل...
                </>
              ) : (
                'تسجيل الدخول والبدء'
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-6">
            بتسجيلك، تقبل سياسة الخصوصية وشروط الاستخدام
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
