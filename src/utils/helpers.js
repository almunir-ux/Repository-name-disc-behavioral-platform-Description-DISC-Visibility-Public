/**
 * أدوات مساعدة عامة
 */

/**
 * تنسيق الوقت
 */
export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  }
  return `${minutes}m ${secs}s`;
};

/**
 * تحويل الأرقام إلى نصوص عربية
 */
export const numberToArabic = (num) => {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().split('').map(digit => arabicNumbers[digit]).join('');
};

/**
 * حساب نسبة التطابق
 */
export const calculatePercentage = (value, total) => {
  return Math.round((value / total) * 100);
};

/**
 * الحصول على وصف اللون بناءً على القيمة
 */
export const getColorDescription = (value) => {
  if (value >= 80) return 'عالي جداً';
  if (value >= 60) return 'عالي';
  if (value >= 40) return 'متوسط';
  if (value >= 20) return 'منخفض';
  return 'منخفض جداً';
};

/**
 * التحقق من صحة الإجابات
 */
export const validateAnswers = (answers) => {
  const totalQuestions = 36;
  const answeredQuestions = Object.keys(answers).length;
  return answeredQuestions === totalQuestions;
};

/**
 * حفظ الملف
 */
export const downloadFile = (content, filename, type = 'text/plain') => {
  const element = document.createElement('a');
  const file = new Blob([content], { type });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

/**
 * تنسيق التاريخ
 */
export const formatDate = (date = new Date()) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('ar-SA', options);
};
