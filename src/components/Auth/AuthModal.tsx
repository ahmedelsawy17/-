import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, ArrowRight, Loader2, Cookie, FlaskConical } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

type AuthMode = 'login' | 'signup';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

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
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'signup' : 'login');
    setError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden bg-white rounded-[32px] shadow-2xl"
          >
            {/* Header with Background Gradient */}
            <div className="relative h-32 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 flex items-end">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div>
                <h2 className="text-3xl font-black text-white leading-none">
                  {mode === 'login' ? 'مرحباً بعودتك' : 'حساب جديد'}
                </h2>
                <p className="text-blue-100 mt-2 font-medium">
                  {mode === 'login' ? 'سجل دخول لمتابعة دروسك' : 'انضم لأقوى منصة كيمياء'}
                </p>
              </div>

              <div className="absolute -bottom-6 left-8 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                {mode === 'login' ? (
                  <FlaskConical className="text-blue-600" size={32} />
                ) : (
                  <Cookie className="text-amber-500" size={32} />
                )}
              </div>
            </div>

            <div className="p-8 pt-12">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="text"
                      placeholder="الاسم بالكامل"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none transition-colors font-bold"
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none transition-colors font-bold"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="password"
                    placeholder="كلمة المرور"
                    required
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:outline-none transition-colors font-bold"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
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

              <div className="mt-8 text-center">
                <p className="text-slate-500 font-bold">
                  {mode === 'login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
                </p>
                <button
                  onClick={toggleMode}
                  className="mt-2 text-blue-600 font-black hover:underline"
                >
                  {mode === 'login' ? 'سجل الآن مجاناً' : 'سجل دخولك هنا'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
