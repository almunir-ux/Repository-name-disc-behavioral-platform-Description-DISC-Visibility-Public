/**
 * أدوات مساعدة لتوليد التقارير بالذكاء الاصطناعي
 */

export const ReportGenerator = {
  /**
   * توليد وصف تفصيلي للملف الشخصي باستخدام OpenAI
   */
  generateProfileDescription: async (traitType, scores) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'أنت خبير متخصص في تحليل الشخصيات وفقاً لنموذج DISC. اكتب بلغة عربية فصحة وعلمية وممنهجة.'
            },
            {
              role: 'user',
              content: `
اكتب وصفاً مفصلاً (3-4 فقرات) عن شخصية نمط ${traitType} في DISC:
- درجة السمة الأساسية: ${scores[traitType]}/100
- درجات السمات الأخرى: D=${scores.D}, I=${scores.I}, S=${scores.S}, C=${scores.C}

ركز على:
1. نقاط القوة الرئيسية
2. التحديات والقيود
3. أسلوب التواصل
4. كيفية التعامل مع الضغط
5. الدوافع الأساسية

اكتب بطريقة احترافية وشاملة.
              `
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating profile description:', error);
      return getDefaultProfileDescription(traitType, scores);
    }
  },

  /**
   * توليد قائمة التوصيات
   */
  generateRecommendations: async (dominantTrait, hiddenMetrics) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'أنت مستشار متخصص في تطوير الذات والعلاقات الإنسانية وفقاً لنموذج DISC.'
            },
            {
              role: 'user',
              content: `
قدم 5 توصيات عملية محددة لشخص نمط ${dominantTrait}:
- ثبات الإجابات: ${hiddenMetrics.confidenceScore}%
- الاتساق الداخلي: ${hiddenMetrics.consistencyScore}%
- التغير تحت الضغط: ${hiddenMetrics.stressVariance}%

ركز على:
1. تطوير المهارات الضعيفة
2. الاستفادة من نقاط القوة
3. التعامل مع الضغط
4. تحسين العلاقات
5. تطوير الوظيفي

اكتب بصيغة قابلة للتطبيق والتنفيذ.
              `
            }
          ],
          temperature: 0.7,
          max_tokens: 600
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return getDefaultRecommendations(dominantTrait);
    }
  }
};

/**
 * أوصاف افتراضية بديلة
 */
const getDefaultProfileDescription = (traitType, scores) => {
  const profiles = {
    D: `الهيمنة والقيادة هي سماتك الأساسية. أنت شخص حاسم وقوي الشخصية، تركز على النتائج والإنجازات. تحب التحديات وتستمتع بقيادة الفريق نحو أهداف جريئة. قدرتك على اتخاذ القرارات السريعة جعلتك قيادياً طبيعياً. لكن تذكر أن الاستماع للآخرين والصبر قد يعزز من تأثيرك القيادي.`,
    I: `التأثير والتواصل هما قوتك الحقيقية. أنت شخص اجتماعي وودود، تستمتع بالتفاعل مع الناس وتكوين علاقات قوية. إيجابيتك والحماس تعدي للآخرين. قدرتك على الإقناع والتأثير جعلتك مؤثراً اجتماعياً طبيعياً. ركز على تنظيم أفكارك والمتابعة لتحقيق أهدافك.`,
    S: `الاستقرار والدعم هما جوهر شخصيتك. أنت شخص موثوق وصبور، تقدر الاستقرار والعلاقات الدافئة. قدرتك على الاستماع والتفهم تجعلك دعماً قيماً للآخرين. أنت تفضل العمل ضمن فريق متناسق. حاول تطوير مبادرتك والتعامل مع التغييرات بمرونة أكبر.`,
    C: `الدقة والجودة هي شغفك الحقيقي. أنت شخص تحليلي وحذر، تركز على التفاصيل والتأكد من صحة العمل. معاييرك العالية تضمن جودة استثنائية. قدرتك على التحليل المعمق تجعلك خبيراً موثوقاً. لا تتردد في المشاركة بآرائك وقبول المخاطر المحسوبة.`
  };
  return profiles[traitType] || 'شخصية فريدة ومتوازنة';
};

const getDefaultRecommendations = (traitType) => {
  const recommendations = {
    D: `
1. طور مهارات الاستماع الفعّال - اسمع آراء فريقك قبل اتخاذ القرار
2. تعلم الصبر والتفويض - لا تتحكم بكل شيء بنفسك
3. ركز على بناء علاقات قوية - النتائج تأتي من التعاون
4. اعمل على الحساسية العاطفية تجاه الآخرين
5. خذ وقتاً للتفكير قبل اتخاذ القرارات الكبيرة
    `,
    I: `
1. طور مهارات التنظيم والتخطيط - لا تعتمد على العشوائية
2. اعمل على المتابعة والالتزام بالمواعيد
3. استمع أكثر وتحدث أقل في بعض الحالات
4. ركز على التفاصيل والدقة في العمل
5. بني علاقات عميقة بدل علاقات سطحية كثيرة
    `,
    S: `
1. طور ثقتك بنفسك واطلب ما تستحق
2. تدرب على القيادة والمبادرة
3. لا تخافي من التغيير - هو فرصة للنمو
4. اعمل على حزمك في قول "لا" عند الحاجة
5. شارك آراءك بجرأة أكثر
    `,
    C: `
1. تعلم قبول عدم الكمال - البرتقالي جيد أحياناً
2. طور مرونتك في التعامل مع عدم اليقين
3. لا تأخر القرار بسبب البحث عن البيانات المثالية
4. بني علاقات أقوى مع فريقك
5. شارك أفكارك وخبرتك بثقة أكبر
    `
  };
  return recommendations[traitType] || 'ركز على تطوير نقاط قوتك والعمل على ضعفك';
};
