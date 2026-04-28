import React from 'react';
import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, CheckCircle, Lock, ChevronRight, Cookie, FlaskConical, Clock, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const VIDEOS_DATA = [
  { id: 'v1', title: 'مقدمة في الكيمياء الحرارية', duration: '45:30', isFree: true, watched: true },
  { id: 'v2', title: 'قانون هس والدالة H', duration: '52:15', isFree: false, watched: true },
  { id: 'v3', title: 'حساب التغير في المحتوى الحراري', duration: '48:00', isFree: false, watched: false },
  { id: 'v4', title: 'مفهوم الاتزان الكيميائي', duration: '55:20', isFree: true, watched: false },
  { id: 'v5', title: 'ثابت الاتزان Kc و Kp', duration: '50:10', isFree: false, watched: false },
  { id: 'v6', title: 'عوامل الاتزان الكيميائي', duration: '47:30', isFree: false, watched: false },
  { id: 'v7', title: 'تطبيقات على الاتزان', duration: '51:00', isFree: false, watched: false },
  { id: 'v8', title: 'الأحماض والقواعد القوية', duration: '44:20', isFree: false, watched: false },
];

const CURRENT_VIDEO = {
  id: 'v1',
  title: 'مقدمة في الكيمياء الحرارية',
  videoId: 'ilsiFVellfQ',
  description: 'في هذا الدرس سنتعرف على أساسيات الكيمياء الحرارية وكيفية حساب التغير في المحتوى الحراري للمواد.',
  courseTitle: 'الصف الثالث الثانوي',
  courseId: 'third-secondary',
};

export default function VideoPlayerPage() {
  const { videoId } = useParams<{ videoId?: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const isRTL = i18n.language === 'ar';

  const currentVideoId = videoId || 'v1';
  const currentVideo = VIDEOS_DATA.find(v => v.id === currentVideoId) || VIDEOS_DATA[0];
  const videoData = { ...CURRENT_VIDEO, ...currentVideo, videoId: currentVideo.id === 'v1' ? 'ilsiFVellfQ' : 'es91tSF9HXE' };

  const getYouTubeEmbedUrl = (id: string) =>
    `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-slate-900">
      {/* Top Navigation */}
      <nav className="bg-slate-800/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(`/courses/${videoData.courseId}`)}
            className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
          >
            <ChevronRight size={20} className={isRTL ? 'rotate-180' : ''} />
            <span className="font-bold text-sm">{videoData.courseTitle}</span>
          </button>

          <div className="flex items-center gap-2 text-white">
            <Cookie size={18} className="text-amber-400" />
            <FlaskConical size={18} className="text-blue-400" />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            >
              <iframe
                src={getYouTubeEmbedUrl(videoData.videoId)}
                title={videoData.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </motion.div>

            {/* Video Info */}
            <div className="bg-slate-800 rounded-2xl p-6">
              <h1 className="text-2xl font-black text-white mb-2">{videoData.title}</h1>
              <p className="text-slate-400 font-bold text-sm mb-4">{videoData.description}</p>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-slate-700 rounded-full text-xs font-bold text-slate-300 flex items-center gap-1">
                  <Clock size={12} />
                  {videoData.duration}
                </span>
                {videoData.isFree ? (
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold">
                    مجاني
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold">
                    مشترك
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-700">
                <h3 className="text-lg font-black text-white">قائمة التشغيل</h3>
                <p className="text-sm text-slate-400 font-bold">{VIDEOS_DATA.length} فيديو</p>
              </div>

              <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                {VIDEOS_DATA.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => navigate(`/videos/${video.id}`)}
                    className={`p-4 border-b border-slate-700/50 cursor-pointer hover:bg-slate-700/50 transition-colors ${
                      video.id === currentVideoId ? 'bg-slate-700' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {video.watched ? (
                          <CheckCircle size={20} className="text-emerald-400" />
                        ) : video.isFree ? (
                          <Play size={20} className="text-blue-400" />
                        ) : (
                          <Lock size={20} className="text-slate-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm ${video.id === currentVideoId ? 'text-white' : 'text-slate-300'} truncate`}>
                          {video.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-500 font-bold">{video.duration}</span>
                          {video.isFree && (
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                              مجاني
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {!user && (
                <div className="p-4 bg-slate-700/50 border-t border-slate-700">
                  <p className="text-sm text-slate-300 font-bold mb-3 text-center">
                    سجل دخول للوصول لجميع الفيديوهات
                  </p>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-black text-sm hover:bg-blue-700 transition-colors"
                  >
                    سجل دخول
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}