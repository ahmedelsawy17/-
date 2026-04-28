import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Video, Upload, Search, ChevronRight, Cookie, FlaskConical, Pencil, Trash2, DollarSign, Shield, ArrowLeft, Filter, Plus, FileVideo, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { getAdminVideos, uploadAdminVideo, updateVideoPrice, type VideoAsset } from '../lib/api';
import Navbar from '../components/Navbar';

export default function AdminVideosPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isRTL = i18n.language === 'ar';

  const [videos, setVideos] = React.useState<VideoAsset[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [uploading, setUploading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const [file, setFile] = React.useState<File | null>(null);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priceCents, setPriceCents] = React.useState(0);

  const loadVideos = React.useCallback(async () => {
    try {
      const data = await getAdminVideos();
      setVideos(data.videos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load videos');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (user?.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    void loadVideos();
  }, [user, navigate, loadVideos]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      await uploadAdminVideo({ file, title, description, priceCents });
      setFile(null);
      setTitle('');
      setDescription('');
      setPriceCents(0);
      await loadVideos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const changePrice = async (id: string, nextPrice: number) => {
    await updateVideoPrice(id, nextPrice);
    await loadVideos();
  };

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
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
                 <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">مكتبة الفيديوهات</h1>
                 <p className="text-blue-200 font-bold flex items-center gap-2">
                   إدارة المحاضرات والشروحات المرئية
                   <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                 </p>
               </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10">
               <div className="text-right">
                  <p className="text-xl font-black text-white leading-none mb-1">{videos.length}</p>
                  <p className="text-[10px] text-blue-300 font-black uppercase tracking-widest">إجمالي المحاضرات</p>
               </div>
               <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Video size={20} />
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10 pb-32">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Upload Sidebar */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass p-8 rounded-[48px] border-white/50 shadow-2xl sticky top-32"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                  <Upload size={24} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">رفع جديد</h2>
              </div>

              <form className="space-y-6" onSubmit={(e) => void handleUpload(e)}>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">عنوان المحاضرة</label>
                  <input
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner"
                    placeholder="مثال: الباب الأول - الدرس الأول"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">وصف الدرس</label>
                  <textarea
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner resize-none"
                    placeholder="اكتب نبذة عن محتوى الفيديو..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">السعر المطلوب (ج.م)</label>
                  <div className="relative">
                     <DollarSign size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                     <input
                       type="number"
                       min={0}
                       className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none font-bold text-slate-900 transition-all shadow-inner"
                       placeholder="0.00"
                       value={priceCents}
                       onChange={(e) => setPriceCents(Number(e.target.value))}
                       required
                     />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">ملف الفيديو</label>
                  <div className="relative group">
                     <div className="absolute inset-0 border-2 border-dashed border-slate-200 rounded-2xl group-hover:border-blue-400 transition-colors pointer-events-none" />
                     <input
                       type="file"
                       accept="video/*"
                       className="w-full px-6 py-8 text-xs font-black text-slate-400 file:mr-4 file:py-2 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                       onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                       required
                     />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 rounded-2xl bg-red-50 text-red-600 text-xs font-black flex items-center gap-2"
                    >
                      <AlertCircle size={16} />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  disabled={uploading}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 rounded-[24px] bg-blue-600 text-white font-black text-lg shadow-2xl shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-60 flex items-center justify-center gap-3"
                >
                  {uploading ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Plus size={20} />
                      نشر الفيديو الآن
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Videos Grid */}
          <div className="lg:col-span-8 space-y-10">
            {/* Search Bar */}
            <div className="glass p-8 rounded-[48px] border-white/50 shadow-2xl flex items-center">
               <div className="relative flex-1">
                  <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="ابحث عن محاضرة معينة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-8 py-5 rounded-[28px] bg-white border-2 border-slate-50 focus:border-blue-500 outline-none font-black text-slate-900 transition-all shadow-inner"
                  />
               </div>
            </div>

            {loading ? (
              <div className="text-center py-32">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="inline-block"
                >
                   <RefreshCw size={48} className="text-blue-600" />
                </motion.div>
                <p className="mt-8 text-slate-500 font-black text-lg">جاري تحميل المكتبة...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredVideos.length === 0 ? (
                  <div className="text-center py-32 glass rounded-[56px] border-white/50">
                    <FileVideo size={80} className="text-slate-100 mx-auto mb-8" />
                    <h3 className="text-2xl font-black text-slate-900 mb-2">لا توجد محاضرات</h3>
                    <p className="text-slate-500 font-bold">ابدأ برفع أول محاضرة لك الآن.</p>
                  </div>
                ) : (
                  filteredVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 hover:border-blue-200 transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                           <div className="w-20 h-20 rounded-[28px] bg-slate-50 flex items-center justify-center text-blue-600 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all">
                              <Play size={32} fill="currentColor" />
                           </div>
                           <div>
                              <div className="flex items-center gap-3 mb-2">
                                 <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{video.title}</h3>
                                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${video.isPublished ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                    {video.isPublished ? 'منشور' : 'مسودة'}
                                 </span>
                              </div>
                              <p className="text-sm text-slate-400 font-bold max-w-md line-clamp-1">{video.description}</p>
                           </div>
                        </div>

                        <div className="flex items-center gap-6 pt-6 md:pt-0 border-t md:border-t-0 border-slate-50">
                           <div className="text-right">
                              <p className="text-xs text-slate-400 font-black uppercase mb-1">تعديل السعر</p>
                              <div className="relative">
                                 <input
                                   type="number"
                                   min={0}
                                   defaultValue={video.priceCents}
                                   onBlur={(e) => {
                                     const newPrice = Number(e.target.value);
                                     if (newPrice !== video.priceCents) {
                                       void changePrice(video.id, newPrice);
                                     }
                                   }}
                                   className="w-32 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-xl px-4 py-2 text-sm font-black text-slate-900 transition-all outline-none"
                                 />
                                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">ج.م</span>
                              </div>
                           </div>
                           
                           <div className="flex gap-2">
                              <button className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                 <Pencil size={20} />
                              </button>
                              <button className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                 <Trash2 size={20} />
                              </button>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Play({ size, fill }: any) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  );
}