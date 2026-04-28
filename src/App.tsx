import React from 'react';
import { motion } from 'motion/react';
import { Cookie, FlaskConical, Globe, PlayCircle, User, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  getAdminStats,
  getAdminStudents,
  getAdminVideos,
  login,
  signup,
  updateVideoPrice,
  uploadAdminVideo,
  type AdminStatsResponse,
  type AdminStudentsResponse,
  type VideoAsset,
} from './lib/api';

const HERO_IMAGE = '/eslam.png';
const LOGO_IMAGE = '/logo-eslam.png';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
const THIRD_YEAR_VIDEOS = [
  { id: 'v1', title: 'فيديو 1 - ثالثة ثانوي', videoId: 'ilsiFVellfQ' },
  { id: 'v2', title: 'فيديو 2 - ثالثة ثانوي', videoId: 'es91tSF9HXE' },
  { id: 'v3', title: 'فيديو 3 - ثالثة ثانوي', videoId: 'vQqGcpL2DGo' },
];
const NAV_LINKS = [
  { label: 'الرئيسية', href: '#home' },
  { label: 'الكورسات', href: '#courses' },
  { label: 'فيديوهات تالتة', href: '#third-videos' },
  { label: 'تواصل معنا', href: '#contact' },
];

type AuthMode = 'login' | 'signup';
type UserRole = 'ADMIN' | 'STUDENT' | 'INSTRUCTOR' | '';
type ViewMode = 'site' | 'admin';

const getYouTubeEmbedUrl = (videoId: string) =>
  `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`;

function BrandInline({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span>الكيمياء بسكوته</span>
      <Cookie size={16} className="text-amber-500" />
      <FlaskConical size={16} className="text-blue-500" />
    </span>
  );
}

export default function App() {
  const { t, i18n } = useTranslation();
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [displayName, setDisplayName] = React.useState('');
  const [userRole, setUserRole] = React.useState<UserRole>('');
  const [viewMode, setViewMode] = React.useState<ViewMode>('site');

  React.useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const toggleLanguage = () => {
    void i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
  };

  return (
    <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-white text-slate-900">
      <nav className="sticky top-0 z-50 bg-white/95 shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src={LOGO_IMAGE} alt="Logo" className="h-14 w-14 object-contain" />
            <div>
              <h1 className="text-2xl font-black text-blue-600 tracking-tight flex items-center gap-2">
                <BrandInline />
              </h1>
              <p className="text-xs text-slate-500 font-bold">الأستاذ إسلام غنيم</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-7 text-lg font-bold text-slate-600">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-blue-600 transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {userRole === 'ADMIN' ? (
              <button
                onClick={() => setViewMode((prev) => (prev === 'site' ? 'admin' : 'site'))}
                className="px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
              >
                {viewMode === 'site' ? 'Admin Dashboard' : 'العودة للمنصة'}
              </button>
            ) : null}
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={toggleLanguage} className="px-3 py-2 rounded-xl border border-slate-200 text-sm flex items-center gap-2">
              <Globe size={16} />
              {t('language')}
            </motion.button>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setDisplayName('');
                  setUserRole('');
                  setViewMode('site');
                  localStorage.clear();
                }}
                className="px-4 py-2 rounded-xl border-2 border-blue-600 text-blue-600 font-bold"
              >
                {displayName} | {t('logout')}
              </button>
            ) : (
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={() => setIsLoginOpen(true)} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold flex items-center gap-2">
                <User size={16} />
                {t('login')}
              </motion.button>
            )}
          </div>
        </div>
      </nav>

      {viewMode === 'admin' && userRole === 'ADMIN' ? <AdminDashboard /> : <MainSite t={t} />}

      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onSuccess={(name, role) => {
            setDisplayName(name);
            setUserRole(role);
            setIsLoggedIn(true);
            setIsLoginOpen(false);
            if (role === 'ADMIN') setViewMode('admin');
          }}
        />
      )}
    </div>
  );
}

function MainSite({ t }: { t: (key: string) => string }) {
  return (
    <>
      <section id="home" className="bg-[#f3f4f6] py-10 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="relative w-full max-w-[560px] mx-auto overflow-visible"
            >
              <motion.div
                initial={{ opacity: 0, x: 18, y: 8 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.45 }}
                className="absolute top-8 right-0 translate-x-[78%] sm:translate-x-[92%] z-30"
              >
                <div className="relative bg-white text-slate-800 border border-blue-100 shadow-xl rounded-[26px] px-4 py-3 sm:px-5 sm:py-4 max-w-[200px] sm:max-w-[250px]">
                  <p className="text-sm sm:text-base font-black leading-6 inline-flex items-center gap-2">
                    اكتر من 5 سنين في انشاء البسكوتات
                    <Cookie size={16} className="text-amber-500 shrink-0" />
                  </p>
                  <span className="absolute -left-3 top-8 w-6 h-6 rounded-full bg-white border border-blue-100" />
                  <span className="absolute -left-7 top-12 w-4 h-4 rounded-full bg-white border border-blue-100" />
                </div>
              </motion.div>

              <div className="relative w-full bg-slate-100 rounded-[32px] md:rounded-[42px] overflow-hidden border-4 border-white shadow-[0_20px_70px_rgba(15,23,42,.2)]">
                <img src={HERO_IMAGE} alt="أ. إسلام غنيم" className="w-full h-auto object-contain" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-slate-900/65 via-slate-900/20 to-transparent text-white">
                <p className="text-2xl md:text-4xl font-black">أ. إسلام غنيم</p>
                <p className="text-lg md:text-2xl font-bold text-blue-300 mt-2">خبير تدريس الكيمياء للثانوية العامة</p>
                <p className="mt-2 text-sm md:text-lg text-blue-100 font-bold inline-flex items-center gap-2">
                  #الكيمياء_بسكوته
                  <Cookie size={14} className="text-amber-300" />
                  <FlaskConical size={14} className="text-cyan-300" />
                </p>
              </div>
            </motion.div>
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-right">
            <div className="inline-flex px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-sm border border-blue-200 mb-5">
              منصة الأستاذ إسلام غنيم
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[1.1] font-black text-slate-800">
              الكيمياء...
              <br />
              <span className="text-blue-600 inline-flex items-center gap-2">
                بسكوته!
                <Cookie size={30} className="text-amber-500" />
                <FlaskConical size={30} className="text-blue-500" />
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-500 mt-4 lg:mt-6 leading-8 lg:leading-9 max-w-xl mx-auto lg:mx-0">
              تعلم الكيمياء بطريقة ممتعة ومبسطة مع أقوى شرح للمرحلة الثانوية. مذكرات، امتحانات دورية، ومتابعة لحظية لمستواك.
            </p>
            <div className="mt-7 lg:mt-9 flex flex-wrap justify-center lg:justify-start gap-3 lg:gap-4">
              <motion.a whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }} href="#courses" className="bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-black text-lg sm:text-xl shadow-xl shadow-blue-200">
                ابدأ رحلتك الآن
              </motion.a>
              <motion.a whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }} href="#third-videos" className="bg-white border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-lg sm:text-xl flex items-center gap-2">
                <PlayCircle size={20} /> فيديوهات تالتة
              </motion.a>
            </div>
            <div className="mt-8 lg:mt-10 grid grid-cols-3 gap-3 sm:gap-6 border-t border-blue-200 pt-5 sm:pt-6">
              <StatItem value="+٥٠ ألف" label="طالب مشترك" />
              <StatItem value="+٢٠٠" label="فيديو تعليمي" />
              <StatItem value="١٠٠٪" label="تغطية المنهج" />
            </div>
          </div>
        </div>
      </section>

      <section id="courses" className="py-14 sm:py-20 lg:py-24 bg-[#f3f4f6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-4">اختر صفك الدراسي</h3>
          <div className="w-24 h-2 rounded-full bg-blue-600 mx-auto mb-12" />
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            <CourseCard
              icon="🧪"
              title="الصف الثالث الثانوي"
              description="رحلة الثانوية العامة نحو الدرجة النهائية"
              button="عرض فيديوهات تالتة"
              href="#third-videos"
            />
            <CourseCard
              icon="🧫"
              title="الصف الثاني الثانوي"
              description="التعمق في الكيمياء العضوية وغير العضوية"
              button="تصفح الكورسات"
              href="#"
            />
            <CourseCard
              icon="🧬"
              title="الصف الأول الثانوي"
              description="تأسيس قوي في الكيمياء مع تدريبات تفاعلية واختبارات دورية."
              button="تصفح الكورسات"
              href="#"
            />
          </div>
        </div>
      </section>

      <section id="third-videos" className="py-14 sm:py-16 lg:py-20 bg-[#f3f4f6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-4">فيديوهات كورسات تالتة ثانوي</h3>
          <div className="w-24 h-2 rounded-full bg-blue-600 mx-auto mb-10" />
          <div className="space-y-6">
            {THIRD_YEAR_VIDEOS.map((video) => (
              <VideoPreviewCard key={video.id} title={video.title} videoId={video.videoId} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#08163a] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center border-b border-slate-700 pb-8">
            <StatItem value="+٥٠ ألف" label="طالب مسجل" dark />
            <StatItem value="+٢٠٠" label="فيديو تعليمي" dark />
            <StatItem value="١٠٠٪" label="تغطية المنهج" dark />
          </div>
          <p className="text-center mt-6 text-blue-100 font-bold inline-flex items-center justify-center gap-2 w-full">
            الحقوق محفوظة لدكتور اسلام غنيم - #الكيمياء_بسكوته
            <Cookie size={14} className="text-amber-300" />
            <FlaskConical size={14} className="text-cyan-300" />
          </p>
        </div>
      </section>
    </>
  );
}

function CourseCard({
  icon,
  title,
  description,
  button,
  href,
}: {
  icon: string;
  title: string;
  description: string;
  button: string;
  href: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -6 }}
      className="bg-white p-8 rounded-[28px] shadow-xl border border-slate-100 text-center"
    >
      <div className="w-20 h-20 rounded-3xl bg-slate-100 mx-auto flex items-center justify-center text-4xl mb-6">{icon}</div>
      <h4 className="text-2xl sm:text-3xl font-black mb-3">{title}</h4>
      <p className="text-slate-500 text-lg sm:text-xl mb-6 leading-8">{description}</p>
      <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href={href} className="block bg-slate-100 text-blue-600 py-3 rounded-2xl font-bold text-lg sm:text-xl">
        {button}
      </motion.a>
    </motion.div>
  );
}

function VideoPreviewCard({ title, videoId }: { title: string; videoId: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-2xl border border-slate-200 shadow overflow-hidden"
    >
      <div className="aspect-video bg-black">
        <iframe
          src={getYouTubeEmbedUrl(videoId)}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="p-4 font-bold text-lg sm:text-xl">{title}</div>
    </motion.div>
  );
}

function StatItem({ value, label, dark = false }: { value: string; label: string; dark?: boolean }) {
  return (
    <div>
      <p className={`text-2xl sm:text-4xl lg:text-5xl font-black ${dark ? 'text-blue-400' : 'text-blue-600'}`}>{value}</p>
      <p className={`${dark ? 'text-blue-100' : 'text-slate-500'} text-sm sm:text-base lg:text-lg font-bold mt-1`}>{label}</p>
    </div>
  );
}

function AdminDashboard() {
  const [students, setStudents] = React.useState<AdminStudentsResponse | null>(null);
  const [stats, setStats] = React.useState<AdminStatsResponse | null>(null);
  const [videos, setVideos] = React.useState<VideoAsset[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [uploading, setUploading] = React.useState(false);

  const [file, setFile] = React.useState<File | null>(null);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priceCents, setPriceCents] = React.useState(0);

  const loadAll = React.useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    setLoading(true);
    setError('');
    try {
      const [studentsData, statsData, videosData] = await Promise.all([
        getAdminStudents(token),
        getAdminStats(token),
        getAdminVideos(token),
      ]);
      setStudents(studentsData);
      setStats(statsData);
      setVideos(videosData.videos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    const token = localStorage.getItem('accessToken');
    if (!token) return;

    setUploading(true);
    setError('');
    try {
      await uploadAdminVideo(token, { file, title, description, priceCents });
      setFile(null);
      setTitle('');
      setDescription('');
      setPriceCents(0);
      await loadAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const changePrice = async (id: string, nextPrice: number) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    await updateVideoPrice(token, id, nextPrice);
    await loadAll();
  };

  const bars = stats ? Object.entries(stats.enrollmentByDay).slice(-7) : [];
  const maxBar = Math.max(1, ...bars.map(([, count]) => count));

  return (
    <section className="py-10 bg-slate-50 min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black">Admin Dashboard</h2>
          <button onClick={() => void loadAll()} className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold">تحديث</button>
        </div>

        {error ? <p className="text-red-600 font-bold">{error}</p> : null}
        {loading ? <p>جاري تحميل البيانات...</p> : null}

        {stats ? (
          <div className="grid md:grid-cols-5 gap-4">
            <CounterCard label="Students" value={stats.counters.studentsCount} />
            <CounterCard label="Instructors" value={stats.counters.instructorsCount} />
            <CounterCard label="Admins" value={stats.counters.adminsCount} />
            <CounterCard label="Courses" value={stats.counters.coursesCount} />
            <CounterCard label="Videos" value={stats.counters.videosCount} />
          </div>
        ) : null}

        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h3 className="text-xl font-black mb-4">إحصائية التسجيلات (آخر الأيام)</h3>
          <div className="grid grid-cols-7 gap-2 items-end h-40">
            {bars.length === 0 ? <p className="col-span-7 text-slate-500">لا توجد بيانات تسجيل بعد.</p> : null}
            {bars.map(([day, count]) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <div className="w-full bg-blue-100 rounded-t-md relative" style={{ height: `${(count / maxBar) * 130}px` }}>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold">{count}</span>
                </div>
                <span className="text-[10px] text-slate-500">{day.slice(5)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h3 className="text-xl font-black mb-4">رفع فيديو جديد + تحديد السعر</h3>
            <form className="space-y-3" onSubmit={(e) => void handleUpload(e)}>
              <input className="w-full border rounded-xl px-3 py-2" placeholder="عنوان الفيديو" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <textarea className="w-full border rounded-xl px-3 py-2" placeholder="وصف الفيديو" value={description} onChange={(e) => setDescription(e.target.value)} />
              <input type="number" min={0} className="w-full border rounded-xl px-3 py-2" placeholder="السعر بالجنيه *100" value={priceCents} onChange={(e) => setPriceCents(Number(e.target.value))} required />
              <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required />
              <button disabled={uploading} className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold disabled:opacity-60">
                {uploading ? 'جاري الرفع...' : 'رفع الفيديو'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h3 className="text-xl font-black mb-4">الفيديوهات المرفوعة</h3>
            <div className="space-y-3 max-h-96 overflow-auto">
              {videos.map((video) => (
                <VideoRow key={video.id} video={video} onChangePrice={changePrice} />
              ))}
              {videos.length === 0 ? <p className="text-slate-500">لا توجد فيديوهات بعد.</p> : null}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 overflow-x-auto">
          <h3 className="text-xl font-black mb-4">الطلاب ({students?.totalStudents ?? 0})</h3>
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-right">الاسم</th>
                <th className="p-3 text-right">البريد</th>
                <th className="p-3 text-right">عدد الكورسات</th>
                <th className="p-3 text-right">متوسط التقدم</th>
              </tr>
            </thead>
            <tbody>
              {students?.students.map((student) => {
                const avg = student.enrollments.length
                  ? student.enrollments.reduce((acc, row) => acc + row.progress, 0) / student.enrollments.length
                  : 0;
                return (
                  <tr key={student.id} className="border-t">
                    <td className="p-3 font-semibold">{student.fullName}</td>
                    <td className="p-3">{student.email}</td>
                    <td className="p-3">{student.enrollments.length}</td>
                    <td className="p-3">{avg.toFixed(1)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function CounterCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4">
      <p className="text-slate-500 text-sm">{label}</p>
      <p className="text-3xl font-black text-blue-600">{value}</p>
    </div>
  );
}

function VideoRow({ video, onChangePrice }: { video: VideoAsset; onChangePrice: (id: string, nextPrice: number) => Promise<void> }) {
  const [price, setPrice] = React.useState(video.priceCents);
  const [saving, setSaving] = React.useState(false);

  return (
    <div className="border rounded-xl p-3">
      <p className="font-bold">{video.title}</p>
      <a href={`${API_BASE_URL}${video.fileUrl}`} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">
        فتح الفيديو
      </a>
      <div className="mt-2 flex gap-2">
        <input type="number" min={0} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="border rounded-lg px-2 py-1 w-40" />
        <button
          disabled={saving}
          onClick={async () => {
            setSaving(true);
            try {
              await onChangePrice(video.id, price);
            } finally {
              setSaving(false);
            }
          }}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
        >
          {saving ? '...' : 'حفظ السعر'}
        </button>
      </div>
    </div>
  );
}

function LoginModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (name: string, role: UserRole) => void }) {
  const { t } = useTranslation();
  const [mode, setMode] = React.useState<AuthMode>('login');
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = mode === 'login' ? await login({ email, password }) : await signup({ fullName, email, password });

      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('userId', response.user.id);
      localStorage.setItem('role', response.user.role);
      onSuccess(response.user.fullName, response.user.role);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="fixed inset-0 bg-slate-900/55 z-[70] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-black text-slate-800">{mode === 'login' ? t('login') : t('signup')}</h3>
          <button onClick={onClose} className="text-slate-500">
            <X size={20} />
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => void submit(e)}>
          {mode === 'signup' ? <input type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder={t('fullName')} className="w-full border border-slate-200 rounded-xl px-4 py-3" required /> : null}
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t('email')} className="w-full border border-slate-200 rounded-xl px-4 py-3" required />
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder={t('password')} className="w-full border border-slate-200 rounded-xl px-4 py-3" required />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white rounded-xl py-3 font-bold disabled:opacity-60">{loading ? '...' : t('submit')}</button>
          <button type="button" onClick={() => setMode((prev) => (prev === 'login' ? 'signup' : 'login'))} className="w-full text-blue-600 text-sm font-bold">
            {mode === 'login' ? t('switchAuth') : t('switchAuth2')}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
