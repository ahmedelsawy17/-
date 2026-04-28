import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Cookie, FlaskConical, Home, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-[#f3f4f6] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg mx-auto px-4"
      >
        {/* 404 Illustration */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          className="mb-8"
        >
          <div className="text-9xl font-black text-slate-200 leading-none">404</div>
          <div className="flex justify-center gap-3 -mt-4">
            <Cookie size={32} className="text-amber-400" />
            <FlaskConical size={32} className="text-blue-400" />
          </div>
        </motion.div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">
          الصفحة غير موجودة
        </h1>
        <p className="text-lg text-slate-500 font-bold mb-8">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-8 py-3 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-xl shadow-blue-200 inline-flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Home size={20} />
            العودة للرئيسية
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="px-8 py-3 rounded-2xl bg-white text-slate-800 font-black text-lg shadow-xl inline-flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors border-2 border-slate-200"
          >
            <ChevronRight size={20} className={isRTL ? 'rotate-180' : ''} />
            العودة للخلف
          </motion.button>
        </div>

        {/* Help Links */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-400 font-bold mb-4">روابط مفيدة</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'الرئيسية', path: '/' },
              { label: 'الكورسات', path: '/courses' },
              { label: 'تواصل معنا', path: '/contact' },
              { label: 'عن المنصة', path: '/about' },
            ].map((link, idx) => (
              <button
                key={idx}
                onClick={() => navigate(link.path)}
                className="text-sm text-blue-600 font-bold hover:underline"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}