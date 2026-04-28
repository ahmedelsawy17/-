import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Video, Upload, Search, ChevronRight, Cookie, FlaskConical, Pencil, Trash2, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { getAdminVideos, uploadAdminVideo, updateVideoPrice, type VideoAsset } from '../lib/api';

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
              <h1 className="text-3xl md:text-4xl font-black">إدارة الفيديوهات</h1>
              <p className="text-blue-200 font-bold mt-1">
                {videos.length} فيديو متاح
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {error ? (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl font-bold mb-6">
            {error}
          </div>
        ) : null}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upload Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 sticky top-24">
              <h2 className="text-xl font-black text-slate-800 mb-4">رفع فيديو جديد</h2>
              <form className="space-y-4" onSubmit={(e) => void handleUpload(e)}>
                <input
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 focus:border-blue-500 outline-none transition-colors font-bold text-sm"
                  placeholder="عنوان الفيديو"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <textarea
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 focus:border-blue-500 outline-none transition-colors font-bold text-sm"
                  placeholder="وصف الفيديو"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block ml-2">السعر (بالجنيه)</label>
                  <input
                    type="number"
                    min={0}
                    className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 focus:border-blue-500 outline-none transition-colors font-bold text-sm"
                    placeholder="السعر"
                    value={priceCents}
                    onChange={(e) => setPriceCents(Number(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block ml-2">ملف الفيديو</label>
                  <input
                    type="file"
                    accept="video/*"
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    required
                  />
                </div>
                <button
                  disabled={uploading}
                  className="w-full mt-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all disabled:opacity-60"
                >
                  {uploading ? 'جاري الرفع...' : 'رفع الفيديو'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Videos List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Search */}
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="ابحث عن فيديو..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-blue-500 outline-none font-bold text-sm"
              />
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
                <p className="mt-4 text-slate-500 font-bold">جاري تحميل الفيديوهات...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredVideos.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
                    <Video size={48} className="text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-bold">لا توجد فيديوهات مطابقة</p>
                  </div>
                ) : (
                  filteredVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100 hover:border-blue-200 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-black text-slate-800 mb-1">{video.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <DollarSign size={14} />
                              {video.priceCents} جنيه
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${video.isPublished ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                              {video.isPublished ? 'منشور' : 'مسودة'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
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
                            className="w-24 border-2 border-slate-100 rounded-xl px-3 py-1.5 text-sm focus:border-blue-500 outline-none text-center"
                          />
                          <button className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                            <Pencil size={16} />
                          </button>
                          <button className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}