import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { fetchTestimonials, isSupabaseConfigured } from '../../lib/queries';
import { Star, HeartHandshake, Quote, MessageSquareHeart } from 'lucide-react';

export interface Testimonial {
  name: string;
  location: string;
  rating: number; // 1-5
  review: string;
  service?: string;
  imagePath?: string;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials: propTestimonials = [] }) => {
  const { t } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(propTestimonials);

  useEffect(() => {
    if (propTestimonials.length > 0) {
      setTestimonials(propTestimonials);
      return;
    }
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchTestimonials();
        if (cancelled) return;
        const mapped: Testimonial[] = rows.map((r) => ({
          name: r.name,
          location: r.location || '',
          rating: r.rating,
          review: r.review,
          service: r.service || undefined,
          imagePath: r.image_path || undefined,
        }));
        setTestimonials(mapped);
      } catch (e) {
        console.error('Failed to load testimonials from Supabase:', e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [propTestimonials]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="text-center max-w-3xl mx-auto space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
          <HeartHandshake className="w-3.5 h-3.5 text-amber-500" />
          <span>{t('testimonialsBadge')}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 dark:text-white">
          {t('testimonialsHeading')}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          {t('testimonialsSubtitle')}
        </p>
      </motion.div>

      {testimonials.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl p-10 border border-dashed border-amber-500/40 text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 mx-auto flex items-center justify-center">
            <MessageSquareHeart className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-xl text-emerald-950 dark:text-white">
            {t('testimonialsEmptyTitle')}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto">
            {t('testimonialsEmptyDesc')}
          </p>
          <div className="flex items-center justify-center gap-2 text-amber-500">
            <Star className="w-5 h-5 fill-amber-400" />
            <Star className="w-5 h-5 fill-amber-400" />
            <Star className="w-5 h-5 fill-amber-400" />
            <Star className="w-5 h-5 fill-amber-400" />
            <Star className="w-5 h-5 fill-amber-400" />
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass-panel rounded-3xl p-6 space-y-4 border border-amber-500/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <Quote className="w-8 h-8 text-amber-500/40" />
                {renderStars(item.rating)}
              </div>

              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                {item.review}
              </p>

              <div className="flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-4">
                {item.imagePath ? (
                  <img
                    src={item.imagePath}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-amber-500/40"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-teal-300 flex items-center justify-center font-bold text-sm">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold text-emerald-950 dark:text-white">{item.name}</p>
                  <p className="text-[10px] text-gray-500">{item.location}</p>
                </div>
                {item.service && (
                  <span className="ml-auto px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-teal-300 text-[10px] font-semibold">
                    {item.service}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
);
};
