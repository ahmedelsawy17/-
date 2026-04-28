import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Loader2, Cookie, FlaskConical, ChevronRight } from 'lucide-react';
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
    <div className="min-h-screen flex bg-slate-50 overflow-hidden">
      {/* Left Side: Illustration / Branding */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <div className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-md mb-8">
            <FlaskConical size={64} className="text-white" />
          </div>
          <h1 className="text-5xl font-black text-white mb-6 leading-tight">
            مرحباً بك في عالم <br /> <span className="text-blue-200">الكيمياء بسكوته</span>
          </h1>
          <p className="text-xl text-blue-100 font-bold max-w-md mx-auto leading-relaxed">
            انضم لآلاف الطلاب وابدأ رحلتك نحو التفوق مع الأستاذ إسلام غنيم
          </p>
          
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="text-white">
              <p className="text-3xl font-black">+50K</p>
              <p className="text-sm font-bold text-blue-200">طالب</p>
            </div>
            <div className="text-white">
              <p className="text-3xl font-black">+200</p>
              <p className="text-sm font-bold text-blue-200">فيديو</p>
            </div>
            <div className="text-white">
              <p className="text-3xl font-black">100%</p>
              <p className="text-sm font-bold text-blue-200">نجاح</p>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -left-24 w-64 h-64 border-8 border-white/5 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-12 -right-12 w-48 h-48 border-8 border-white/5 rounded-full"
        />
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 relative">
        <Link to="/" className="absolute top-8 right-8 flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors">
          <span>العودة للمنصة</span>
          <ChevronRight size={20} className="rtl:rotate-180" />
        </Link>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 lg:hidden text-center">
             <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-blue-600 mb-4">
                <FlaskConical size={32} />
             </div>
             <h2 className="text-3xl font-black text-slate-800">الكيمياء بسكوته</h2>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-800 mb-2">
              {mode === 'login' ? 'تسجيل الدخول' : 'حساب جديد'}
            </h2>
            <p className="text-slate-500 font-bold">
              {mode === 'login' ? 'أهلاً بك مجدداً! من فضلك أدخل بياناتك.' : 'ابدأ رحلتك التعليمية معنا اليوم.'}
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-sm font-black text-slate-700 mr-2">الاسم بالكامل</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="مثال: أحمد محمد"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none transition-all font-bold bg-white"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-black text-slate-700 mr-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none transition-all font-bold bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-black text-slate-700 mr-2">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none transition-all font-bold bg-white"
                />
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex justify-end">
                <button type="button" className="text-sm font-bold text-blue-600 hover:underline">
                  نسيت كلمة المرور؟
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-6"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <span>{mode === 'login' ? 'دخول' : 'إنشاء الحساب'}</span>
                  <ArrowRight size={20} className="rtl:rotate-180" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 font-bold">
              {mode === 'login' ? 'ليس لديك حساب بعد؟' : 'لديك حساب بالفعل؟'}
            </p>
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="mt-2 inline-flex items-center gap-2 text-blue-600 font-black hover:gap-3 transition-all"
            >
              <span>{mode === 'login' ? 'أنشئ حسابك الآن' : 'سجل دخولك هنا'}</span>
              <ArrowRight size={18} className="rtl:rotate-180" />
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-2 text-slate-400 font-bold text-sm">
            <span>الكيمياء بسكوته</span>
            <Cookie size={16} className="text-amber-500" />
            <span>&copy; 2026</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
