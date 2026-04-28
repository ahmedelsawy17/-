import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  FlaskConical, 
  ChevronDown, 
  User, 
  LogOut, 
  LayoutDashboard, 
  BookOpen,
  Home,
  Info,
  Phone,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isRTL = true; // Hardcoded for now as the app is primarily Arabic

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', path: '/', icon: <Home size={18} /> },
    { name: 'الكورسات', path: '/courses', icon: <BookOpen size={18} /> },
    { name: 'الأسعار', path: '/pricing', icon: <CreditCard size={18} /> },
    { name: 'عن المنصة', path: '/about', icon: <Info size={18} /> },
    { name: 'تواصل معنا', path: '/contact', icon: <Phone size={18} /> },
  ];

  return (
    <nav 
      dir="rtl"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
        ? 'py-4 bg-white/80 backdrop-blur-xl shadow-lg border-b border-slate-100' 
        : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2.5 rounded-2xl bg-blue-600 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
              <FlaskConical className="text-white" size={24} />
            </div>
            <div className="hidden sm:block">
              <span className={`text-xl font-black tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                الكيمياء <span className="text-blue-500">بسكوته</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`px-5 py-2.5 rounded-2xl text-sm font-black transition-all flex items-center gap-2 ${
                  location.pathname === link.path
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                  : scrolled 
                    ? 'text-slate-600 hover:bg-slate-50' 
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                 <Link 
                   to={user.role === 'ADMIN' ? '/admin' : '/profile'}
                   className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-sm transition-all ${
                     scrolled ? 'bg-slate-100 text-slate-900 hover:bg-slate-200' : 'bg-white/10 text-white hover:bg-white/20'
                   }`}
                 >
                   <User size={18} />
                   {user.fullName.split(' ')[0]}
                 </Link>
                 <button 
                   onClick={logout}
                   className="p-2 rounded-2xl text-red-500 hover:bg-red-50 transition-colors"
                   title="تسجيل الخروج"
                 >
                   <LogOut size={20} />
                 </button>
              </div>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-black text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                  <User size={18} />
                  دخول الطلاب
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-2xl transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className={scrolled ? 'text-slate-900' : 'text-white'} /> : <Menu className={scrolled ? 'text-slate-900' : 'text-white'} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-[24px] text-lg font-black transition-all ${
                    location.pathname === link.path
                    ? 'bg-blue-600 text-white shadow-xl'
                    : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-6 mt-6 border-t border-slate-100">
                {user ? (
                   <div className="space-y-2">
                      <Link 
                        to={user.role === 'ADMIN' ? '/admin' : '/profile'}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 px-6 py-4 rounded-[24px] text-lg font-black bg-slate-100 text-slate-900"
                      >
                        <User size={20} />
                        حسابي
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-4 px-6 py-4 rounded-[24px] text-lg font-black text-red-500 hover:bg-red-50 transition-colors text-right"
                      >
                        <LogOut size={20} />
                        تسجيل الخروج
                      </button>
                   </div>
                ) : (
                  <Link 
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-3 px-6 py-5 rounded-[24px] bg-blue-600 text-white font-black text-xl shadow-xl shadow-blue-200"
                  >
                    <User size={22} />
                    دخول الطلاب
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
