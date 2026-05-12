/**
 * 36 سؤال DISC محترف بنظام Forced Choice
 * ترتيب متنوع (D-C-S-I) لتجنب الأنماط المكتشفة
 */

export const DISC_QUESTIONS_V2 = [
  // ===== القسم الأول: النمط الطبيعي (أسلوب عام) =====
  {
    id: 1,
    section: 'natural',
    category: 'general_style',
    text: 'عند مواجهة مشكلة في العمل، أنا غالباً:',
    options: [
      { trait: 'D', text: 'أواجهها بشكل مباشر وسريع' },
      { trait: 'C', text: 'أحلل جميع جوانبها بدقة' },
      { trait: 'S', text: 'أطلب المساعدة من فريقي' },
      { trait: 'I', text: 'أناقش الحل مع الآخرين' }
    ]
  },
  {
    id: 2,
    section: 'natural',
    category: 'social_preference',
    text: 'في التجمعات الاجتماعية، أنا عادة:',
    options: [
      { trait: 'I', text: 'أكون مركز الاهتمام والمحادثة' },
      { trait: 'D', text: 'أفضل قيادة النقاش نحو أهدافي' },
      { trait: 'C', text: 'أستمع أكثر مما أتحدث' },
      { trait: 'S', text: 'أستمتع بالحديث مع أشخاص معينين' }
    ]
  },
  {
    id: 3,
    section: 'natural',
    category: 'work_pace',
    text: 'بخصوص سرعة العمل والإنجاز، أنا:',
    options: [
      { trait: 'D', text: 'أحب التركيز على النتائج النهائية بسرعة' },
      { trait: 'I', text: 'أستمتع بالأنشطة المتنوعة والمثيرة' },
      { trait: 'C', text: 'أركز على الدقة حتى لو استغرق وقتاً' },
      { trait: 'S', text: 'أفضل وتيرة معتدلة ومنتظمة' }
    ]
  },
  {
    id: 4,
    section: 'natural',
    category: 'risk_preference',
    text: 'عندما يتعلق الأمر بالمخاطر والتغييرات الجديدة:',
    options: [
      { trait: 'D', text: 'أستقبل التحديات الجديدة بحماس' },
      { trait: 'S', text: 'أفضل الأساليب المثبتة والمعروفة' },
      { trait: 'I', text: 'أحب الأفكار المبتكرة والمبدعة' },
      { trait: 'C', text: 'أحتاج دراسة شاملة قبل التحرك' }
    ]
  },
  {
    id: 5,
    section: 'natural',
    category: 'decision_style',
    text: 'في اتخاذ القرارات المهمة، أنا:',
    options: [
      { trait: 'D', text: 'أتخذ قراراً سريعاً بناءً على حدسي' },
      { trait: 'C', text: 'أجمع معلومات شاملة قبل القرار' },
      { trait: 'I', text: 'أستشير الآخرين وأناقش الخيارات' },
      { trait: 'S', text: 'أفكر جيداً وأتأنى قبل الاختيار' }
    ]
  },
  {
    id: 6,
    section: 'natural',
    category: 'team_role',
    text: 'في الفريق، دوري عادة يكون:',
    options: [
      { trait: 'D', text: 'قائد أتولى المسؤولية والقيادة' },
      { trait: 'I', text: 'محفز أنشر الحماس والتعاون' },
      { trait: 'S', text: 'داعم أساعد الفريق على التكامل' },
      { trait: 'C', text: 'منظم أضمن الجودة والدقة' }
    ]
  },
  {
    id: 7,
    section: 'natural',
    category: 'motivation',
    text: 'ما يحفزني أكثر في العمل هو:',
    options: [
      { trait: 'D', text: 'تحقيق الأهداف والنتائج الملموسة' },
      { trait: 'I', text: 'الاعتراف والتقدير من الآخرين' },
      { trait: 'S', text: 'الاستقرار والعلاقات الجيدة مع الفريق' },
      { trait: 'C', text: 'الامتثال للمعايير والقيام بعمل مثالي' }
    ]
  },
  {
    id: 8,
    section: 'natural',
    category: 'communication_style',
    text: 'أسلوبي في التواصل مع الآخرين هو:',
    options: [
      { trait: 'D', text: 'مباشر وحازم وموجز' },
      { trait: 'I', text: 'ودود ومفعم بالحماس والدفء' },
      { trait: 'C', text: 'حذر ومدروس وتفصيلي' },
      { trait: 'S', text: 'هادئ وصبور وداعم' }
    ]
  },
  {
    id: 9,
    section: 'natural',
    category: 'conflict_handling',
    text: 'عند وجود خلاف مع شخص آخر، أنا:',
    options: [
      { trait: 'D', text: 'أواجهه مباشرة وأفرض وجهة نظري' },
      { trait: 'I', text: 'أحاول إيجاد حل يرضي الجميع' },
      { trait: 'S', text: 'أفضل تجنب الصراع قدر الإمكان' },
      { trait: 'C', text: 'أبحث عن الحقائق لحل المشكلة' }
    ]
  },

  // ===== القسم الثاني: النمط المتكيف (تحت الضغط) =====
  {
    id: 10,
    section: 'adaptive',
    category: 'under_pressure',
    text: 'عندما أكون تحت ضغط شديد، أشعر أنني:',
    options: [
      { trait: 'D', text: 'أصبح أكثر حزماً وسلطوية' },
      { trait: 'C', text: 'أقلق بشأن التفاصيل والأخطاء المحتملة' },
      { trait: 'S', text: 'أشعر بالقلق والتوتر' },
      { trait: 'I', text: 'أصبح أكثر عصبية وانفعالية' }
    ]
  },
  {
    id: 11,
    section: 'adaptive',
    category: 'change_resistance',
    text: 'عند مواجهة تغييرات مفاجئة في العمل، أنا:',
    options: [
      { trait: 'D', text: 'أتكيف بسرعة وأركز على الحل' },
      { trait: 'I', text: 'أرى فيها فرصة للتطور والتحفيز' },
      { trait: 'C', text: 'أحتاج وقتاً لفهم التأثيرات والتداعيات' },
      { trait: 'S', text: 'أشعر بعدم الارتياح والقلق من المجهول' }
    ]
  },
  {
    id: 12,
    section: 'adaptive',
    category: 'feedback_reception',
    text: 'عندما أتلقى تقييماً سلبياً عن عملي، أنا:',
    options: [
      { trait: 'D', text: 'أدافع عن موقفي وأبرر أفعالي' },
      { trait: 'C', text: 'أحللها بدقة وأحاول تحسين أدائي' },
      { trait: 'I', text: 'أشعر بالإحباط لفترة ثم أمضي قدماً' },
      { trait: 'S', text: 'أشعر بالجرح والحزن لفترة طويلة' }
    ]
  },
  {
    id: 13,
    section: 'adaptive',
    category: 'deadline_pressure',
    text: 'عند اقتراب موعد نهائي ضيق، أنا:',
    options: [
      { trait: 'D', text: 'أزيد من جهودي وأركز على الإنجاز' },
      { trait: 'I', text: 'أطلب مساعدة الآخرين والدعم' },
      { trait: 'C', text: 'أقلق بشأن جودة العمل والأخطاء' },
      { trait: 'S', text: 'أشعر بالتوتر والضغط النفسي' }
    ]
  },
  {
    id: 14,
    section: 'adaptive',
    category: 'failure_response',
    text: 'عند فشل مشروع أو مهمة مهمة، أنا:',
    options: [
      { trait: 'D', text: 'أحلل الفشل وأعد خطة هجوم جديدة' },
      { trait: 'S', text: 'أشعر بخيبة أمل لكن أحاول مجدداً' },
      { trait: 'I', text: 'أبحث عن الدعم من الآخرين' },
      { trait: 'C', text: 'أقسو على نفسي وأشعر بالذنب' }
    ]
  },
  {
    id: 15,
    section: 'adaptive',
    category: 'workload_excess',
    text: 'عندما يكون لدي كمية عمل كبيرة جداً، أنا:',
    options: [
      { trait: 'D', text: 'أركز على الأولويات وأستبعد الثانويات' },
      { trait: 'I', text: 'أطلب المساعدة وأفوض بعض المهام' },
      { trait: 'S', text: 'أشعر بالإرهاق والقلق' },
      { trait: 'C', text: 'أحاول إنجاز كل شيء بنفس الدقة' }
    ]
  },
  {
    id: 16,
    section: 'adaptive',
    category: 'criticism_handling',
    text: 'عندما ينتقدني شخص ما علناً، أنا:',
    options: [
      { trait: 'D', text: 'أرد بحدة وأدافع عن نفسي' },
      { trait: 'I', text: 'أشعر بالحرج والإحراج' },
      { trait: 'C', text: 'أصمت وأفكر في الانتقاد بعمق' },
      { trait: 'S', text: 'أشعر بالجرح والألم العاطفي' }
    ]
  },
  {
    id: 17,
    section: 'adaptive',
    category: 'conflict_under_stress',
    text: 'عند حدوث خلاف أثناء ضغط شديد، أنا:',
    options: [
      { trait: 'D', text: 'أصبح أكثر شدة وحسماً في الموقف' },
      { trait: 'C', text: 'أنسحب لتحليل الموقف بهدوء' },
      { trait: 'I', text: 'أحاول تخفيف التوتر بالفكاهة' },
      { trait: 'S', text: 'أتجنب الصراع بأي شكل من الأشكال' }
    ]
  },
  {
    id: 18,
    section: 'adaptive',
    category: 'emotional_control',
    text: 'تحت الضغط الشديد، أجد صعوبة في:',
    options: [
      { trait: 'D', text: 'التحلي بالصبر والهدوء' },
      { trait: 'I', text: 'البقاء منظماً والتركيز' },
      { trait: 'S', text: 'أخذ قرارات سريعة' },
      { trait: 'C', text: 'قبول المخاطرة والتجربة' }
    ]
  },

  // ===== القسم الثالث: أسلوب التواصل =====
  {
    id: 19,
    section: 'communication',
    category: 'preferred_format',
    text: 'أفضل طريقة لتوصيل معلومة مهمة لي هي:',
    options: [
      { trait: 'D', text: 'بشكل مباشر وسريع وللنقطة' },
      { trait: 'I', text: 'بطريقة ودية وشخصية ومفصلة' },
      { trait: 'C', text: 'بطريقة مكتوبة وموثقة ودقيقة' },
      { trait: 'S', text: 'بهدوء وبطريقة تدريجية' }
    ]
  },
  {
    id: 20,
    section: 'communication',
    category: 'listening_style',
    text: 'عندما يتحدث الآخرون، أنا عادة:',
    options: [
      { trait: 'D', text: 'أنتظر بفارغ الصبر لكي أرد وأعطي رأيي' },
      { trait: 'I', text: 'أستمع بحماس وأقاطع لتبادل الأفكار' },
      { trait: 'C', text: 'أستمع بعناية وأطرح أسئلة توضيحية' },
      { trait: 'S', text: 'أستمع بصبر وأركز على مشاعرهم' }
    ]
  },
  {
    id: 21,
    section: 'communication',
    category: 'presentation_style',
    text: 'عندما أقدم فكرة أو مشروع، أنا:',
    options: [
      { trait: 'D', text: 'أركز على الفوائد والنتائج المتوقعة' },
      { trait: 'I', text: 'أرويها بحماس وأشارك الآخرين في الحماس' },
      { trait: 'C', text: 'أقدم التفاصيل والبيانات والمعلومات' },
      { trait: 'S', text: 'أستمع لآراء الآخرين قبل البدء' }
    ]
  },
  {
    id: 22,
    section: 'communication',
    category: 'disagreement_handling',
    text: 'عند اختلافي مع أحدهم برأي ما، أنا:',
    options: [
      { trait: 'D', text: 'أعبر عن رأيي بوضوح وحسم' },
      { trait: 'I', text: 'أحاول إيجاد أرضية مشتركة' },
      { trait: 'C', text: 'أبحث عن الحقائق والبيانات' },
      { trait: 'S', text: 'أفضل السلام والتوافق' }
    ]
  },
  {
    id: 23,
    section: 'communication',
    category: 'small_talk',
    text: 'في اللقاءات الاجتماعية والحفلات، أنا:',
    options: [
      { trait: 'I', text: 'أتحرك بحرية وأتحدث مع الكثيرين' },
      { trait: 'D', text: 'أركز على أشخاص معينين لدي أهدافي معهم' },
      { trait: 'S', text: 'أبقى مع مجموعة صغيرة مألوفة' },
      { trait: 'C', text: 'أفضل الجلوس والاستماع' }
    ]
  },
  {
    id: 24,
    section: 'communication',
    category: 'feedback_giving',
    text: 'عندما أعطي ملاحظات لشخص ما، أنا:',
    options: [
      { trait: 'D', text: 'أكون مباشراً وحازماً حول نقاط الضعف' },
      { trait: 'I', text: 'أركز على الإيجابيات ثم أذكر التحسينات' },
      { trait: 'C', text: 'أقدم بيانات وأمثلة ملموسة' },
      { trait: 'S', text: 'أكون حذراً ولطيفاً في اختيار كلماتي' }
    ]
  },
  {
    id: 25,
    section: 'communication',
    category: 'message_clarity',
    text: 'عند تلقي رسالة غير واضحة، أنا:',
    options: [
      { trait: 'D', text: 'أطلب توضيحاً مباشراً وسريعاً' },
      { trait: 'I', text: 'أفسرها بطريقة إيجابية وأمضي قدماً' },
      { trait: 'C', text: 'أطرح أسئلة تفصيلية للتأكد من الفهم' },
      { trait: 'S', text: 'أنتظر توضيحاً لاحقاً' }
    ]
  },
  {
    id: 26,
    section: 'communication',
    category: 'group_discussion',
    text: 'في النقاشات الجماعية، أنا عادة:',
    options: [
      { trait: 'D', text: 'أتولى قيادة النقاش وتوجيهه' },
      { trait: 'I', text: 'أشارك بحماس وأضيف إلى النقاش' },
      { trait: 'C', text: 'أاستمع وأطرح أسئلة محددة' },
      { trait: 'S', text: 'أستمع بصبر وأدعم الآخرين' }
    ]
  },

  // ===== القسم الرابع: القيادة واتخاذ القرار =====
  {
    id: 27,
    section: 'leadership',
    category: 'leadership_style',
    text: 'أسلوبي في القيادة (إن كان لدي فريق) هو:',
    options: [
      { trait: 'D', text: 'توجيهي وحازم وموجه نحو النتائج' },
      { trait: 'I', text: 'ملهم وداعم وموجه للعلاقات' },
      { trait: 'S', text: 'مشجع وداعم للفريق والعمل الجماعي' },
      { trait: 'C', text: 'منظم وموجه بالعمليات والمعايير' }
    ]
  },
  {
    id: 28,
    section: 'leadership',
    category: 'delegation_style',
    text: 'عند تفويض مهمة، أنا:',
    options: [
      { trait: 'D', text: 'أحدد الأهداف وأترك التفاصيل للآخر' },
      { trait: 'I', text: 'أشرح الأهداف بحماس وأدعم الآخر' },
      { trait: 'C', text: 'أقدم تعليمات تفصيلية ودقيقة' },
      { trait: 'S', text: 'أتأكد من فهم الآخر واحتياجاته' }
    ]
  },
  {
    id: 29,
    section: 'leadership',
    category: 'team_performance',
    text: 'عند انخفاض أداء الفريق، أنا:',
    options: [
      { trait: 'D', text: 'أعيد تنظيم الفريق وأحدد مسؤوليات جديدة' },
      { trait: 'I', text: 'أحفز الفريق وأرفع معنويات الجميع' },
      { trait: 'C', text: 'أحلل المشاكل وأضع خطة تحسين' },
      { trait: 'S', text: 'أاستمع لمخاوف الفريق وأدعمهم' }
    ]
  },
  {
    id: 30,
    section: 'leadership',
    category: 'decision_involvement',
    text: 'عند اتخاذ قرار مهم، أنا:',
    options: [
      { trait: 'D', text: 'أتخذ القرار بسرعة بناءً على خبرتي' },
      { trait: 'I', text: 'أاستشير الآخرين وأبني إجماعاً' },
      { trait: 'C', text: 'أجمع بيانات شاملة قبل القرار' },
      { trait: 'S', text: 'أفكر طويلاً وأراعي تأثير القرار على الجميع' }
    ]
  },
  {
    id: 31,
    section: 'leadership',
    category: 'risk_management',
    text: 'عند مواجهة خيار محفوف بالمخاطر، أنا:',
    options: [
      { trait: 'D', text: 'أتقبل المخاطر لتحقيق النتائج الكبيرة' },
      { trait: 'I', text: 'أركز على الفرص الإيجابية' },
      { trait: 'C', text: 'أدرس كل المخاطر المحتملة' },
      { trait: 'S', text: 'أفضل الطريق الآمن والمضمون' }
    ]
  },
  {
    id: 32,
    section: 'leadership',
    category: 'conflict_resolution',
    text: 'عند وجود صراع بين أعضاء الفريق، أنا:',
    options: [
      { trait: 'D', text: 'أتدخل بسرعة وأفرض حلاً واضحاً' },
      { trait: 'I', text: 'أجمعهم وأساعدهم على الحوار' },
      { trait: 'C', text: 'أاستمع لكلا الطرفين بدقة' },
      { trait: 'S', text: 'أحاول إيجاد توازن يرضي الجميع' }
    ]
  },
  {
    id: 33,
    section: 'leadership',
    category: 'change_management',
    text: 'عند قيادة تغيير تنظيمي، أنا:',
    options: [
      { trait: 'D', text: 'أفرض التغيير بقوة وسرعة' },
      { trait: 'I', text: 'أشرح الفوائد وأبني الحماس' },
      { trait: 'C', text: 'أخطط بتفاصيل وأوضح التأثيرات' },
      { trait: 'S', text: 'أمنح الفريق وقتاً كافياً للتكيف' }
    ]
  },
  {
    id: 34,
    section: 'leadership',
    category: 'employee_motivation',
    text: 'لتحفيز فريقي، أنا عادة:',
    options: [
      { trait: 'D', text: 'أعطيهم تحديات وأهداف طموحة' },
      { trait: 'I', text: 'أشيد بإنجازاتهم وأقدرها' },
      { trait: 'C', text: 'أوضح لهم معايير النجاح والجودة' },
      { trait: 'S', text: 'أضمن استقرارهم وأقدرهم' }
    ]
  },

  // ===== القسم الخامس: نقاط القوة والمخاطر =====
  {
    id: 35,
    section: 'strengths_risks',
    category: 'work_environment',
    text: 'أشعر بأفضل أداء لي في بيئة عمل:',
    options: [
      { trait: 'D', text: 'تركز على الإنجازات والنتائج الملموسة' },
      { trait: 'I', text: 'تتسم بالتعاون والحماس والمرح' },
      { trait: 'C', text: 'منظمة بوضوح مع معايير جودة عالية' },
      { trait: 'S', text: 'مستقرة وآمنة مع علاقات قوية' }
    ]
  },
  {
    id: 36,
    section: 'strengths_risks',
    category: 'development_area',
    text: 'من المجالات التي أحتاج لتطويرها:',
    options: [
      { trait: 'D', text: 'الصبر والاستماع الفعال للآخرين' },
      { trait: 'I', text: 'التنظيم والمتابعة والتركيز' },
      { trait: 'C', text: 'المرونة والتكيف مع التغييرات السريعة' },
      { trait: 'S', text: 'الحزم والشجاعة في اتخاذ القرارات' }
    ]
  }
];

/**
 * نظام Forced Choice - المستخدم يختار الأكثر والأقل
 */
export const FORCED_CHOICE_SYSTEM = {
  instruction: 'اختر الخيار الذي ينطبق عليك أكثر والخيار الذي ينطبق عليك أقل',
  scale: {
    most: 'الأكثر انطباقاً',
    least: 'الأقل انطباقاً'
  }
};
