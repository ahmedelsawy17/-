import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Cookie, FlaskConical, Check, ChevronRight, Star, BookOpen, Video, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const PRICING_PLANS = [
  {
    id: 'first-secondary',
    title: 'الصف الأول الثانوي',
    titleEn: 'First Secondary',
    price: 350,
    description: 'تأسيس قوي في الكيمياء',
    features: [
      'شرح شامل لجميع دروس المنهج',
      'تمارين محلولة وتدريبات تفاعلية',
      'اختبارات دورية لمتابعة التقدم',
      'تجارب عملية فيديو',
      'مذكرات وملخصات PDF',
    ],
    color: 'from-purple-600 to-purple-800',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    buttonColor: 'bg-purple-600 hover:bg-purple-700',
    popular: false,
  },
  {
    id: 'second-secondary',
    title: 'الصف الثاني الثانوي',
    titleEn: 'Second Secondary',
    price: 400,
    description: 'التعمق في الكيمياء العضوية وغير العضوية',
    features: [
      'شرح شامل لجميع دروس المنهج',
      'تمارين محلولة وتدريبات تفاعلية',
      'اختبارات دورية لمتابعة التقدم',
      'تجارب عملية فيديو',
      'مذكرات وملخصات PDF',
      'دعم فني للمدرسين',
    ],
    color: 'from-emerald-600 to-emerald-800',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-600',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
    popular: false,
  },
  {
    id: 'third-secondary',
    title: 'الصف الثالث الثانوي',
    titleEn: 'Third Secondary',
    price: 500,
    description: 'رحلة الثانوية العامة نحو الدرجة النهائية',
    features: [
      'شرح شامل لجميع دروس المنهج',
      'تمارين محلولة وتدريبات تفاعلية',
      'اختبارات دورية لمتابعة التقدم',
      'تجارب عملية فيديو',
      'مذكرات وملخصات PDF',
      'دعم فني للمدرسين',
      'متابعة لحظية للمستوى',
      'امتحانات تجريبية',
    ],
    color: 'from-blue-600 to-blue-800',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    popular: true,
  },
];

export default function PricingPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isRTL = i18n.language === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-[#f3f4f6]">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-md mb-6">
              <Cookie size={48} className="text-amber-400" />
              <FlaskConical size={48} className="text-blue-400 -ml-2" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              خطط الأسعار
            </h1>
            <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto">
              اختر الخطة المناسبة لك وابدأ رحلتك نحو التفوق في الكيمياء
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {PRICING_PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${plan.bgColor} rounded-3xl border-2 ${plan.borderColor} overflow-hidden shadow-xl hover:shadow-2xl transition-all ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4 bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1">
                    <Star size={12} className="fill-slate-900" />
                    الأكثر شيوعاً
                  </div>
                )}

                <div className={`bg-gradient-to-br ${plan.color} p-6 text-white relative overflow-hidden`}>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-1">{plan.title}</h3>
                    <p className="text-sm opacity-90 font-bold">{isRTL ? plan.description : plan.titleEn}</p>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full" />
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-white/5 rounded-full" />
                </div>

                <div className="p-6 space-y-6">
                  <div className="text-center">
                    <span className="text-5xl font-black text-slate-800">{plan.price}</span>
                    <span className="text-xl text-slate-500 font-bold mr-1">جنيه</span>
                    <p className="text-xs text-slate-400 font-bold mt-1">للاشتراك السنوي</p>
                  </div>

                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.bgColor}`}>
                          <Check size={12} className={plan.textColor} />
                        </div>
                        <span className="text-sm font-bold text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      if (user) {
                        navigate(`/courses/${plan.id}`);
                      } else {
                        navigate('/login');
                      }
                    }}
                    className={`w-full py-3 rounded-xl text-white font-black text-lg shadow-lg ${plan.buttonColor} transition-colors`}
                  >
                    {user ? 'اشترك الآن' : 'سجل دخول للاشتراك'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-black text-center text-slate-800 mb-12">
            مقارنة الخطط
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-4 text-right font-black">الميزة</th>
                  <th className="p-4 text-center font-black">الأول الثانوي</th>
                  <th className="p-4 text-center font-black">الثاني الثانوي</th>
                  <th className="p-4 text-center font-black">الثالث الثانوي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { feature: 'عدد الفيديوهات', values: ['50+', '60+', '80+'] },
                  { feature: 'المنهج كاملاً', values: [true, true, true] },
                  { feature: 'التمارين المحلولة', values: [true, true, true] },
                  { feature: 'الاختبارات الدورية', values: [true, true, true] },
                  { feature: 'المتابعة اللحظية', values: [false, false, true] },
                  { feature: 'الامتحانات التجريبية', values: [false, false, true] },
                  { feature: 'دعم المدرسين', values: [false, true, true] },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-800">{row.feature}</td>
                    {row.values.map((val, vidx) => (
                      <td key={vidx} className="p-4 text-center">
                        {typeof val === 'boolean' ? (
                          val ? (
                            <Check size={18} className="text-emerald-500 mx-auto" />
                          ) : (
                            <span className="text-slate-300">-</span>
                          )
                        ) : (
                          <span className="font-bold text-slate-600">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 bg-[#f3f4f6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-black text-center text-slate-800 mb-12">
            الأسئلة الشائعة
          </h2>
          <div className="space-y-4">
            {[
              { q: 'هل يمكنني تغيير الخطة لاحقاً؟', a: 'نعم، يمكنك ترقية خطتك في أي وقت والدفع للفرق فقط.' },
              { q: 'هل هناك ضمان استرداد؟', a: 'نعم، نوفر ضمان استرداد لمدة 7 أيام إذا لم تكن راضياً عن الخدمة.' },
              { q: 'كيف يمكنني الدفع؟', a: 'نقبل الدفع عبر البطاقات الائتمانية، فودافون كاش، وأورانج موني.' },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-black text-slate-800 mb-2">{faq.q}</h3>
                <p className="text-slate-600 font-bold text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">جاهز للبدء؟</h2>
          <p className="text-lg text-blue-200 mb-8">
            انضم لآلاف الطلاب واستعد للتفوق في الكيمياء
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/courses')}
            className="px-8 py-3 rounded-2xl bg-white text-blue-600 font-black text-lg shadow-xl inline-flex items-center gap-2 hover:bg-slate-100 transition-colors"
          >
            تصفح الكورسات
            <ChevronRight size={20} className={isRTL ? 'rotate-180' : ''} />
          </motion.button>
        </div>
      </section>
    </div>
  );
}