/**
 * خوارزميات متقدمة للتحليل النفسي
 * يتضمن: تحليل الأنماط، الكشف عن التناقضات، التنبؤ بالسلوك
 */

/**
 * تحليل الأنماط المركبة (Combined Patterns)
 * يكتشف الأنماط الثانوية والتفاعلات بين السمات
 */
export class PatternAnalyzer {
  /**
   * تحليل التوازنات والاختلالات بين السمات
   */
  static analyzeBalance(scores) {
    const { D, I, S, C } = scores;
    const traits = [D, I, S, C];
    const average = traits.reduce((a, b) => a + b, 0) / 4;
    const variance = traits.reduce((sum, score) => sum + Math.pow(score - average, 2), 0) / 4;
    const stdDev = Math.sqrt(variance);

    return {
      average,
      variance,
      stdDev,
      isBalanced: stdDev < 20, // متوازن إذا كان الانحراف المعياري < 20
      dominanceIndex: (D - average) / (average || 1), // مؤشر الهيمنة النسبي
      isExtrovert: (D + I) > (S + C), // إذا كان D+I > S+C = انطوائي
      isPessimistic: C > (D + I), // إذا كان C مرتفع جداً = انطباعي
    };
  }

  /**
   * تحديد الملف الشخصي المركب (Hybrid Profile)
   */
  static identifyHybridProfile(scores) {
    const sorted = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([trait, score]) => ({ trait, score }));

    const primary = sorted[0];
    const secondary = sorted[1];
    const tertiary = sorted[2];

    return {
      primaryTrait: primary.trait,
      primaryScore: primary.score,
      secondaryTrait: secondary.trait,
      secondaryScore: secondary.score,
      tertiaryTrait: tertiary.trait,
      tertiaryScore: tertiary.score,
      hybridType: `${primary.trait}/${secondary.trait}`,
      isStrongPrimary: primary.score - secondary.score > 20, // الفرق > 20 = أساسي قوي
    };
  }
}

/**
 * كاشف التناقضات المتقدم (Advanced Contradiction Detector)
 */
export class ContradictionDetector {
  /**
   * اكتشاف التناقضات بين الإجابات
   */
  static detectContradictions(responses, questions) {
    const contradictions = [];
    const responsesByTrait = this.groupResponsesByTrait(responses, questions);

    for (const [trait, traitResponses] of Object.entries(responsesByTrait)) {
      const scores = traitResponses.map(r => r.response);
      const strongPositive = scores.filter(s => s >= 4).length;
      const strongNegative = scores.filter(s => s <= 2).length;

      // تناقض: إجابات متطرفة في اتجاهين معاكسين
      if (strongPositive > 0 && strongNegative > 0) {
        const conflictRatio = Math.min(strongPositive, strongNegative) / Math.max(strongPositive, strongNegative);
        if (conflictRatio > 0.3) {
          contradictions.push({
            trait,
            severity: conflictRatio,
            message: `تناقضات في سمة ${trait}: إجابات متطرفة في اتجاهين مختلفين`,
            strongPositive,
            strongNegative
          });
        }
      }
    }

    return contradictions;
  }

  /**
   * تجميع الإجابات حسب السمة
   */
  static groupResponsesByTrait(responses, questions) {
    const grouped = { D: [], I: [], S: [], C: [] };

    Object.entries(responses).forEach(([qId, response]) => {
      const question = questions.find(q => q.id === parseInt(qId));
      if (!question) return;

      Object.entries(question.traits).forEach(([trait, weight]) => {
        if (weight !== 0) {
          grouped[trait].push({
            questionId: qId,
            weight,
            response
          });
        }
      });
    });

    return grouped;
  }

  /**
   * كشف محاولات التجميل (Impression Management)
   */
  static detectImpressionManagement(responses, questions) {
    const trapQuestions = questions.filter(q => q.type === 'trap');
    let trapScore = 0;
    let perfectAnswers = 0;

    trapQuestions.forEach(trap => {
      const response = responses[trap.id];
      if (!response) return;

      // الإجابات المثالية على أسئلة المصيدة = محاولة تجميل
      if (trap.isReversed) {
        if (response === 4 || response === 5) trapScore++;
      } else {
        if (response === 1 || response === 2) trapScore++;
      }
    });

    perfectAnswers = trapScore / trapQuestions.length;

    return {
      impressionManagementScore: Math.round(perfectAnswers * 100),
      isSuspicious: perfectAnswers > 0.6,
      severity: perfectAnswers > 0.8 ? 'عالي جداً' : perfectAnswers > 0.6 ? 'عالي' : 'متوسط'
    };
  }
}

/**
 * محلل الاستقرار (Stability Analyzer)
 */
export class StabilityAnalyzer {
  /**
   * تحليل استقرار الشخصية تحت الضغط
   */
  static analyzeStabilityUnderStress(normalScores, stressScores) {
    const shifts = {};
    const traits = ['D', 'I', 'S', 'C'];

    traits.forEach(trait => {
      const normal = normalScores[trait] || 50;
      const stress = stressScores[trait] || 50;
      const shift = stress - normal;
      const shiftPercent = (shift / Math.max(normal, 1)) * 100;

      shifts[trait] = {
        normalScore: normal,
        stressScore: stress,
        shift,
        shiftPercent: Math.round(shiftPercent),
        isSignificant: Math.abs(shift) > 15
      };
    });

    const totalShift = Object.values(shifts).reduce((sum, s) => sum + Math.abs(s.shift), 0) / 4;
    const isStable = totalShift < 15;

    return {
      shifts,
      totalShift: Math.round(totalShift),
      stability: isStable ? 'مستقر جداً' : totalShift < 25 ? 'مستقر' : totalShift < 40 ? 'متوسط' : 'غير مستقر',
      stressResponse: this.analyzeStressResponse(shifts)
    };
  }

  /**
   * تحليل استجابة الضغط
   */
  static analyzeStressResponse(shifts) {
    const increasedUnderStress = Object.entries(shifts)
      .filter(([, data]) => data.shift > 10)
      .map(([trait]) => trait);

    const decreasedUnderStress = Object.entries(shifts)
      .filter(([, data]) => data.shift < -10)
      .map(([trait]) => trait);

    return {
      increased: increasedUnderStress,
      decreased: decreasedUnderStress,
      behaviorUnderStress: this.describeBehaviorUnderStress(increasedUnderStress, decreasedUnderStress)
    };
  }

  /**
   * وصف السلوك تحت الضغط
   */
  static describeBehaviorUnderStress(increased, decreased) {
    const descriptions = [];

    if (increased.includes('D')) {
      descriptions.push('يصبح أكثر حزماً وحاسماً');
    }
    if (increased.includes('I')) {
      descriptions.push('يزداد البحث عن الدعم الاجتماعي');
    }
    if (increased.includes('S')) {
      descriptions.push('ينسحب ويبحث عن الاستقرار');
    }
    if (increased.includes('C')) {
      descriptions.push('ينشغل بالتفاصيل والقلق');
    }

    if (decreased.includes('D')) {
      descriptions.push('يفقد الثقة والحزم');
    }
    if (decreased.includes('I')) {
      descriptions.push('ينعزل عن الآخرين');
    }
    if (decreased.includes('S')) {
      descriptions.push('يصبح أقل صبراً');
    }
    if (decreased.includes('C')) {
      descriptions.push('يتجاهل التفاصيل والدقة');
    }

    return descriptions.length > 0 ? descriptions : ['سلوك متوازن تحت الضغط'];
  }
}

/**
 * محلل الدوافع (Motivation Analyzer)
 */
export class MotivationAnalyzer {
  /**
   * تحليل الدوافع الأساسية
   */
  static analyzeDrives(scores) {
    return {
      D: this.getDriveForDominance(scores.D),
      I: this.getDriveForInfluence(scores.I),
      S: this.getDriveForSteadiness(scores.S),
      C: this.getDriveForConscientiousness(scores.C)
    };
  }

  static getDriveForDominance(score) {
    if (score >= 80) return {
      level: 'عالي جداً',
      motivations: ['السلطة والقوة', 'النتائج والإنجازات', 'الفوز والتنافس', 'الاستقلالية'],
      frustrations: ['الفشل', 'الخسارة', 'عدم السيطرة', 'الروتين']
    };
    if (score >= 60) return {
      level: 'عالي',
      motivations: ['تحقيق الأهداف', 'التطور الوظيفي', 'المسؤولية'],
      frustrations: ['البطء', 'عدم الكفاءة', 'الاعتماد على الآخرين']
    };
    return {
      level: 'متوسط إلى منخفض',
      motivations: ['التعاون', 'الراحة', 'تجنب الصراع'],
      frustrations: ['الضغط', 'المسؤولية الكبيرة']
    };
  }

  static getDriveForInfluence(score) {
    if (score >= 80) return {
      level: 'عالي جداً',
      motivations: ['الانتباه والتقدير', 'الانطباع الجيد', 'التأثير على الآخرين', 'الحماس'],
      frustrations: ['الوحدة', 'الرفض', 'عدم القبول', 'الملل']
    };
    if (score >= 60) return {
      level: 'عالي',
      motivations: ['التعاون', 'الاجتماعية', 'المشاركة'],
      frustrations: ['العزلة', 'الصمت', 'عدم التقدير']
    };
    return {
      level: 'متوسط إلى منخفض',
      motivations: ['العمل المستقل', 'المهام المحددة', 'التركيز'],
      frustrations: ['الفوضى الاجتماعية', 'الاهتمام الزائد']
    };
  }

  static getDriveForSteadiness(score) {
    if (score >= 80) return {
      level: 'عالي جداً',
      motivations: ['الاستقرار', 'المساعدة', 'العلاقات القوية', 'الأمان'],
      frustrations: ['التغيير المفاجئ', 'الصراع', 'عدم التوقع', 'الفوضى']
    };
    if (score >= 60) return {
      level: 'عالي',
      motivations: ['الاستقرار الوظيفي', 'دعم الفريق', 'الولاء'],
      frustrations: ['عدم الاستقرار', 'الصراع', 'السرعة المفرطة']
    };
    return {
      level: 'متوسط إلى منخفض',
      motivations: ['التنوع', 'التغيير', 'المرونة'],
      frustrations: ['الروتين الممل', 'الانتظار الطويل']
    };
  }

  static getDriveForConscientiousness(score) {
    if (score >= 80) return {
      level: 'عالي جداً',
      motivations: ['الدقة والجودة', 'الامتثال للقوانين', 'التحليل', 'الكمال'],
      frustrations: ['الأخطاء', 'عدم الدقة', 'الفوضى', 'الانتهاكات']
    };
    if (score >= 60) return {
      level: 'عالي',
      motivations: ['الجودة', 'التنظيم', 'الدقة'],
      frustrations: ['الأخطاء', 'عدم الرعاية', 'الفوضى']
    };
    return {
      level: 'متوسط إلى منخفض',
      motivations: ['المرونة', 'سرعة الحل', 'التطبيق العملي'],
      frustrations: ['البيروقراطية', 'القواعد الصارمة', 'التفاصيل الزائدة']
    };
  }
}

/**
 * محلل التوافقية (Compatibility Analyzer)
 */
export class CompatibilityAnalyzer {
  /**
   * تحليل التوافق مع الأنماط الأخرى
   */
  static analyzeCompatibility(profile, otherProfile) {
    const compatibility = {};
    const traits = ['D', 'I', 'S', 'C'];

    traits.forEach(trait => {
      const similarity = 100 - Math.abs(profile[trait] - otherProfile[trait]);
      compatibility[trait] = {
        similarity,
        complementary: this.isComplementary(trait, profile[trait], otherProfile[trait])
      };
    });

    const overallScore = Object.values(compatibility).reduce((sum, c) => sum + c.similarity, 0) / 4;

    return {
      compatibility,
      overallScore: Math.round(overallScore),
      recommendation: this.getRecommendation(overallScore)
    };
  }

  static isComplementary(trait, score1, score2) {
    const diff = Math.abs(score1 - score2);
    // التكامل أفضل عندما يكون هناك تنوع معقول (15-35)
    return diff >= 15 && diff <= 35;
  }

  static getRecommendation(score) {
    if (score >= 80) return 'توافق عالي جداً - علاقة قوية محتملة';
    if (score >= 65) return 'توافق جيد - علاقة منتجة';
    if (score >= 50) return 'توافق متوسط - يتطلب التفاهم المتبادل';
    return 'توافق منخفض - يتطلب جهداً كبيراً للتعاون';
  }
}

export default {
  PatternAnalyzer,
  ContradictionDetector,
  StabilityAnalyzer,
  MotivationAnalyzer,
  CompatibilityAnalyzer
};
