import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, ChevronRight, Cookie, FlaskConical, TrendingUp, BookOpen, Shield, ArrowLeft, Filter, MoreVertical, Mail, Calendar, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { getAdminStudents, type AdminStudentsResponse } from '../lib/api';
import Navbar from '../components/Navbar';

export default function AdminStudentsPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isRTL = i18n.language === 'ar';

  const [studentsData, setStudentsData] = React.useState<AdminStudentsResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    if (user?.role !== 'ADMIN') {
      navigate('/');
      return;
    }

    const loadStudents = async () => {
      try {
        const data = await getAdminStudents();
        setStudentsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load students');
      } finally {
        setLoading(false);
      }
    };

    void loadStudents();
  }, [user, navigate]);

  const filteredStudents = studentsData?.students.filter(student =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-mesh selection:bg-blue-100 selection:text-blue-700">
      <Navbar />

      {/* Premium Header */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-mesh to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex items-center gap-6">
               <motion.button
                 whileHover={{ x: -10 }}
                 onClick={() => navigate('/admin')}
                 className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white"
               >
                 <ArrowLeft className={isRTL ? '' : 'rotate-180'} size={24} />
               </motion.button>
               <div>
                 <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">إدارة الطلاب</h1>
                 <p className="text-blue-200 font-bold flex items-center gap-2">
                   {studentsData ? `إجمالي الطلاب المسجلين: ${studentsData.totalStudents}` : 'جاري جلب البيانات...'}
                 </p>
               </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-black text-sm flex items-center gap-3 shadow-2xl shadow-blue-500/30"
            >
              <UserPlus size={20} />
              إضافة طالب يدوي
            </motion.button>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10 pb-32">
        {error ? (
          <div className="bg-red-50 border border-red-100 text-red-600 p-8 rounded-[32px] font-black mb-10 flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
             {error}
          </div>
        ) : null}

        {loading ? (
          <div className="text-center py-32">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="inline-block"
            >
               <Users size={64} className="text-blue-600" />
            </motion.div>
            <p className="mt-8 text-slate-500 font-black text-xl">جاري فحص سجلات الطلاب...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-10"
          >
            {/* Control Center */}
            <div className="glass p-8 rounded-[48px] border-white/50 shadow-2xl flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="relative w-full max-w-xl">
                 <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input
                   type="text"
                   placeholder="ابحث عن طالب بالاسم، البريد، أو رقم الهاتف..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full pl-16 pr-8 py-5 rounded-[28px] bg-white border-2 border-slate-50 focus:border-blue-500 outline-none font-black text-slate-900 transition-all shadow-inner"
                 />
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                 <button className="flex-1 md:flex-none px-6 py-4 rounded-2xl bg-white border border-slate-100 font-black text-slate-600 flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
                    <Filter size={18} />
                    تصفية
                 </button>
                 <button className="flex-1 md:flex-none px-6 py-4 rounded-2xl bg-white border border-slate-100 font-black text-slate-600 flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
                    تصدير Excel
                 </button>
              </div>
            </div>

            {/* Students Data Grid */}
            <div className="glass rounded-[56px] border-white/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] overflow-hidden bg-white/40 backdrop-blur-3xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-slate-900/5 text-slate-500 text-xs font-black uppercase tracking-[2px]">
                      <th className="p-8 border-b border-white/20">بيانات الطالب</th>
                      <th className="p-8 border-b border-white/20">الحالة الأكاديمية</th>
                      <th className="p-8 border-b border-white/20">الاشتراكات</th>
                      <th className="p-8 border-b border-white/20">تاريخ الانضمام</th>
                      <th className="p-8 border-b border-white/20">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/20">
                    {filteredStudents && filteredStudents.length > 0 ? (
                      filteredStudents.map((student, index) => {
                        const avg = student.enrollments.length
                          ? student.enrollments.reduce((acc, row) => acc + row.progress, 0) / student.enrollments.length
                          : 0;
                        return (
                          <motion.tr
                            key={student.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group hover:bg-blue-600/[0.02] transition-colors"
                          >
                            <td className="p-8">
                               <div className="flex items-center gap-5">
                                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-xl font-black text-slate-500 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all shadow-sm">
                                     {student.fullName.charAt(0)}
                                  </div>
                                  <div>
                                     <p className="font-black text-slate-900 text-lg mb-1">{student.fullName}</p>
                                     <p className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                                        <Mail size={12} />
                                        {student.email}
                                     </p>
                                  </div>
                               </div>
                            </td>
                            <td className="p-8">
                               <div className="flex flex-col gap-2">
                                  <div className="flex items-center justify-between max-w-[120px]">
                                     <span className="text-[10px] font-black text-slate-400 uppercase">متوسط التقدم</span>
                                     <span className="text-sm font-black text-blue-600">{avg.toFixed(0)}%</span>
                                  </div>
                                  <div className="h-1.5 w-full max-w-[120px] bg-slate-100 rounded-full overflow-hidden">
                                     <div className="h-full bg-blue-600 rounded-full" style={{ width: `${avg}%` }} />
                                  </div>
                               </div>
                            </td>
                            <td className="p-8">
                               <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 text-emerald-600 text-xs font-black border border-emerald-100">
                                  <BookOpen size={14} />
                                  {student.enrollments.length} كورسات
                               </span>
                            </td>
                            <td className="p-8">
                               <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                                  <Calendar size={16} />
                                  24 مارس 2024
                               </div>
                            </td>
                            <td className="p-8">
                               <div className="flex items-center gap-3">
                                  <button className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-black text-xs hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/10">
                                     عرض الملف
                                  </button>
                                  <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-red-600 transition-all">
                                     <MoreVertical size={20} />
                                  </button>
                               </div>
                            </td>
                          </motion.tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-20 text-center">
                           <div className="flex flex-col items-center gap-4 text-slate-300">
                              <Search size={64} className="opacity-20" />
                              <p className="text-xl font-black">لا توجد نتائج مطابقة لبحثك</p>
                           </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}