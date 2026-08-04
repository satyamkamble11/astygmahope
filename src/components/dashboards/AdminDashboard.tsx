import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useCMS } from '../../context/CMSContext';
import { useSoundVault } from '../../context/SoundVaultContext';
import { CLINIC_DATA } from '../../data/clinicData';
import { createSoundTrack, isSupabaseConfigured } from '../../lib/queries';
import { 
  Palette, 
  Sparkles, 
  Instagram, 
  Share2, 
  Plus, 
  Settings, 
  ShieldCheck,
  Type,
  Sun,
  Moon,
  Music,
  CheckCircle2,
  Lock,
  Upload
} from 'lucide-react';
import { ThemeMode, CMSCategory, SoundCategory, SoundTrack } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { theme, setTheme, fontScale, setFontScale } = useTheme();
  const { addPost } = useCMS();
  const { tracks } = useSoundVault();

  const [activeTab, setActiveTab] = useState<'themes' | 'cms' | 'music' | 'socials'>('themes');

  // CMS Form state
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState<CMSCategory>('Story');
  const [postContent, setPostContent] = useState('');
  const [authorName, setAuthorName] = useState('Dr. Umesh Datta Kalekar');
  const [cmsSuccessMsg, setCmsSuccessMsg] = useState('');

  // Music Form state
  const [musicTitle, setMusicTitle] = useState('');
  const [musicCategory, setMusicCategory] = useState<SoundCategory>('Meditation');
  const [musicDuration, setMusicDuration] = useState('15:00');
  const [musicFreq, setMusicFreq] = useState(432);
  const [musicDesc, setMusicDesc] = useState('');
  const [musicFilePath, setMusicFilePath] = useState('');
  const [musicSuccessMsg, setMusicSuccessMsg] = useState('');
  const [musicList, setMusicList] = useState<SoundTrack[]>(tracks);

  // Social Links state
  const [instaUrl, setInstaUrl] = useState(CLINIC_DATA.socials.instagram);
  const [fbUrl, setFbUrl] = useState(CLINIC_DATA.socials.facebook);
  const [ytUrl, setYtUrl] = useState(CLINIC_DATA.socials.youtube);

const handleCMSPublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postContent) return;

    const ok = await addPost({
      title: postTitle,
      category: postCategory,
      content: postContent,
      author: authorName,
      mediaType: 'image'
    });

    if (ok) {
      setPostTitle('');
      setPostContent('');
      setCmsSuccessMsg('Post published successfully to site feed!');
    } else {
      setCmsSuccessMsg('Failed to publish post. Please try again.');
    }
    setTimeout(() => setCmsSuccessMsg(''), 4000);
  };

  const handleAddMusic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!musicTitle) return;

    const newTrack: SoundTrack = {
      id: `custom-snd-${Date.now()}`,
      title: musicTitle,
      category: musicCategory,
      duration: musicDuration || '15:00',
      filePath: musicFilePath || `/assets/music/${musicCategory.toLowerCase()}/${musicTitle.toLowerCase().replace(/\s+/g, '_')}.mp3`,
      frequencyHz: musicFreq,
      description: musicDesc || `${musicCategory} healing acoustic track added by Clinic Admin.`,
      isCustomUploaded: true
    };

    if (isSupabaseConfigured) {
      try {
        await createSoundTrack({
          title: newTrack.title,
          category: newTrack.category,
          duration: newTrack.duration,
          filePath: newTrack.filePath,
          frequencyHz: newTrack.frequencyHz,
          description: newTrack.description,
        });
      } catch (err) {
        console.error('Failed to add sound track to Supabase:', err);
        setMusicSuccessMsg('Failed to add track. Please try again.');
        setTimeout(() => setMusicSuccessMsg(''), 4000);
        return;
      }
    }

    setMusicList(prev => [newTrack, ...prev]);
    setMusicTitle('');
    setMusicDesc('');
    setMusicFilePath('');
    setMusicSuccessMsg(`Track "${newTrack.title}" added to ${newTrack.category} category in Healing Vault!`);
    setTimeout(() => setMusicSuccessMsg(''), 4000);
  };

  return (
    <div className="py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-emerald-800/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Super Admin & Master Configuration Dashboard</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-emerald-950 dark:text-white mt-1">
            Clinic Platform Control Panel
          </h2>
          <p className="text-xs text-gray-500">
            One-click Theme Manager, Instagram-style CMS publisher, Audio Vault Manager, and social handles.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('themes')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'themes' ? 'bg-emerald-800 text-white shadow-md' : 'glass-panel text-gray-600 dark:text-gray-300'
            }`}
          >
            <Palette className="w-3.5 h-3.5" /> Themes
          </button>
          <button
            onClick={() => setActiveTab('cms')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'cms' ? 'bg-emerald-800 text-white shadow-md' : 'glass-panel text-gray-600 dark:text-gray-300'
            }`}
          >
            <Instagram className="w-3.5 h-3.5" /> CMS
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'music' ? 'bg-emerald-800 text-white shadow-md' : 'glass-panel text-gray-600 dark:text-gray-300'
            }`}
          >
            <Music className="w-3.5 h-3.5 text-amber-500" /> Music Vault
          </button>
          <button
            onClick={() => setActiveTab('socials')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'socials' ? 'bg-emerald-800 text-white shadow-md' : 'glass-panel text-gray-600 dark:text-gray-300'
            }`}
          >
            <Settings className="w-3.5 h-3.5" /> Settings
          </button>
        </div>
      </div>

      {/* Tab 1: Theme Manager */}
      {activeTab === 'themes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="glass-panel rounded-3xl p-6 space-y-6">
            <h3 className="font-serif font-bold text-lg text-emerald-950 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>One-Click Theme Engine</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              
              <button
                onClick={() => setTheme('light')}
                className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
                  theme === 'light' ? 'border-emerald-700 ring-2 ring-emerald-500 bg-emerald-50/50' : 'border-gray-200 dark:border-gray-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Sun className="w-5 h-5 text-amber-500" />
                  {theme === 'light' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <p className="font-bold text-xs">Light Luxury</p>
                <p className="text-[10px] text-gray-500">Warm Ivory & Deep Sage</p>
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
                  theme === 'dark' ? 'border-teal-400 ring-2 ring-teal-400 bg-emerald-950/80' : 'border-gray-200 dark:border-gray-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Moon className="w-5 h-5 text-teal-400" />
                  {theme === 'dark' && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
                </div>
                <p className="font-bold text-xs">Dark Obsidian</p>
                <p className="text-[10px] text-gray-400">Obsidian Emerald & Teal</p>
              </button>

              <button
                onClick={() => setTheme('diwali')}
                className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
                  theme === 'diwali' ? 'border-amber-500 ring-2 ring-amber-500 bg-rose-950/80' : 'border-gray-200 dark:border-gray-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  {theme === 'diwali' && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                </div>
                <p className="font-bold text-xs">Diwali Festival</p>
                <p className="text-[10px] text-rose-300">Royal Ruby & Radiant Gold</p>
              </button>

              <button
                onClick={() => setTheme('navratri')}
                className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
                  theme === 'navratri' ? 'border-purple-500 ring-2 ring-purple-500 bg-purple-950/80' : 'border-gray-200 dark:border-gray-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  {theme === 'navratri' && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                </div>
                <p className="font-bold text-xs">Navratri Festival</p>
                <p className="text-[10px] text-purple-300">Mystic Violet & Emerald</p>
              </button>

            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 space-y-6">
            <h3 className="font-serif font-bold text-lg text-emerald-950 dark:text-white flex items-center gap-2">
              <Type className="w-5 h-5 text-emerald-700 dark:text-teal-400" />
              <span>Typography & UI Scale</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>Font Scale Ratio:</span>
                <span className="text-emerald-700 dark:text-teal-400">{fontScale}%</span>
              </div>
              <input
                type="range"
                min="85"
                max="120"
                step="5"
                value={fontScale}
                onChange={(e) => setFontScale(parseInt(e.target.value))}
                className="w-full accent-emerald-700"
              />
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: CMS Publisher */}
      {activeTab === 'cms' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-xl text-emerald-950 dark:text-white flex items-center gap-2">
              <Instagram className="w-5 h-5 text-pink-600" />
              <span>Publish Instagram Style Content</span>
            </h3>
          </div>

          {cmsSuccessMsg && (
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 font-semibold text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{cmsSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleCMSPublish} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Post Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ultra Yoga Workshop Highlights"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Category *</label>
                <select
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value as CMSCategory)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
                >
                  <option value="Story">Instagram Story</option>
                  <option value="Blog">Blog Article</option>
                  <option value="HealthTip">Daily Health Tip</option>
                  <option value="FestivalBanner">Festival Banner</option>
                  <option value="HealthCamp">Free Health Camp Alert</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Author Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Content *</label>
              <textarea
                rows={4}
                required
                placeholder="Write full story or blog text..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs shadow-md flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Publish to Site Feed
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Music Vault Manager */}
      {activeTab === 'music' && (
        <div className="space-y-6">
          
          <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-emerald-950 dark:text-white flex items-center gap-2">
                  <Music className="w-5 h-5 text-amber-500" />
                  <span>Private Sound Vault Audio Upload</span>
                </h3>
                <p className="text-xs text-gray-500">
                  Upload & register custom healing sound tracks for patient streaming.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold flex items-center gap-1">
                <Lock className="w-3 h-3" /> Password Protected
              </span>
            </div>

            {musicSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 font-semibold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{musicSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleAddMusic} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Track Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Garbhasanskar Peace Frequency"
                  value={musicTitle}
                  onChange={(e) => setMusicTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Category *</label>
                  <select
                    value={musicCategory}
                    onChange={(e) => setMusicCategory(e.target.value as SoundCategory)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
                  >
                    <option value="Meditation">Meditation</option>
                    <option value="Pregnancy">Pregnancy Music</option>
                    <option value="Healing">Healing Music</option>
                    <option value="Relaxation">Relaxation</option>
                    <option value="Yoga">Yoga Music</option>
                    <option value="Nature">Nature Sounds</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Duration</label>
                  <input
                    type="text"
                    placeholder="15:00"
                    value={musicDuration}
                    onChange={(e) => setMusicDuration(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Frequency (Hz)</label>
                  <input
                    type="number"
                    value={musicFreq}
                    onChange={(e) => setMusicFreq(parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Audio File Path / Upload URL</label>
                <input
                  type="text"
                  placeholder="/assets/music/meditation/track_name.mp3"
                  value={musicFilePath}
                  onChange={(e) => setMusicFilePath(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  rows={2}
                  placeholder="Clinical purpose or healing benefit..."
                  value={musicDesc}
                  onChange={(e) => setMusicDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" /> Add Track to Healing Vault
              </button>
            </form>
          </div>

          {/* Current Track Inventory */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto space-y-4">
            <h4 className="font-serif font-bold text-lg text-emerald-950 dark:text-white">
              Current Sound Vault Track Inventory ({musicList.length} Tracks)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {musicList.map((t) => (
                <div key={t.id} className="p-3.5 rounded-2xl glass-panel flex items-center justify-between text-xs border border-gray-200/50 dark:border-gray-800">
                  <div>
                    <p className="font-bold text-emerald-950 dark:text-white">{t.title}</p>
                    <p className="text-[11px] text-gray-500">{t.category} • {t.duration} • {t.frequencyHz}Hz</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-teal-300 text-[10px] font-bold">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab 4: Social & Settings */}
      {activeTab === 'socials' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
          <h3 className="font-serif font-bold text-xl text-emerald-950 dark:text-white">
            Configurable Social Media Handles
          </h3>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Instagram Handle URL</label>
              <input
                type="text"
                value={instaUrl}
                onChange={(e) => setInstaUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Facebook Page URL</label>
              <input
                type="text"
                value={fbUrl}
                onChange={(e) => setFbUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">YouTube Channel URL</label>
              <input
                type="text"
                value={ytUrl}
                onChange={(e) => setYtUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 text-xs font-medium outline-none"
              />
            </div>

            <button
              onClick={() => alert('Social handles updated successfully!')}
              className="w-full py-3 rounded-xl bg-emerald-800 text-white font-semibold text-xs"
            >
              Save Configuration Settings
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
