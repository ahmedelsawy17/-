import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, ChevronRight, Cookie, FlaskConical, TrendingUp, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { getAdminStudents, type AdminStudentsResponse } from '../lib/api';

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
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-[#f3f4f6]">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-4 md:gap-6"
          >
            <button
              onClick={() => navigate('/admin')}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={20} className={isRTL ? 'rotate-180' : ''} />
            </button>
            <div className="text-center md:text-right">
              <h1 className="text-3xl md:text-4xl font-black">إدارة الطلاب</h1>
              <p className="text-blue-200 font-bold mt-1">
                {studentsData ? `إجمالي الطلاب: ${studentsData.totalStudents}` : 'جاري التحميل...'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {error ? (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl font-bold">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
            <p className="mt-4 text-slate-500 font-bold">جاري تحميل بيانات الطلاب...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Search and Stats */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="ابحث باسم الطالب أو البريد الإلكتروني..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-blue-500 outline-none font-bold text-sm"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-black text-blue-600">{studentsData?.totalStudents}</p>
                    <p className="text-xs text-slate-500 font-bold">إجمالي الطلاب</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-emerald-600">
                      {studentsData?.students.filter(s => s.enrollments.length > 0).length}
                    </p>
                    <p className="text-xs text-slate-500 font-bold">مشتركين</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="p-4 text-right font-black">الاسم</th>
                      <th className="p-4 text-right font-black">البريد الإلكتروني</th>
                      <th className="p-4 text-right font-black">الكورسات</th>
                      <th className="p-4 text-right font-black">متوسط التقدم</th>
                      <th className="p-4 text-right font-black">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
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
                            className="hover:bg-slate-50/50 transition-colors"
                          >
                            <td className="p-4 font-black text-slate-800">{student.fullName}</td>
                            <td className="p-4 font-bold text-slate-500">{student.email}</td>
                            <td className="p-4">
                              <span className="px-2 py-1 bg-slate-100 rounded-lg font-bold text-sm">
                                {student.enrollments.length}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-emerald-500" style={{ width: `${avg}%` }} />
                                </div>
                                <span className="font-black text-emerald-600 text-sm">{avg.toFixed(0)}%</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <button className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs hover:bg-blue-100 transition-colors">
                                عرض التفاصيل
                              </button>
                            </td>
                          </motion.tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-500 font-bold">
                          لا توجد نتائج مطابقة للبحث
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