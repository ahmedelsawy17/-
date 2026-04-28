import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Cookie, FlaskConical, Home, ChevronRight, Search, RefreshCw, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';

export default function NotFoundPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-mesh flex flex-col selection:bg-blue-100 selection:text-blue-700">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6 pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Animated Illustration */}
          <div className="relative mb-12">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                y: [0, -10, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-[180px] md:text-[240px] font-black text-blue-600/5 leading-none select-none"
            >
              404
            </motion.div>
            
            <div className="absolute inset-0 flex items-center justify-center">
               <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 className="flex gap-6"
               >
                 <div className="w-24 h-24 md:w-32 md:h-32 rounded-[40px] bg-white shadow-2xl flex items-center justify-center text-amber-500 border border-slate-100 -rotate-12">
                    <Cookie size={64} className="animate-bounce" />
                 </div>
                 <div className="w-24 h-24 md:w-32 md:h-32 rounded-[40px] bg-white shadow-2xl flex items-center justify-center text-blue-600 border border-slate-100 rotate-12">
                    <FlaskConical size={64} className="animate-pulse" />
                 </div>
               </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              يبدو أن "البسكوته" ضاعت!
            </h1>
            <p className="text-xl text-slate-500 font-bold mb-12 max-w-md mx-auto leading-relaxed">
              عذراً، الصفحة التي تحاول الوصول إليها غير موجودة حالياً. ربما تم نقلها أو حذفها.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="px-10 py-5 rounded-[28px] bg-blue-600 text-white font-black text-xl shadow-2xl shadow-blue-500/25 flex items-center gap-3 w-full sm:w-auto"
              >
                <Home size={24} />
                العودة للرئيسية
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="px-10 py-5 rounded-[28px] bg-white text-slate-900 font-black text-xl shadow-2xl shadow-slate-200/50 border border-slate-100 flex items-center gap-3 w-full sm:w-auto"
              >
                <ArrowLeft className={isRTL ? '' : 'rotate-180'} size={24} />
                العودة للخلف
              </motion.button>
            </div>
          </motion.div>

          {/* Search Hint */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20 p-8 glass rounded-[48px] border-white/50"
          >
            <p className="text-sm text-slate-400 font-black uppercase tracking-widest mb-6">قد تجد ضالتك هنا</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: 'أحدث الكورسات', path: '/courses' },
                { label: 'باقات الأسعار', path: '/pricing' },
                { label: 'قصة نجاحنا', path: '/about' },
                { label: 'تواصل معنا', path: '/contact' },
              ].map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(link.path)}
                  className="px-5 py-2.5 rounded-2xl bg-white/50 hover:bg-blue-600 hover:text-white transition-all text-sm font-black text-slate-600 border border-white"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <footer className="py-12 text-center text-slate-400 font-black text-[10px] uppercase tracking-[4px]">
         &copy; {new Date().getFullYear()} الكيمياء بسكوته • جميع الحقوق محفوظة
      </footer>
    </div>
  );
}