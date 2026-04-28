import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Cookie, FlaskConical, Check, ChevronRight, Star, BookOpen, Video, Users, Zap, ShieldCheck, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

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
    color: 'from-purple-600 to-indigo-600',
    icon: <Zap size={32} className="text-purple-600" />,
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
    color: 'from-blue-600 to-indigo-700',
    icon: <Star size={32} className="text-amber-500" />,
    popular: true,
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
    color: 'from-emerald-600 to-teal-700',
    icon: <FlaskConical size={32} className="text-emerald-600" />,
    popular: false,
  },
];

export default function PricingPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isRTL = i18n.language === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-mesh selection:bg-blue-100 selection:text-blue-700">
      <Navbar />
      {/* Premium Header */}
      <section className="relative pt-32 pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-blue-300 font-black text-xs uppercase tracking-widest mb-8">
              <CreditCard size={14} />
              باقات الاشتراك التعليمية
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              استثمر في <span className="text-gradient from-blue-400 to-cyan-300 bg-clip-text">مستقبلك الدراسي</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto font-medium leading-relaxed">
              اختر المرحلة الدراسية وابدأ الآن مع أقوى منصة تعليمية متخصصة في الكيمياء للثانوية العامة.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-24 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {PRICING_PLANS.sort((a, b) => (a.popular === b.popular ? 0 : a.popular ? -1 : 1)).map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`flex flex-col relative rounded-[48px] bg-white border-2 ${plan.popular ? 'border-blue-500 ring-8 ring-blue-500/5' : 'border-slate-100'} overflow-hidden shadow-2xl transition-all hover:translate-y-[-8px]`}
              >
                {plan.popular && (
                  <div className="absolute top-8 right-[-35px] rotate-45 bg-blue-600 text-white py-2 px-12 text-xs font-black shadow-lg">
                    الأكثر طلباً
                  </div>
                )}

                <div className="p-10 flex-1 flex flex-col">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="w-16 h-16 rounded-[24px] bg-slate-50 flex items-center justify-center shadow-inner">
                      {plan.icon}
                    </div>
                    <div className="text-right">
                       <p className="text-3xl font-black text-slate-900">{plan.price} <span className="text-lg text-slate-400 font-bold">ج.م</span></p>
                       <p className="text-xs text-slate-500 font-black tracking-wider uppercase">اشتراك سنوي</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-2">{plan.title}</h3>
                  <p className="text-slate-500 font-bold text-sm mb-8">{plan.description}</p>

                  <div className="space-y-4 mb-12 flex-1">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <Check size={12} className="text-blue-600" />
                        </div>
                        <span className="text-slate-600 font-bold text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(user ? `/courses/${plan.id}` : '/login')}
                    className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all ${
                      plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-blue-200' 
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200 shadow-slate-100'
                    }`}
                  >
                    <span>{user ? 'اشترك الآن' : 'ابدأ رحلتك'}</span>
                    <ChevronRight className={isRTL ? 'rotate-180' : ''} size={20} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Comparison Table */}
      <section className="py-24 bg-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">مقارنة شاملة</h2>
              <p className="text-slate-500 font-bold max-w-2xl mx-auto">تعرف على الفرق بين الخطط المتاحة لكل مرحلة دراسية.</p>
            </div>

            <div className="glass rounded-[48px] overflow-hidden border-slate-100 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="p-8 text-right font-black text-slate-800 text-lg border-b border-slate-100">المميزات</th>
                      <th className="p-8 text-center font-black text-purple-600 text-lg border-b border-slate-100">الأول الثانوي</th>
                      <th className="p-8 text-center font-black text-emerald-600 text-lg border-b border-slate-100">الثاني الثانوي</th>
                      <th className="p-8 text-center font-black text-blue-600 text-lg border-b border-slate-100">الثالث الثانوي</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { feature: 'شرح المنهج كاملاً', values: [true, true, true] },
                      { feature: 'تمارين محلولة', values: [true, true, true] },
                      { feature: 'اختبارات دورية', values: [true, true, true] },
                      { feature: 'مذكرات PDF حصرية', values: [true, true, true] },
                      { feature: 'دعم فني وتواصل', values: [true, true, true] },
                      { feature: 'متابعة لحظية للأداء', values: [false, true, true] },
                      { feature: 'امتحانات تجريبية (بوكليت)', values: [false, false, true] },
                      { feature: 'تواصل مباشر مع المستر', values: [false, false, true] },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                        <td className="p-6 pr-8 font-black text-slate-700">{row.feature}</td>
                        {row.values.map((val, vidx) => (
                          <td key={vidx} className="p-6 text-center">
                            {val ? (
                              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                                <Check size={18} strokeWidth={3} />
                              </div>
                            ) : (
                              <span className="text-slate-200 font-black">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
         </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-24 bg-mesh">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">الأسئلة الشائعة</h2>
            <p className="text-slate-500 font-bold">كل ما تريد معرفته عن نظام الاشتراكات والدفع.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: 'كيف يمكنني تفعيل الاشتراك بعد الدفع؟', a: 'يتم التفعيل تلقائياً فور إتمام عملية الدفع عبر المنصة، وستجد الكورسات متاحة في حسابك فوراً.' },
              { q: 'هل يمكنني الدفع عن طريق فودافون كاش؟', a: 'نعم، نوفر جميع وسائل الدفع الإلكتروني المتاحة في مصر (فودافون كاش، فوري، فيزا، ماستر كارد).' },
              { q: 'هل الاشتراك يغطي المنهج بالكامل؟', a: 'نعم، الاشتراك السنوي يغطي جميع دروس المنهج والمراجعات النهائية والامتحانات التجريبية.' },
              { q: 'كيف يمكنني التواصل مع الدعم الفني؟', a: 'يمكنك التواصل معنا عبر الواتساب الموضح في أسفل الصفحة أو من خلال نظام المحادثة داخل المنصة.' },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-[32px] hover:shadow-xl transition-all group cursor-pointer"
              >
                <h3 className="font-black text-xl text-slate-900 mb-4 flex items-center justify-between">
                  {faq.q}
                  <ChevronRight size={20} className="text-blue-600 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-slate-600 font-bold leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto glass-dark rounded-[56px] p-16 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/30 rounded-full blur-[100px] -translate-y-1/2" />
          <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">ابدأ رحلة الـ 60 درجة <br /> في الكيمياء اليوم!</h2>
          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="px-12 py-5 rounded-2xl bg-white text-blue-900 font-black text-xl shadow-2xl flex items-center gap-3 mx-auto"
          >
            سجل حسابك مجاناً
            <Zap size={24} className="text-blue-600 fill-blue-600" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
