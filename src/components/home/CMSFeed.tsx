import React, { useEffect, useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { FOUNDER_DOCTOR } from '../../data/clinicData';
import { CMSPost } from '../../types';
import { createFeedback, fetchApprovedFeedback, isSupabaseConfigured } from '../../lib/queries';
import {
  Instagram,
  Sparkles,
  Heart,
  MessageCircle,
  Share2,
  Award,
  Calendar,
  X,
  Play,
  CheckCircle2,
  Star,
  Send
} from 'lucide-react';

interface FeedbackItem {
  id: string;
  name: string;
  text: string;
  rating: number;
}

const INITIAL_FEEDBACKS: FeedbackItem[] = [
  {
    id: 'fb-1',
    name: 'Priya S.',
    text: 'The reception team was kind and the sonography visit was very smooth.',
    rating: 5,
  },
  {
    id: 'fb-2',
    name: 'Ritesh P.',
    text: 'Very calming atmosphere, thoughtful medical guidance, and a polished experience.',
    rating: 5,
  }
];

export const CMSFeed: React.FC = () => {
  const { posts, selectedCategory, setSelectedCategory } = useCMS();
  const [activeStory, setActiveStory] = useState<CMSPost | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(INITIAL_FEEDBACKS);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchApprovedFeedback();
        if (cancelled) return;
        const mapped: FeedbackItem[] = rows.map((r) => ({
          id: r.id,
          name: r.name,
          text: r.text,
          rating: r.rating,
        }));
        setFeedbacks(mapped.length > 0 ? mapped : INITIAL_FEEDBACKS);
      } catch (e) {
        console.error('Failed to load feedback from Supabase:', e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const stories = posts.filter(p => p.category === 'Story' || p.category === 'HealthCamp');

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackName.trim() || !feedbackText.trim()) return;

    let newId = `fb-${Date.now()}`;

    if (isSupabaseConfigured) {
      try {
        await createFeedback({
          name: feedbackName.trim(),
          rating: feedbackRating,
          text: feedbackText.trim(),
        });
      } catch (err) {
        console.error('Failed to submit feedback to Supabase:', err);
      }
    }

    setFeedbacks(prev => [
      {
        id: newId,
        name: feedbackName.trim(),
        text: feedbackText.trim(),
        rating: feedbackRating,
      },
      ...prev,
    ]);

    setFeedbackName('');
    setFeedbackText('');
    setFeedbackRating(5);
    setFeedbackMessage('Thank you for sharing your feedback with Astygma Hope.');
    setFeedbackOpen(false);
  };

  return (
    <section className="py-12 px-4 sm:px-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold uppercase tracking-wider">
            <Instagram className="w-3.5 h-3.5" />
            <span>Instagram Style Clinic Stories & News</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-emerald-950 dark:text-white mt-1">
            Astygma Hope Media Feed
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFeedbackOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-md flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Give Feedback</span>
          </button>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {['All', 'Story', 'Blog', 'HealthTip', 'HealthCamp'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'glass-panel text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Instagram Stories Bubbles */}
      <div className="flex items-center gap-4 overflow-x-auto py-3 px-2 no-scrollbar">
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 group"
          >
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 group-hover:scale-105 transition-transform shadow-md">
              <div className="w-full h-full rounded-full bg-emerald-950 flex items-center justify-center text-white font-bold text-xs overflow-hidden border-2 border-white dark:border-gray-900">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
            </div>
            <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300 max-w-[70px] truncate text-center">
              {story.title}
            </span>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-amber-200/70 dark:border-amber-900/60 bg-gradient-to-r from-amber-50/80 to-emerald-50/80 dark:from-amber-950/40 dark:to-emerald-950/40">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">Patient Voices</p>
            <h3 className="font-serif text-xl font-bold text-emerald-950 dark:text-white">Share a quick review</h3>
          </div>
          <button
            onClick={() => setFeedbackOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-md"
          >
            Take Feedback
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {feedbacks.slice(0, 2).map((item) => (
            <div key={item.id} className="rounded-2xl bg-white/80 dark:bg-slate-900/70 p-3 border border-amber-200/60 dark:border-amber-900/50">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star key={index} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-[11px] text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">“{item.text}”</p>
              <p className="text-[10px] font-semibold text-emerald-800 dark:text-teal-300 mt-2">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {feedbackMessage && (
        <div className="rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 px-4 py-3 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Feed Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="glass-panel rounded-3xl p-6 space-y-4 shadow-lg border border-gray-200/50 dark:border-gray-800/50">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img 
                  src={FOUNDER_DOCTOR.imagePath} 
                  alt={post.author} 
                  className="w-8 h-8 rounded-full object-cover object-top border border-emerald-500/40" 
                />
                <div>
                  <p className="text-xs font-bold text-emerald-950 dark:text-white">{post.author}</p>
                  <p className="text-[10px] text-gray-500">{post.date}</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-teal-300 text-[10px] font-bold uppercase">
                {post.category}
              </span>
            </div>

            {/* Media Box */}
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-emerald-900 to-teal-950 flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden">
              <Sparkles className="w-8 h-8 text-amber-400 opacity-60 mb-2" />
              <h4 className="font-serif font-bold text-base px-4">{post.title}</h4>
            </div>

            {/* Content */}
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              {post.content}
            </p>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>Comment</span>
                </button>
              </div>
              <button className="hover:text-emerald-600">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {feedbackOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-7 space-y-4 border border-amber-400/40 bg-white/95 dark:bg-gray-950/95">
            <button
              onClick={() => setFeedbackOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            <div className="space-y-1 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-amber-700 dark:text-amber-300">Feedback</p>
              <h3 className="font-serif text-2xl font-bold text-emerald-950 dark:text-white">Tell us about your visit</h3>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Your name</label>
                <input
                  type="text"
                  required
                  value={feedbackName}
                  onChange={(e) => setFeedbackName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 text-xs font-medium outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Rating</label>
                <div className="flex items-center gap-2 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFeedbackRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star className={`w-5 h-5 ${feedbackRating >= star ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Your feedback</label>
                <textarea
                  rows={4}
                  required
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 text-xs font-medium outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Story Viewer Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-sm rounded-3xl p-6 space-y-6 text-white bg-gradient-to-b from-emerald-950 to-gray-950 relative border border-emerald-500/30">
            <button 
              onClick={() => setActiveStory(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full w-2/3 animate-pulse" />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-xs">
                UK
              </div>
              <div>
                <p className="text-xs font-bold">{activeStory.author}</p>
                <p className="text-[10px] text-gray-400">{activeStory.category} • Shirol Branch</p>
              </div>
            </div>

            <div className="py-12 text-center space-y-3">
              <Sparkles className="w-12 h-12 text-amber-400 mx-auto" />
              <h3 className="font-serif text-xl font-bold">{activeStory.title}</h3>
              <p className="text-xs text-gray-300">{activeStory.content}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
