import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Cookie, FlaskConical, Users, BookOpen, Star, ChevronRight, GraduationCap, Target, Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
      {/* Hero Section */}
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
              <FlaskConical size={48} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              عن <span className="text-blue-400">الكيمياء بسكوته</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto">
              منصة تعليمية رائدة في تدريس الكيمياء للمرحلة الثانوية بأسلوب مبتكر ومبسط
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-20 bg-[#f3f4f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                <Target size={28} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-4">رؤيتنا</h2>
              <p className="text-slate-600 font-bold leading-relaxed">
                أن نكون المنصة التعليمية الأولى في مصر والعالم العربي في تدريس الكيمياء، ونجعل تعلم الكيمياء تجربة ممتعة ومفيدة لكل طالب.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6">
                <Lightbulb size={28} className="text-emerald-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-4">رسالتنا</h2>
              <p className="text-slate-600 font-bold leading-relaxed">
                تقديم محتوى تعليمي متميز في الكيمياء يجمع بين العمق العلمي والبساطة في الطرح، مع متابعة مستمرة لضمان تفوق الطلاب.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Teacher Profile */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-3xl p-8 md:p-12 shadow-xl border border-blue-100"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1 text-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-6xl text-white font-black mx-auto shadow-2xl">
                  إسلام
                </div>
              </div>
              <div className="md:col-span-2">
                <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">أ. إسلام غنيم</h2>
                <p className="text-xl text-blue-600 font-bold mb-4">خبير تدريس الكيمياء للثانوية العامة</p>
                <p className="text-slate-600 font-bold leading-relaxed mb-6">
                  خبرة أكثر من 15 عاماً في تدريس الكيمياء للمرحلة الثانوية. مؤسس منهج "الكيمياء بسكوته" الذي ساعد آلاف الطلاب في تحقيق درجات النهائية في الكيمياء. يتميز بأسلوبه المبسط والممتع في شرح المفاهيم المعقدة.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: <GraduationCap size={20} />, label: 'خبرة 15+ عام', value: '15+' },
                    { icon: <Users size={20} />, label: 'طالب', value: '50K+' },
                    { icon: <BookOpen size={20} />, label: 'فيديو تعليمي', value: '200+' },
                    { icon: <Star size={20} className="text-amber-400 fill-amber-400" />, label: 'تقييم', value: '4.9' },
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-4 text-center shadow-sm">
                      <div className="flex justify-center mb-2 text-blue-600">{stat.icon}</div>
                      <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                      <p className="text-xs text-slate-500 font-bold">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-20 bg-[#f3f4f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-black text-center text-slate-800 mb-12">قيمنا</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'التميز', description: 'نلتزم بأعلى معايير الجودة في المحتوى التعليمي', icon: '🏆' },
              { title: 'الابتكار', description: 'نستخدم أحدث الطرق التعليمية والتكنولوجيا', icon: '💡' },
              { title: 'النتائج', description: 'هدفنا الأول هو تفوق طلابنا وتحقيق أحلامهم', icon: '🎯' },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">{value.title}</h3>
                <p className="text-slate-600 font-bold">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">انضم إلينا الآن</h2>
          <p className="text-lg text-blue-200 mb-8">
            ابدأ رحلتك نحو التفوق في الكيمياء مع أفضل المدرسين
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/courses')}
            className="px-8 py-3 rounded-2xl bg-white text-blue-600 font-black text-lg shadow-xl inline-flex items-center gap-2"
          >
            تصفح الكورسات
            <ChevronRight size={20} className={isRTL ? 'rotate-180' : ''} />
          </motion.button>
        </div>
      </section>
    </div>
  );
}