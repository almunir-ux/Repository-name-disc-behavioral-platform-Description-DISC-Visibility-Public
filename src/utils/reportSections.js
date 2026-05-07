/**
 * أدوات مساعدة لتوليد التقارير الديناميكية
 */

export const ReportSections = {
  /**
   * القسم الأول: المخططات والدرجات
   */
  generateChartsSection: (scores, dominantTrait) => {
    return `
## المخططات والدرجات الأساسية

ملفك الشخصي يظهر الدرجات التالية:
- **${dominantTrait}**: ${scores[dominantTrait]}/100 (السمة السائدة)
- **الدرجات الأخرى**: D: ${scores.D}, I: ${scores.I}, S: ${scores.S}, C: ${scores.C}

هذه الدرجات تعكس ملفك الشخصي الحالي والأنماط السلوكية الرئيسية لديك.
    `;
  },

  /**
   * القسم الثاني: وصف النمط
   */
  generateProfileDescription: (trait, scores) => {
    const descriptions = {
      D: `أنت شخص قيادي طبيعي، تتمتع بقوة شخصية واضحة وتركيز على النتائج. تحب التحديات وتسعى للسيطرة وتحقيق الأهداف بسرعة وفعالية.`,
      I: `أنت شخص اجتماعي وودود، تستمتع بالتفاعل مع الآخرين وتأثيرك عليهم. تتميز بالحماس والتفاؤل وتحب جذب الانتباه.`,
      S: `أنت شخص مستقر وموثوق، تقدّر الاستقرار والعلاقات القوية. تتمتع بالصبر والولاء وتفضل بيئة عمل هادئة ومنظمة.`,
      C: `أنت شخص تحليلي ودقيق، تركز على التفاصيل والجودة. تحب الامتثال للقوانين والنظام وتسعى للكمال في عملك.`
    };
    return descriptions[trait] || 'شخصية متوازنة';
  },

  /**
   * القسم الثالث: المؤشرات المتقدمة
   */
  generateAdvancedMetrics: (metrics, reliability) => {
    return `
## المؤشرات المتقدمة

### مؤشرات الموثوقية:
- ثبات الإجابات: ${metrics.confidenceScore}%
- الاتساق الداخلي: ${metrics.consistencyScore}%
- تجميل الصورة الذاتية: ${metrics.socialDesirabilityScore}%
- التغيير تحت الضغط: ${metrics.stressVariance}%

### تقييم الموثوقية الكلي:
**${reliability.level}** (${reliability.score}/100)

${reliability.issues.length > 0 ? `**النقاط التي تحتاج انتباه:**\n${reliability.issues.map(i => `- ${i}`).join('\n')}` : 'جميع المؤشرات موثوقة'}
    `;
  },

  /**
   * القسم الرابع: الدوافع والمحفزات
   */
  generateMotivations: (trait) => {
    const drives = {
      D: {
        motivations: ['النتائج والإنجازات', 'السلطة والقوة', 'الفوز والتنافس'],
        frustrations: ['الفشل', 'عدم السيطرة', 'الروتين'],
        idealEnvironment: 'بيئة تنافسية تقدّر النتائج والسرعة'
      },
      I: {
        motivations: ['الانتباه والتقدير', 'الانطباع الجيد', 'التأثير على الآخرين'],
        frustrations: ['الوحدة', 'الرفض', 'الملل'],
        idealEnvironment: 'بيئة اجتماعية نشطة وداعمة'
      },
      S: {
        motivations: ['الاستقرار', 'المساعدة', 'العلاقات القوية'],
        frustrations: ['التغيير المفاجئ', 'الصراع', 'عدم التوقع'],
        idealEnvironment: 'بيئة مستقرة وآمنة مع علاقات قوية'
      },
      C: {
        motivations: ['الدقة والجودة', 'الامتثال للقوانين', 'التحليل'],
        frustrations: ['الأخطاء', 'عدم الدقة', 'الفوضى'],
        idealEnvironment: 'بيئة منظمة ومنهجية مع معايير واضحة'
      }
    };

    const drive = drives[trait];
    if (!drive) return '';

    return `
## الدوافع والمحفزات

### يحفزك:
${drive.motivations.map(m => `- ${m}`).join('\n')}

### يحبطك:
${drive.frustrations.map(f => `- ${f}`).join('\n')}

### البيئة المثالية:
${drive.idealEnvironment}
    `;
  },

  /**
   * القسم الخامس: المعرفة العميقة
   */
  generateDeepKnowledge: (trait) => {
    const knowledge = {
      D: {
        communication: 'مباشر وحازم، تفضل النقاط المختصرة والنتائج',
        leadership: 'تقودي وحاسمة، تركز على الأهداف والمسؤولية',
        stressResponse: 'تصبح أكثر حدة وقد تتجاهل مشاعر الآخرين',
        development: 'اعمل على الاستماع للآخرين والصبر والتعاون'
      },
      I: {
        communication: 'تواصلي وودود، تحب الحوار والعلاقات الشخصية',
        leadership: 'ملهمة وجاذبة، تركز على الناس والعلاقات',
        stressResponse: 'تبحث عن الدعم والتحدث عن مشاعرك',
        development: 'اعمل على التنظيم والمتابعة وإنهاء الأمور'
      },
      S: {
        communication: 'هادئة وصبورة، تستمعين للآخرين بعناية',
        leadership: 'داعمة وتعاونية، تركزين على استقرار الفريق',
        stressResponse: 'تنسحبين قليلاً وتحاولين تجنب الصراع',
        development: 'اعملي على أخذ زمام المبادرة والتقبل للتغيير'
      },
      C: {
        communication: 'منطقية ومحترسة، تركزين على التفاصيل والدقة',
        leadership: 'منهجية وموثوقة، تركزين على الجودة والالتزام',
        stressResponse: 'تركزين أكثر على التفاصيل والقلق بشأن الأخطاء',
        development: 'اعملي على المرونة والثقة بالآخرين والسرعة'
      }
    };

    const info = knowledge[trait];
    if (!info) return '';

    return `
## المعرفة العميقة

### أسلوب التواصل:
${info.communication}

### نمط القيادة:
${info.leadership}

### السلوك تحت الضغط:
${info.stressResponse}

### مجالات التطوير المقترحة:
${info.development}
    `;
  }
};

export default ReportSections;
