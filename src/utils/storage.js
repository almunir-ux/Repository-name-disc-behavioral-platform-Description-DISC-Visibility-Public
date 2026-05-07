/**
 * حفظ البيانات في التخزين المحلي
 */

export const StorageManager = {
  // حفظ التقرير
  saveReport: (data) => {
    try {
      localStorage.setItem('disc_report', JSON.stringify({
        ...data,
        savedAt: new Date().toISOString()
      }));
      return true;
    } catch (e) {
      console.error('Failed to save report:', e);
      return false;
    }
  },

  // استرجاع التقرير
  getReport: () => {
    try {
      const data = localStorage.getItem('disc_report');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to get report:', e);
      return null;
    }
  },

  // حذف التقرير
  deleteReport: () => {
    try {
      localStorage.removeItem('disc_report');
      return true;
    } catch (e) {
      console.error('Failed to delete report:', e);
      return false;
    }
  },

  // حفظ الإجابات المؤقتة
  saveTempAnswers: (answers) => {
    try {
      localStorage.setItem('disc_temp_answers', JSON.stringify({
        answers,
        savedAt: new Date().toISOString()
      }));
      return true;
    } catch (e) {
      console.error('Failed to save temp answers:', e);
      return false;
    }
  },

  // استرجاع الإجابات المؤقتة
  getTempAnswers: () => {
    try {
      const data = localStorage.getItem('disc_temp_answers');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to get temp answers:', e);
      return null;
    }
  },

  // مسح جميع البيانات
  clearAll: () => {
    try {
      localStorage.removeItem('disc_report');
      localStorage.removeItem('disc_temp_answers');
      return true;
    } catch (e) {
      console.error('Failed to clear all:', e);
      return false;
    }
  }
};
