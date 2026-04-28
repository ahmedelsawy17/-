import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Cookie, FlaskConical, ChevronRight, Send, MessageCircle, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the message to backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

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
              <MessageCircle size={48} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              تواصل معنا
            </h1>
            <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto">
              نحن هنا للإجابة على جميع استفساراتك ومساعدتك في رحلتك التعليمية
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
              <h2 className="text-2xl font-black text-slate-800 mb-6">معلومات التواصل</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800">الهاتف</h3>
                    <p className="text-slate-500 font-bold text-sm mt-1">+20 123 456 7890</p>
                    <p className="text-slate-400 text-xs font-bold">الأحد - الخميس، 10 ص - 8 م</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800">البريد الإلكتروني</h3>
                    <p className="text-slate-500 font-bold text-sm mt-1">info@eslamchemistry.com</p>
                    <p className="text-slate-400 text-xs font-bold">نرد خلال 24 ساعة</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800">العنوان</h3>
                    <p className="text-slate-500 font-bold text-sm mt-1">القاهرة، مصر</p>
                    <p className="text-slate-400 text-xs font-bold">مقر التدريس الرئيسي</p>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h3 className="font-black text-slate-800 mb-4">تابعنا على</h3>
                <div className="flex gap-3">
                  {['فيسبوك', 'يوتيوب', 'إنستجرام'].map((platform, idx) => (
                    <button
                      key={idx}
                      className="px-4 py-2 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={20} className="text-blue-600" />
                <h3 className="font-black text-slate-800">مواعيد العمل</h3>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  { day: 'الأحد - الخميس', hours: '10:00 ص - 8:00 م' },
                  { day: 'الجمعة', hours: '2:00 م - 8:00 م' },
                  { day: 'السبت', hours: 'مغلق' },
                ].map((schedule, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <span className="font-bold text-slate-600">{schedule.day}</span>
                    <span className="font-bold text-slate-800">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100">
              <h2 className="text-2xl font-black text-slate-800 mb-2">أرسل رسالة</h2>
              <p className="text-slate-500 font-bold mb-8">سنرد عليك في أسرع وقت ممكن</p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle size={32} className="text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2">تم إرسال رسالتك!</h3>
                  <p className="text-slate-500 font-bold">سنقوم بالرد عليك قريباً</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-black text-slate-700 mb-2 block">الاسم بالكامل</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="أدخل اسمك"
                        className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 outline-none font-bold text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-black text-slate-700 mb-2 block">البريد الإلكتروني</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@email.com"
                        className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 outline-none font-bold text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-black text-slate-700 mb-2 block">الموضوع</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="موضوع الرسالة"
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 outline-none font-bold text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-black text-slate-700 mb-2 block">الرسالة</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="اكتب رسالتك هنا..."
                      className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 outline-none font-bold text-sm transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-xl shadow-blue-200 flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors"
                  >
                    <Send size={20} />
                    أرسل الرسالة
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-black text-center text-slate-800 mb-12">
            الأسئلة الشائعة
          </h2>
          <div className="space-y-4">
            {[
              { q: 'كيف يمكنني الاشتراك في الكورسات؟', a: 'يمكنك الاشتراك من خلال إنشاء حساب ثم اختيار الكورس المناسب لك والدفع عبر وسائل الدفع المتاحة.' },
              { q: 'هل يمكنني مشاهدة الفيديوهات بعد انتهاء مدة الاشتراك؟', a: 'لا، تحتاج لتجديد الاشتراك لمتابعة مشاهدة الفيديوهات.' },
              { q: 'هل توجد دروس مجانية؟', a: 'نعم، نوفر عدد من الدروس المجانية في كل كورس لتتمكن من تقييم مستوانا.' },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <h3 className="font-black text-slate-800 mb-2">{faq.q}</h3>
                <p className="text-slate-600 font-bold text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}