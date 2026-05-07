/**
 * 36 سؤال DISC متقدم بالعربية
 * يتضمن: أسئلة عادية + ضغط + تحقق + مصائد
 * ترتيب متنوع (D-I-S-C) لتجنب الأنماط القابلة للتنبؤ
 */

export const DISC_QUESTIONS = [
  // القسم الأول: 9 أسئلة - النمط الطبيعي (أسلوب عادي)
  {
    id: 1,
    text: "أنت تفضل قيادة المشاريع والتحكم في المسار والوصول للنتائج بسرعة",
    type: "normal",
    traits: { D: 3, I: 0, S: 0, C: 0 },
    category: "leadership"
  },
  {
    id: 2,
    text: "تستمتع بالتواصل مع الآخرين وتحب تكوين علاقات اجتماعية قوية",
    type: "normal",
    traits: { D: 0, I: 3, S: 0, C: 0 },
    category: "social"
  },
  {
    id: 3,
    text: "تفضل العمل في بيئة مستقرة وتقدر الولاء والاستقرار الوظيفي",
    type: "normal",
    traits: { D: 0, I: 0, S: 3, C: 0 },
    category: "stability"
  },
  {
    id: 4,
    text: "تركز على التفاصيل والدقة وتحب التحقق من الأشياء قبل البدء",
    type: "normal",
    traits: { D: 0, I: 0, S: 0, C: 3 },
    category: "accuracy"
  },
  {
    id: 5,
    text: "تأخذ قرارات سريعة حتى لو كانت تتطلب مخاطرة",
    type: "normal",
    traits: { D: 3, I: 0, S: 0, C: -2 },
    category: "decisiveness"
  },
  {
    id: 6,
    text: "تستخدم الفكاهة والدعابة لجعل البيئة محبية وممتعة",
    type: "normal",
    traits: { D: 0, I: 3, S: 0, C: 0 },
    category: "optimism"
  },
  {
    id: 7,
    text: "تفضل الاستماع للآخرين وفهم احتياجاتهم قبل العمل",
    type: "normal",
    traits: { D: 0, I: 0, S: 3, C: 0 },
    category: "empathy"
  },
  {
    id: 8,
    text: "تحب تحليل البيانات والأرقام لاتخاذ القرارات الصحيحة",
    type: "normal",
    traits: { D: 0, I: 0, S: 0, C: 3 },
    category: "analytical"
  },
  {
    id: 9,
    text: "تحب التحدي والمنافسة وإثبات كفاءتك",
    type: "normal",
    traits: { D: 3, I: 0, S: -2, C: 0 },
    category: "competition"
  },

  // القسم الثاني: 9 أسئلة - ضغط (تحت الضغط)
  {
    id: 10,
    text: "عندما تتعرض لضغط: تصبح أكثر حزماً وتتخذ قرارات قوية بسرعة",
    type: "stress",
    traits: { D: 3, I: 0, S: -2, C: 0 },
    category: "stress_response"
  },
  {
    id: 11,
    text: "عندما تتعرض لضغط: تبحث عن الدعم الاجتماعي والتشجيع من الآخرين",
    type: "stress",
    traits: { D: 0, I: 3, S: 0, C: 0 },
    category: "stress_response"
  },
  {
    id: 12,
    text: "عندما تتعرض لضغط: تنسحب قليلاً وتحاول الحفاظ على الهدوء والاستقرار",
    type: "stress",
    traits: { D: 0, I: 0, S: 3, C: 0 },
    category: "stress_response"
  },
  {
    id: 13,
    text: "عندما تتعرض لضغط: تركز أكثر على التفاصيل والتحقق من الأخطاء",
    type: "stress",
    traits: { D: 0, I: 0, S: 0, C: 3 },
    category: "stress_response"
  },
  {
    id: 14,
    text: "عندما تتعرض لضغط: تصبح أقل صبراً وأكثر انفعالاً",
    type: "stress",
    traits: { D: 2, I: 2, S: -3, C: 0 },
    category: "stress_response"
  },
  {
    id: 15,
    text: "عندما تتعرض لضغط: تميل للكلام والتعبير عن مشاعرك بصراحة",
    type: "stress",
    traits: { D: 0, I: 3, S: 0, C: -2 },
    category: "stress_response"
  },
  {
    id: 16,
    text: "عندما تتعرض لضغط: تفضل العزلة والعمل بمفردك",
    type: "stress",
    traits: { D: 0, I: -2, S: 3, C: 0 },
    category: "stress_response"
  },
  {
    id: 17,
    text: "عندما تتعرض لضغط: تصبح أكثر قلقاً بشأن الأخطاء والتفاصيل",
    type: "stress",
    traits: { D: 0, I: 0, S: 0, C: 3 },
    category: "stress_response"
  },
  {
    id: 18,
    text: "عندما تتعرض لضغط: تحاول فرض وجهة نظرك والسيطرة على الموقف",
    type: "stress",
    traits: { D: 3, I: 0, S: -2, C: 0 },
    category: "stress_response"
  },

  // القسم الثالث: 9 أسئلة - تحقق (التناقضات/التحقق من الاتساق)
  {
    id: 19,
    text: "في اتخاذ القرارات المهمة: أنت حاسم وسريع جداً",
    type: "verification",
    traits: { D: 3, I: 0, S: -2, C: -1 },
    category: "decision_making"
  },
  {
    id: 20,
    text: "في اتخاذ القرارات المهمة: تستشير الآخرين وتأخذ آراءهم",
    type: "verification",
    traits: { D: -1, I: 3, S: 0, C: 0 },
    category: "decision_making"
  },
  {
    id: 21,
    text: "في اتخاذ القرارات المهمة: تأخذ وقتك وتفكر جيداً قبل البدء",
    type: "verification",
    traits: { D: -2, I: 0, S: 0, C: 3 },
    category: "decision_making"
  },
  {
    id: 22,
    text: "في الفريق: تحب القيادة والسيطرة على الأمور",
    type: "verification",
    traits: { D: 3, I: 0, S: -2, C: 0 },
    category: "teamwork"
  },
  {
    id: 23,
    text: "في الفريق: تحب التعاون والعمل معاً بانسجام",
    type: "verification",
    traits: { D: -1, I: 3, S: 0, C: 0 },
    category: "teamwork"
  },
  {
    id: 24,
    text: "في الفريق: تفضل دوراً داعماً وتحب مساعدة الآخرين",
    type: "verification",
    traits: { D: 0, I: 0, S: 3, C: 0 },
    category: "teamwork"
  },
  {
    id: 25,
    text: "مع الأخطاء: تركز على الحل السريع والمضي قدماً",
    type: "verification",
    traits: { D: 3, I: 0, S: 0, C: -2 },
    category: "problem_solving"
  },
  {
    id: 26,
    text: "مع الأخطاء: تناقش الأمر مع فريقك لفهم ما حدث",
    type: "verification",
    traits: { D: 0, I: 3, S: 0, C: 0 },
    category: "problem_solving"
  },
  {
    id: 27,
    text: "مع الأخطاء: تحلل الخطأ بعمق لتجنب تكراره",
    type: "verification",
    traits: { D: 0, I: 0, S: 0, C: 3 },
    category: "problem_solving"
  },

  // القسم الرابع: 9 أسئلة - مصائد (Social Desirability + عكسية)
  {
    id: 28,
    text: "أنت دائماً متفهم ودود مع كل الناس بلا استثناء",
    type: "trap",
    traits: { D: -2, I: 2, S: 2, C: 0 },
    category: "authenticity",
    isReversed: true // مؤشر للتحقق من المبالغة
  },
  {
    id: 29,
    text: "أنت لا تهتم بآراء الآخرين وتثق في حكمك فقط",
    type: "trap",
    traits: { D: 2, I: 0, S: -3, C: -1 },
    category: "authenticity",
    isReversed: true
  },
  {
    id: 30,
    text: "أنت منظم جداً وكل شيء في حياتك منتظم تماماً",
    type: "trap",
    traits: { D: -1, I: -2, S: 2, C: 3 },
    category: "authenticity",
    isReversed: true
  },
  {
    id: 31,
    text: "أنت لا تشعر بالخوف من الفشل أبداً وتحب المخاطرة دائماً",
    type: "trap",
    traits: { D: 3, I: 2, S: -3, C: -2 },
    category: "authenticity",
    isReversed: true
  },
  {
    id: 32,
    text: "أنت تتقبل التغيير بسهولة وتحب الأشياء الجديدة دائماً",
    type: "trap",
    traits: { D: 2, I: 3, S: -3, C: -1 },
    category: "authenticity",
    isReversed: true
  },
  {
    id: 33,
    text: "تتجنب الصراعات دائماً وتفضل السلام حتى لو أضر بأهدافك",
    type: "trap",
    traits: { D: -3, I: 0, S: 3, C: 0 },
    category: "authenticity",
    isReversed: true
  },
  {
    id: 34,
    text: "أنت الأفضل دائماً في كل شيء وتتفوق على الجميع",
    type: "trap",
    traits: { D: 3, I: 2, S: -2, C: 1 },
    category: "authenticity",
    isReversed: true
  },
  {
    id: 35,
    text: "أنت لا تشعر بالغضب أبداً وتحافظ على هدوئك في كل الحالات",
    type: "trap",
    traits: { D: -2, I: 0, S: 3, C: 0 },
    category: "authenticity",
    isReversed: true
  },
  {
    id: 36,
    text: "تعترف بأخطائك بسهولة وتتعلم منها دائماً",
    type: "trap",
    traits: { D: -1, I: 0, S: 2, C: 2 },
    category: "authenticity",
    isReversed: false // سؤال إيجابي
  }
];

/**
 * نظام الإجابات (1-5)
 * 1 = لا أوافق بشدة
 * 2 = لا أوافق
 * 3 = محايد
 * 4 = أوافق
 * 5 = أوافق بشدة
 */
export const RESPONSE_SCALE = {
  1: { label: 'لا أوافق بشدة', value: 1 },
  2: { label: 'لا أوافق', value: 2 },
  3: { label: 'محايد', value: 3 },
  4: { label: 'أوافق', value: 4 },
  5: { label: 'أوافق بشدة', value: 5 }
};

/**
 * ألوان DISC
 */
export const DISC_COLORS = {
  D: '#ef4444', // أحمر - السيطرة
  I: '#f59e0b', // برتقالي - التأثير
  S: '#3b82f6', // أزرق - الاستقرار
  C: '#10b981'  // أخضر - الدقة
};

/**
 * أسماء السمات بالعربية
 */
export const DISC_TRAITS = {
  D: {
    name: 'الهيمنة',
    shortName: 'هيمنة',
    description: 'القيادة والنتائج والحزم',
    color: '#ef4444'
  },
  I: {
    name: 'التأثير',
    shortName: 'تأثير',
    description: 'التواصل والعلاقات والحماس',
    color: '#f59e0b'
  },
  S: {
    name: 'الاستقرار',
    shortName: 'استقرار',
    description: 'الدعم والصبر والاستقراrice',
    color: '#3b82f6'
  },
  C: {
    name: 'الدقة',
    shortName: 'دقة',
    description: 'التحليل والجودة والنظام',
    color: '#10b981'
  }
};
