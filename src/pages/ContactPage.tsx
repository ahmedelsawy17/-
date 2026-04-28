import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Zap, Headset, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';

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
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-mesh selection:bg-blue-100 selection:text-blue-700">
      <Navbar />

      {/* Premium Header */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-mesh to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 text-blue-400 font-black text-xs uppercase tracking-widest mb-8">
              <Headset size={14} className="animate-pulse" />
              دائماً في خدمتك
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              تحدث <span className="text-gradient from-blue-400 to-cyan-300 bg-clip-text">معنا مباشرة</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto font-medium leading-relaxed">
              لديك سؤال؟ فريق الدعم الفني متواجد على مدار الساعة لمساعدتك في كل ما يخص المنصة.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="glass p-10 rounded-[48px] shadow-2xl border-white/50">
              <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">معلومات التواصل</h2>
              
              <div className="space-y-10">
                <ContactInfoItem 
                  icon={<Phone className="text-blue-600" size={24} />}
                  title="اتصل بنا"
                  value="+20 123 456 7890"
                  sub="متاح طوال أيام الأسبوع"
                  color="blue"
                />
                <ContactInfoItem 
                  icon={<Mail className="text-emerald-600" size={24} />}
                  title="البريد الإلكتروني"
                  value="support@eslamchemistry.com"
                  sub="رد سريع خلال 12 ساعة"
                  color="emerald"
                />
                <ContactInfoItem 
                  icon={<MessageCircle className="text-indigo-600" size={24} />}
                  title="واتساب الدعم"
                  value="01234567891"
                  sub="تواصل فوري ومباشر"
                  color="indigo"
                />
              </div>

              <div className="mt-12 pt-10 border-t border-slate-100">
                <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2">
                  <Share2 size={18} className="text-blue-600" />
                  تابعنا اجتماعياً
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['Facebook', 'YouTube', 'Telegram'].map((platform, idx) => (
                    <button
                      key={idx}
                      className="px-5 py-2.5 rounded-2xl bg-slate-50 text-slate-600 font-black text-sm hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-[40px] border-white/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <h3 className="font-black text-slate-900 text-xl">مواعيد العمل</h3>
              </div>
              <div className="space-y-4">
                {[
                  { day: 'الأحد - الخميس', hours: '10:00 ص - 9:00 م' },
                  { day: 'الجمعة', hours: '1:00 م - 8:00 م' },
                  { day: 'السبت', hours: 'عطلة أسبوعية' },
                ].map((schedule, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
                    <span className="font-bold text-slate-600">{schedule.day}</span>
                    <span className="font-black text-slate-900 text-sm">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Premium Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-[56px] p-10 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">أرسل استفسارك</h2>
                <p className="text-slate-500 font-bold mb-12 text-lg">سواء كان لديك سؤال تقني أو تعليمي، نحن هنا للإجابة.</p>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-20"
                    >
                      <div className="w-24 h-24 rounded-[32px] bg-emerald-50 flex items-center justify-center mx-auto mb-8 text-emerald-600 shadow-inner">
                        <Send size={40} className="animate-bounce" />
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 mb-4">وصلت رسالتك بنجاح!</h3>
                      <p className="text-slate-500 font-bold text-lg">فريقنا هيقوم بمراجعة طلبك والرد عليك في أسرع وقت.</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSubmitted(false)}
                        className="mt-10 px-8 py-3 rounded-2xl bg-slate-100 text-slate-600 font-black"
                      >
                        إرسال رسالة أخرى
                      </motion.button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-sm font-black text-slate-800 mr-2">الاسم بالكامل</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="مثال: أحمد محمد"
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-black text-slate-800 mr-2">البريد الإلكتروني</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="mail@example.com"
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-800 mr-2">موضوع الرسالة</label>
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="كيف يمكننا مساعدتك؟"
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-800 mr-2">تفاصيل الرسالة</label>
                        <textarea
                          required
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="اكتب استفسارك هنا بكل وضوح..."
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner resize-none"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-5 rounded-[24px] bg-blue-600 text-white font-black text-xl shadow-2xl shadow-blue-500/25 flex items-center justify-center gap-4 hover:bg-blue-700 transition-all"
                      >
                        <Send size={24} />
                        إرسال الرسالة الآن
                      </motion.button>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ContactInfoItem({ icon, title, value, sub, color }: { icon: React.ReactNode, title: string, value: string, sub: string, color: string }) {
  const bgColors: any = {
    blue: 'bg-blue-50',
    emerald: 'bg-emerald-50',
    indigo: 'bg-indigo-50',
  };

  return (
    <div className="flex items-start gap-5 group">
      <div className={`w-14 h-14 rounded-2xl ${bgColors[color]} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm`}>
        {icon}
      </div>
      <div>
        <h3 className="font-black text-slate-900 text-lg mb-1">{title}</h3>
        <p className="text-slate-700 font-black text-sm mb-1">{value}</p>
        <p className="text-slate-400 text-xs font-bold">{sub}</p>
      </div>
    </div>
  );
}