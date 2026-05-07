# دليل التطوير والمساهمة

## هيكل المشروع

```
src/
├── pages/              # صفحات React
├── core/               # المنطق الأساسي
├── data/               # البيانات الثابتة
├── utils/              # دوال مساعدة
├── App.jsx            # المكون الرئيسي
└── index.css          # الأنماط
```

## إضافة أسئلة جديدة

في `src/data/discQuestions.js`:

```javascript
{
  id: 37,
  text: "السؤال الجديد هنا",
  type: "normal", // normal | stress | verification | trap
  traits: { D: 3, I: 0, S: 0, C: 0 },
  category: "category_name",
  isReversed: false // للأسئلة المصيدة فقط
}
```

## تعديل الخوارزميات

في `src/core/scoringEngine.js`:

1. عدّل أوزان الأسئلة
2. أضف معادلات جديدة
3. اختبر مع بيانات تجريبية

## الاختبار

```bash
# تشغيل التطبيق
npm run dev

# بناء الإنتاج
npm run build

# معاينة الإنتاج
npm run preview
```

## نشر إلى GitHub Pages

```bash
npm run build
# ثم ادفع dist/ إلى gh-pages branch
```

---

**شكراً لمساهمتك!** 🚀
