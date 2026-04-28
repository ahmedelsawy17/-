import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Loader2, Cookie, FlaskConical, ChevronRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type AuthMode = 'login' | 'signup';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, signup, user } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login({ email: formData.email, password: formData.password });
      } else {
        await signup(formData);
      }
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-mesh overflow-hidden selection:bg-blue-100 selection:text-blue-700">
      {/* Left Side: Premium Branding & Stats */}
      <div className="hidden lg:flex w-[45%] relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900" />
        <div className="absolute inset-0 bg-pattern opacity-10" />
        
        {/* Animated circles */}
        <div className="absolute top-0 left-0 w-full h-full">
           <motion.div 
             animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
             transition={{ duration: 8, repeat: Infinity }}
             className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400 rounded-full blur-[100px]"
           />
           <motion.div 
             animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
             transition={{ duration: 10, repeat: Infinity, delay: 1 }}
             className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px]"
           />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-lg"
        >
          <div className="glass p-12 rounded-[48px] border-white/10 text-center shadow-2xl">
            <div className="inline-flex p-5 rounded-[32px] bg-white/20 backdrop-blur-xl mb-10 shadow-xl border border-white/20">
              <FlaskConical size={64} className="text-white" />
            </div>
            
            <h1 className="text-4xl xl:text-5xl font-black text-white mb-8 leading-tight">
              أهلاً بك في منصة <br /> 
              <span className="text-gradient from-blue-300 to-cyan-200 bg-clip-text font-black">الكيمياء بسكوته</span>
            </h1>
            
            <p className="text-lg xl:text-xl text-blue-100/80 font-bold mb-12 leading-relaxed">
              انضم لأكثر من 50 ألف طالب وطالبة وثقوا في "مستر إسلام غنيم" للوصول للدرجة النهائية.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <CheckCircle2 size={20} />, text: 'شروحات حصرية' },
                { icon: <Zap size={20} />, text: 'امتحانات دورية' },
                { icon: <ShieldCheck size={20} />, text: 'دعم فني متميز' },
                { icon: <Cookie size={20} />, text: 'تبسيط للمنهج' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 border border-white/10 text-white font-black text-sm">
                   <span className="text-blue-300">{item.icon}</span>
                   {item.text}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side: High-End Form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 sm:p-12 md:p-16 relative">
        <Link to="/" className="absolute top-10 right-10 flex items-center gap-2 text-slate-500 font-black hover:text-blue-600 transition-all hover:gap-3 group">
          <span className="text-sm">العودة للمنصة</span>
          <ChevronRight size={18} className="rtl:rotate-180 group-hover:translate-x-1" />
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo for mobile */}
          <div className="mb-12 lg:hidden text-center">
             <div className="inline-flex p-4 rounded-3xl bg-blue-600 shadow-xl shadow-blue-200 text-white mb-4">
                <FlaskConical size={40} />
             </div>
             <h2 className="text-3xl font-black text-slate-900 tracking-tight">الكيمياء بسكوته</h2>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
              {mode === 'login' ? 'تسجيل الدخول' : 'حساب جديد'}
            </h2>
            <p className="text-slate-500 font-bold text-lg">
              {mode === 'login' ? 'أهلاً بك مجدداً! يسعدنا رؤيتك.' : 'ابدأ رحلة التفوق معنا اليوم.'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-black flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-black text-slate-700 mr-2 block">الاسم بالكامل</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="أحمد محمد علي"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none transition-all font-bold bg-white shadow-sm focus:shadow-xl focus:shadow-blue-50"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-sm font-black text-slate-700 mr-2 block">البريد الإلكتروني</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none transition-all font-bold bg-white shadow-sm focus:shadow-xl focus:shadow-blue-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mr-2">
                <label className="text-sm font-black text-slate-700">كلمة المرور</label>
                {mode === 'login' && (
                  <button type="button" className="text-xs font-black text-blue-600 hover:underline">
                    نسيت كلمة المرور؟
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none transition-all font-bold bg-white shadow-sm focus:shadow-xl focus:shadow-blue-50"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black text-lg shadow-2xl shadow-blue-200 hover:shadow-blue-300 transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-8"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <span>{mode === 'login' ? 'دخول للمنصة' : 'إنشاء حساب جديد'}</span>
                  <ArrowRight size={22} className="rtl:rotate-180" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-500 font-bold mb-3">
              {mode === 'login' ? 'ليس لديك حساب بعد؟' : 'لديك حساب بالفعل؟'}
            </p>
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="px-8 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-black transition-all flex items-center gap-3 mx-auto"
            >
              <span>{mode === 'login' ? 'أنشئ حسابك الآن' : 'سجل دخولك هنا'}</span>
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <ChevronRight size={14} className="rtl:rotate-180 text-blue-600" />
              </div>
            </button>
          </div>
          
          <div className="mt-16 flex items-center justify-center gap-3 text-slate-400 font-black text-xs uppercase tracking-widest">
            <span>الكيمياء بسكوته</span>
            <Cookie size={16} className="text-amber-500 animate-bounce" />
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
