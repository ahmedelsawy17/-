import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, CheckCircle, Lock, ChevronRight, Cookie, FlaskConical, Clock, Download, Share2, MessageCircle, Star, ThumbsUp, Layers, ArrowLeft, ArrowRight, PlayCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const VIDEOS_DATA = [
  { id: 'v1', title: 'مقدمة في الكيمياء الحرارية', duration: '45:30', isFree: true, watched: true, type: 'شرح' },
  { id: 'v2', title: 'قانون هس والدالة H', duration: '52:15', isFree: false, watched: true, type: 'شرح' },
  { id: 'v3', title: 'حساب التغير في المحتوى الحراري', duration: '48:00', isFree: false, watched: false, type: 'مسائل' },
  { id: 'v4', title: 'مفهوم الاتزان الكيميائي', duration: '55:20', isFree: true, watched: false, type: 'شرح' },
  { id: 'v5', title: 'ثابت الاتزان Kc و Kp', duration: '50:10', isFree: false, watched: false, type: 'شرح' },
  { id: 'v6', title: 'عوامل الاتزان الكيميائي', duration: '47:30', isFree: false, watched: false, type: 'تجربة' },
  { id: 'v7', title: 'تطبيقات على الاتزان', duration: '51:00', isFree: false, watched: false, type: 'مسائل' },
];

const CURRENT_VIDEO_DETAILS = {
  id: 'v1',
  title: 'مقدمة في الكيمياء الحرارية',
  videoId: 'ilsiFVellfQ',
  description: 'في هذا الدرس سنتعرف على أساسيات الكيمياء الحرارية وكيفية حساب التغير في المحتوى الحراري للمواد باستخدام قانون هس.',
  courseTitle: 'الصف الثالث الثانوي',
  courseId: 'third-secondary',
  instructor: 'أ. إسلام غنيم',
  views: '12.5K',
  likes: '2.4K'
};

export default function VideoPlayerPage() {
  const { videoId } = useParams<{ videoId?: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const isRTL = i18n.language === 'ar';

  const currentVideoId = videoId || 'v1';
  const currentVideoMetadata = VIDEOS_DATA.find(v => v.id === currentVideoId) || VIDEOS_DATA[0];
  const videoData = { ...CURRENT_VIDEO_DETAILS, ...currentVideoMetadata, videoId: currentVideoMetadata.id === 'v1' ? 'ilsiFVellfQ' : 'es91tSF9HXE' };

  const getYouTubeEmbedUrl = (id: string) =>
    `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&autoplay=1`;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-[#0a0c10] text-slate-100 selection:bg-blue-500/30">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Main Content: Player & Details */}
            <div className="lg:col-span-3 space-y-8">
              
              {/* Cinematic Video Player */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group aspect-video rounded-[40px] overflow-hidden bg-black shadow-[0_0_100px_-20px_rgba(37,99,235,0.2)] border border-white/5"
              >
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
                 <iframe
                    src={getYouTubeEmbedUrl(videoData.videoId)}
                    title={videoData.title}
                    className="w-full h-full relative z-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                 />
              </motion.div>

              {/* Video Information Header */}
              <div className="glass-dark p-8 md:p-10 rounded-[48px] border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2" />
                
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                     <span className="px-4 py-1.5 rounded-full bg-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-600/20">
                        {videoData.courseTitle}
                     </span>
                     <span className="px-4 py-1.5 rounded-full bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest border border-white/5">
                        {videoData.type}
                     </span>
                     {videoData.isFree && (
                       <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                          مجاني للمشاهدة
                       </span>
                     )}
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                     <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                        {videoData.title}
                     </h1>
                     <div className="flex items-center gap-3">
                        <ActionButton icon={<ThumbsUp size={18} />} label={videoData.likes} />
                        <ActionButton icon={<Share2 size={18} />} label="مشاركة" />
                        <ActionButton icon={<Download size={18} />} label="تحميل" highlight />
                     </div>
                  </div>

                  <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                           <Clock size={20} />
                        </div>
                        <div>
                           <p className="text-xs text-slate-400 font-bold mb-1">مدة الدرس</p>
                           <p className="font-black text-white">{videoData.duration}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 border-x border-white/10 px-8 hidden md:flex">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                           <Layers size={20} />
                        </div>
                        <div>
                           <p className="text-xs text-slate-400 font-bold mb-1">رقم المحاضرة</p>
                           <p className="font-black text-white">#0{currentVideoId.replace('v', '')}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 flex items-center justify-center text-emerald-400">
                           <Star size={20} fill="currentColor" />
                        </div>
                        <div>
                           <p className="text-xs text-slate-400 font-bold mb-1">المحاضر</p>
                           <p className="font-black text-white">{videoData.instructor}</p>
                        </div>
                     </div>
                  </div>

                  <div className="mt-10">
                     <h3 className="text-lg font-black text-white mb-4">وصف المحاضرة</h3>
                     <p className="text-slate-400 font-bold leading-relaxed max-w-4xl">
                        {videoData.description}
                     </p>
                  </div>
                </div>
              </div>

              {/* Discussion & Q&A Placeholder */}
              <div className="glass-dark p-8 rounded-[48px] border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400">
                       <MessageCircle size={28} />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-white">قسم المناقشة</h3>
                       <p className="text-sm text-slate-500 font-bold">لديك سؤال؟ اطرحه هنا وسيقوم الفريق بالرد.</p>
                    </div>
                 </div>
                 <button className="px-8 py-3 rounded-2xl bg-blue-600 text-white font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
                    بدء محادثة
                 </button>
              </div>
            </div>

            {/* Sidebar Playlist */}
            <div className="lg:col-span-1">
              <div className="glass-dark rounded-[48px] border-white/5 overflow-hidden sticky top-32">
                <div className="p-8 border-b border-white/5 bg-white/5">
                  <h3 className="text-xl font-black text-white mb-2">محتوى الكورس</h3>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-black tracking-widest">
                     <span>{VIDEOS_DATA.length} محاضرة</span>
                     <span className="text-blue-400">اكتمل 65%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full mt-4 overflow-hidden">
                     <div className="h-full w-2/3 bg-blue-600 rounded-full" />
                  </div>
                </div>

                <div className="p-4 max-h-[calc(100vh-400px)] overflow-y-auto custom-scrollbar space-y-3">
                  {VIDEOS_DATA.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => navigate(`/videos/${video.id}`)}
                      className={`group p-5 rounded-[28px] border border-transparent transition-all cursor-pointer ${
                        video.id === currentVideoId 
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                        : 'hover:bg-white/5 hover:border-white/5 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          video.id === currentVideoId ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'
                        }`}>
                          {video.watched ? (
                            <CheckCircle size={20} className={video.id === currentVideoId ? 'text-white' : 'text-emerald-400'} />
                          ) : video.isFree || user ? (
                            <PlayCircle size={20} className={video.id === currentVideoId ? 'text-white' : 'text-blue-400'} />
                          ) : (
                            <Lock size={20} className="text-slate-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-black text-sm truncate mb-1 ${video.id === currentVideoId ? 'text-white' : 'text-slate-100 group-hover:text-blue-400'}`}>
                             {video.title}
                          </p>
                          <div className="flex items-center gap-3">
                             <span className={`text-[10px] font-black uppercase tracking-tight ${video.id === currentVideoId ? 'text-white/60' : 'text-slate-500'}`}>
                                {video.duration}
                             </span>
                             <span className={`text-[10px] font-black uppercase tracking-tight ${video.id === currentVideoId ? 'text-white/60' : 'text-slate-500'}`}>
                                • {video.type}
                             </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {!user && (
                  <div className="p-8 bg-white/5 border-t border-white/5 text-center">
                    <p className="text-sm text-slate-400 font-bold mb-6 leading-relaxed">
                      سجل دخول لفتح جميع دروس الكورس والمتابعة مع المستر.
                    </p>
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
                    >
                      دخول للمنصة
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, highlight }: { icon: React.ReactNode, label: string, highlight?: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`px-5 py-2.5 rounded-2xl flex items-center gap-2 font-black text-xs transition-all ${
        highlight 
        ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
        : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
      }`}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}