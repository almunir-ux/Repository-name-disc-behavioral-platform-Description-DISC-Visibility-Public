/**
 * محرك التقييم النفسي المتقدم
 * يحسب 5 مؤشرات مخفية:
 * 1. Trait Score (درجة السمة)
 * 2. Confidence Score (ثبات الإجابات)
 * 3. Consistency Score (الاتساق الداخلي)
 * 4. Social Desirability Score (تجميل الصورة الذاتية)
 * 5. Stress Variance (التغيير تحت الضغط)
 */

import { DISC_QUESTIONS } from '../data/discQuestions.js';

class PsychologicalScoringEngine {
  constructor() {
    this.responses = {};
    this.scores = {};
    this.hiddenMetrics = {};
  }

  /**
   * 1. حساب درجات السمات الأساسية (Trait Score)
   */
  calculateTraitScores(responses) {
    const scores = { D: 0, I: 0, S: 0, C: 0 };
    let totalWeight = 0;

    Object.entries(responses).forEach(([questionId, responseValue]) => {
      const question = DISC_QUESTIONS.find(q => q.id === parseInt(questionId));
      if (!question) return;

      // حساب التأثير بناءً على قوة الإجابة
      const intensity = Math.abs(responseValue - 3); // 0 إلى 2
      const weight = responseValue; // 1 إلى 5

      // تطبيق الأوزان على كل سمة
      Object.entries(question.traits).forEach(([trait, baseScore]) => {
        if (baseScore !== 0) {
          scores[trait] += baseScore * weight;
          totalWeight += Math.abs(baseScore);
        }
      });
    });

    // تطبيع الدرجات (0-100)
    Object.keys(scores).forEach(trait => {
      scores[trait] = Math.round((scores[trait] / (totalWeight || 1)) * 100);
      scores[trait] = Math.max(0, Math.min(100, scores[trait]));
    });

    return scores;
  }

  /**
   * 2. حساب درجة الثبات (Confidence Score)
   * مدى تأكد الشخص من إجاباته (تجنب الإجابات المحايدة)
   */
  calculateConfidenceScore(responses) {
    let extremeAnswers = 0;
    let totalAnswers = Object.keys(responses).length;

    Object.values(responses).forEach(response => {
      // تعتبر الإجابات 1 أو 5 "متطرفة" و(2 أو 4) "قوية" و3 "محايدة"
      if (response === 1 || response === 5) {
        extremeAnswers += 1.5;
      } else if (response === 2 || response === 4) {
        extremeAnswers += 1;
      }
      // 3 لا تضيف شيء
    });

    const confidence = Math.round((extremeAnswers / (totalAnswers * 1.5)) * 100);
    return Math.max(0, Math.min(100, confidence));
  }

  /**
   * 3. حساب درجة الاتساق (Consistency Score)
   * اختبار التناقضات في الإجابات ذات الصلة
   */
  calculateConsistencyScore(responses) {
    const consistencyPairs = [
      // (قيادي في السؤال 1 يجب أن يكون قيادي في السؤال 22)
      { q1: 1, q2: 22, trait: 'D' },
      { q1: 2, q2: 23, trait: 'I' },
      { q1: 3, q2: 24, trait: 'S' },
      { q1: 4, q2: 21, trait: 'C' },
      { q1: 5, q2: 19, trait: 'D' },
      { q1: 6, q2: 15, trait: 'I' },
      { q1: 7, q2: 26, trait: 'S' },
      { q1: 8, q2: 25, trait: 'C' },
      // مزيد من الأزواج
      { q1: 10, q2: 18, trait: 'D' },
      { q1: 11, q2: 15, trait: 'I' },
    ];

    let consistencyMatches = 0;
    let totalPairs = consistencyPairs.length;

    consistencyPairs.forEach(pair => {
      const resp1 = responses[pair.q1] || 3;
      const resp2 = responses[pair.q2] || 3;

      // درجة التطابق (كلما اقترب الفرق من 0، كان أكثر اتساقاً)
      const difference = Math.abs(resp1 - resp2);
      const match = Math.max(0, 5 - difference);
      consistencyMatches += match;
    });

    const consistency = Math.round((consistencyMatches / (totalPairs * 5)) * 100);
    return Math.max(0, Math.min(100, consistency));
  }

  /**
   * 4. حساب درجة تجميل الصورة الذاتية (Social Desirability Score)
   * اختبار الأسئلة المصيدة والإجابات المثالية جداً
   */
  calculateSocialDesirabilityScore(responses) {
    let suspiciousAnswers = 0;
    let trapQuestionsCount = 0;

    Object.entries(responses).forEach(([questionId, responseValue]) => {
      const question = DISC_QUESTIONS.find(q => q.id === parseInt(questionId));
      if (!question || question.type !== 'trap') return;

      trapQuestionsCount++;

      // في الأسئلة المصيدة، الإجابات 4 أو 5 (موافق/موافق بشدة) غير محتملة
      if (question.isReversed) {
        // إذا كانت الإجابة تماشي الصورة المثالية (4 أو 5)
        if (responseValue >= 4) {
          suspiciousAnswers += 1.5;
        } else if (responseValue === 3) {
          suspiciousAnswers += 0.5;
        }
      } else {
        // أسئلة إيجابية عادية
        if (responseValue <= 2) {
          suspiciousAnswers += 1;
        }
      }
    });

    const desirability = Math.round((suspiciousAnswers / (trapQuestionsCount * 1.5)) * 100);
    return Math.max(0, Math.min(100, desirability));
  }

  /**
   * 5. حساب درجة تغير الشخصية تحت الضغط (Stress Variance)
   * مقارنة الأسئلة العادية مع أسئلة الضغط
   */
  calculateStressVariance(responses) {
    const normalQuestions = DISC_QUESTIONS.filter(q => q.type === 'normal');
    const stressQuestions = DISC_QUESTIONS.filter(q => q.type === 'stress');

    let normalScores = { D: 0, I: 0, S: 0, C: 0 };
    let stressScores = { D: 0, I: 0, S: 0, C: 0 };
    let normalWeight = 0;
    let stressWeight = 0;

    // حساب الدرجات للأسئلة العادية
    normalQuestions.forEach(q => {
      const response = responses[q.id] || 3;
      Object.entries(q.traits).forEach(([trait, baseScore]) => {
        if (baseScore !== 0) {
          normalScores[trait] += baseScore * response;
          normalWeight += Math.abs(baseScore);
        }
      });
    });

    // حساب الدرجات لأسئلة الضغط
    stressQuestions.forEach(q => {
      const response = responses[q.id] || 3;
      Object.entries(q.traits).forEach(([trait, baseScore]) => {
        if (baseScore !== 0) {
          stressScores[trait] += baseScore * response;
          stressWeight += Math.abs(baseScore);
        }
      });
    });

    // حساب الفرق في الأنماط
    let totalVariance = 0;
    const traits = ['D', 'I', 'S', 'C'];
    traits.forEach(trait => {
      const normalNorm = normalScores[trait] / (normalWeight || 1);
      const stressNorm = stressScores[trait] / (stressWeight || 1);
      totalVariance += Math.abs(normalNorm - stressNorm);
    });

    const variance = Math.round((totalVariance / 4) * 25); // تطبيع
    return Math.max(0, Math.min(100, variance));
  }

  /**
   * الدالة الرئيسية: حساب جميع المؤشرات
   */
  analyzeResponses(responses) {
    this.responses = responses;

    // حساب المؤشرات الأساسية
    this.scores.traits = this.calculateTraitScores(responses);

    // حساب المؤشرات المخفية
    this.hiddenMetrics = {
      traitScore: this.scores.traits,
      confidenceScore: this.calculateConfidenceScore(responses),
      consistencyScore: this.calculateConsistencyScore(responses),
      socialDesirabilityScore: this.calculateSocialDesirabilityScore(responses),
      stressVariance: this.calculateStressVariance(responses)
    };

    return {
      scores: this.scores,
      hiddenMetrics: this.hiddenMetrics,
      reliability: this.getReliabilityAssessment()
    };
  }

  /**
   * تقييم موثوقية الاختبار
   */
  getReliabilityAssessment() {
    const { confidenceScore, consistencyScore, socialDesirabilityScore } = this.hiddenMetrics;

    let reliability = {
      score: 0,
      level: 'منخفضة',
      issues: []
    };

    // حساب درجة الموثوقية الإجمالية
    reliability.score = Math.round((confidenceScore + consistencyScore) / 2 - (socialDesirabilityScore * 0.5));
    reliability.score = Math.max(0, Math.min(100, reliability.score));

    // تحديد المستوى
    if (reliability.score >= 80) {
      reliability.level = 'عالية جداً';
    } else if (reliability.score >= 60) {
      reliability.level = 'عالية';
    } else if (reliability.score >= 40) {
      reliability.level = 'متوسطة';
    } else {
      reliability.level = 'منخفضة';
    }

    // تحديد المشاكل
    if (confidenceScore < 40) {
      reliability.issues.push('إجابات متحفظة جداً - قد تحتاج لمزيد من الوضوح');
    }
    if (consistencyScore < 50) {
      reliability.issues.push('تناقضات في الإجابات - قد تكون النتائج متذبذبة');
    }
    if (socialDesirabilityScore > 70) {
      reliability.issues.push('محاولة تحسين الصورة الذاتية - قد لا تعكس الواقع تماماً');
    }

    return reliability;
  }

  /**
   * الحصول على الملف الشخصي السائد
   */
  getDominantProfile() {
    const traits = this.scores.traits;
    const maxScore = Math.max(traits.D, traits.I, traits.S, traits.C);
    const dominantTrait = Object.keys(traits).find(key => traits[key] === maxScore);

    return {
      trait: dominantTrait,
      score: maxScore
    };
  }
}

export default new PsychologicalScoringEngine();
