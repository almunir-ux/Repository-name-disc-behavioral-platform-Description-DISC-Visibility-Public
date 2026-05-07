# وثائق API المحرك النفسي

## نظرة عامة

محرك التقييم النفسي (Psychological Scoring Engine) هو نظام متقدم يحلل الإجابات على اختبار DISC ويستخرج 5 مؤشرات مخفية لقياس جودة الاختبار والشخصية الحقيقية.

## الواجهة الرئيسية

### `scoringEngine.analyzeResponses(responses)`

**المدخلات:**
```javascript
const responses = {
  1: 5,    // سؤال 1 - إجابة 5
  2: 4,    // سؤال 2 - إجابة 4
  3: 3,    // ...
  // ... 36 سؤال
};
```

**المخرجات:**
```javascript
{
  scores: {
    traits: {
      D: 85,  // درجة الهيمنة (0-100)
      I: 45,  // درجة التأثير (0-100)
      S: 30,  // درجة الاستقرار (0-100)
      C: 75   // درجة الدقة (0-100)
    }
  },
  hiddenMetrics: {
    traitScore: { D: 85, I: 45, S: 30, C: 75 },
    confidenceScore: 82,              // 0-100
    consistencyScore: 78,             // 0-100
    socialDesirabilityScore: 35,      // 0-100 (أقل = أفضل)
    stressVariance: 42                // 0-100 (التغير تحت الضغط)
  },
  reliability: {
    score: 68,                       // درجة الموثوقية (0-100)
    level: 'عالية',                 // 'عالية جداً' | 'عالية' | 'متوسطة' | 'منخفضة'
    issues: [                         // المشاكل المكتشفة
      'إجابات متحفظة جداً - قد تحتاج لمزيد من الوضوح',
      'تناقضات في الإجابات - قد تكون النتائج متذبذبة'
    ]
  }
}
```

## الدوال المتاحة

### 1. `calculateTraitScores(responses)`

حساب درجات السمات الأساسية الأربع.

```javascript
const scores = scoringEngine.calculateTraitScores(responses);
// { D: 85, I: 45, S: 30, C: 75 }
```

### 2. `calculateConfidenceScore(responses)`

قياس مدى ثقة المستخدم من إجاباته.

```javascript
const confidence = scoringEngine.calculateConfidenceScore(responses);
// 82 (0-100)
// الإجابات الطرفية (1 أو 5) = ثقة عالية
// الإجابات المتوسطة (3) = تردد
```

### 3. `calculateConsistencyScore(responses)`

فحص الاتساق الداخلي للإجابات.

```javascript
const consistency = scoringEngine.calculateConsistencyScore(responses);
// 78 (0-100)
// يقارن الإجابات المرتبطة بنفس السمة
```

### 4. `calculateSocialDesirabilityScore(responses)`

كشف محاولة تحسين الصورة الذاتية.

```javascript
const desirability = scoringEngine.calculateSocialDesirabilityScore(responses);
// 35 (0-100)
// أقل = أفضل (يعني إجابات حقيقية)
// أعلى = محاولة تجميل الصورة
```

### 5. `calculateStressVariance(responses)`

قياس التغير في الشخصية تحت الضغط.

```javascript
const variance = scoringEngine.calculateStressVariance(responses);
// 42 (0-100)
// 0 = لا تتغير الشخصية تحت الضغط
// 100 = تتغير الشخصية بشكل كبير
```

### 6. `getReliabilityAssessment()`

تقييم شامل لموثوقية الاختبار.

```javascript
const assessment = scoringEngine.getReliabilityAssessment();
// {
//   score: 68,
//   level: 'عالية',
//   issues: [...]
// }
```

### 7. `getDominantProfile()`

الحصول على السمة السائدة.

```javascript
const dominant = scoringEngine.getDominantProfile();
// { trait: 'D', score: 85 }
```

## أمثلة الاستخدام

### مثال 1: تحليل كامل

```javascript
import scoringEngine from './core/scoringEngine';

const responses = {
  1: 5, 2: 4, 3: 2, 4: 5, 5: 5, 6: 3, 7: 2, 8: 4, 9: 5,
  10: 5, 11: 3, 12: 2, 13: 4, 14: 4, 15: 3, 16: 2, 17: 4, 18: 5,
  19: 5, 20: 3, 21: 2, 22: 5, 23: 3, 24: 2, 25: 5, 26: 3, 27: 2,
  28: 4, 29: 3, 30: 2, 31: 5, 32: 4, 33: 2, 34: 5, 35: 3, 36: 4
};

const result = scoringEngine.analyzeResponses(responses);

console.log('درجات السمات:', result.scores.traits);
console.log('الموثوقية:', result.reliability.level);
console.log('النمط السائد:', result.hiddenMetrics.traitScore);
```

### مثال 2: الكشف عن المشاكل

```javascript
const result = scoringEngine.analyzeResponses(responses);

if (result.reliability.score < 50) {
  console.warn('⚠️ موثوقية منخفضة - اطلب من المستخدم إعادة الاختبار');
}

if (result.hiddenMetrics.socialDesirabilityScore > 70) {
  console.warn('⚠️ محاولة تجميل الصورة - النتائج قد لا تعكس الواقع تماماً');
}

if (result.hiddenMetrics.consistencyScore < 50) {
  console.warn('⚠️ تناقضات في الإجابات - قد تكون النتائج غير مستقرة');
}
```

### مثال 3: عرض مؤشرات متقدمة

```javascript
const result = scoringEngine.analyzeResponses(responses);
const metrics = result.hiddenMetrics;

const metricsDisplay = `
مؤشرات متقدمة:
• ثبات الإجابات: ${metrics.confidenceScore}%
• الاتساق الداخلي: ${metrics.consistencyScore}%
• تجميل الصورة: ${metrics.socialDesirabilityScore}%
• التغير تحت الضغط: ${metrics.stressVariance}%
`;

console.log(metricsDisplay);
```

## معايير التفسير

### درجات السمات (0-100)

| النطاق | التفسير |
|--------|----------|
| 80-100 | **عالي جداً** - هذه السمة هي الأساسية جداً |
| 60-79 | **عالي** - هذه السمة بارزة وملحوظة |
| 40-59 | **متوسط** - هذه السمة حاضرة لكن ليست الأقوى |
| 20-39 | **منخفض** - هذه السمة ضعيفة نسبياً |
| 0-19 | **منخفض جداً** - هذه السمة غير موجودة تقريباً |

### موثوقية الاختبار (0-100)

| النطاق | المستوى | الإجراء |
|--------|---------|--------|
| 80-100 | **عالية جداً** ✅ | يمكن الاعتماد على النتائج كاملة |
| 60-79 | **عالية** ✅ | النتائج موثوقة وقابلة للاستخدام |
| 40-59 | **متوسطة** ⚠️ | انتبه للمشاكل المذكورة |
| 0-39 | **منخفضة** ❌ | قد تحتاج إعادة الاختبار |

### Social Desirability (0-100)

| النطاق | المعنى |
|--------|--------|
| 0-30 | **منخفض** ✅ إجابات حقيقية وصريحة |
| 31-60 | **متوسط** ⚠️ بعض المحاولة لتحسين الصورة |
| 61-100 | **عالي** ❌ محاولة قوية لتجميل الصورة |

## الكشف عن التناقضات

يستخدم المحرك أزواج أسئلة مقارنة:

```javascript
// إذا قال "قيادي" في السؤال 1
// يجب أن يكون قيادياً أيضاً في السؤال 22
// إذا لم يطابق = تناقض

const inconsistencies = [
  { q1: 1, q2: 22, trait: 'D' },   // الهيمنة
  { q1: 2, q2: 23, trait: 'I' },   // التأثير
  { q1: 3, q2: 24, trait: 'S' },   // الاستقرار
  { q1: 4, q2: 21, trait: 'C' },   // الدقة
  // ...
];
```

## أفضل الممارسات

### ✅ افعل:
- تحقق من موثوقية الاختبار قبل استخدام النتائج
- اعرض المؤشرات المتقدمة للمختصين
- احفظ النتائج الكاملة للمراجعة لاحقاً
- استخدم التقييم المتكامل للفهم الشامل

### ❌ لا تفعل:
- لا تعتمد على درجات واحدة فقط
- لا تتجاهل تحذيرات الموثوقية
- لا تستخدم النتائج لاتخاذ قرارات حرجة بدون تشاور
- لا تشارك المؤشرات المخفية مع غير المختصين

## التطوير المستقبلي

خطط التحسين:
- [ ] دعم مقارنة متعددة (قياس التطور بمرور الوقت)
- [ ] تحليلات إحصائية متقدمة
- [ ] تقارير المجموعات والفرق
- [ ] تكامل مع أنظمة الموارد البشرية
- [ ] نماذج تنبؤية بالأداء

---

**آخر تحديث**: مايو 2026
