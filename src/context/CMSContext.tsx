import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CMSPost, CMSCategory } from '../types';
import { SAMPLE_CMS_POSTS } from '../data/clinicData';
import { fetchBlogPosts, createBlogPost, isSupabaseConfigured } from '../lib/queries';

interface CMSContextType {
  posts: CMSPost[];
  addPost: (post: Omit<CMSPost, 'id' | 'date' | 'likes'>) => Promise<boolean>;
  selectedCategory: CMSCategory | 'All';
  setSelectedCategory: (cat: CMSCategory | 'All') => void;
  isLoading: boolean;
  isSupabaseActive: boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<CMSPost[]>(SAMPLE_CMS_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<CMSCategory | 'All'>('All');
  const [isLoading, setIsLoading] = useState<boolean>(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchBlogPosts();
        if (cancelled) return;
        const mapped: CMSPost[] = rows.map((r) => ({
          id: r.id,
          title: r.title,
          category: r.category,
          content: r.content,
          mediaUrl: r.media_url || undefined,
          mediaType: (r.media_type as CMSPost['mediaType']) || 'image',
          mediaList: r.media_list,
          date: (r.published_at || r.created_at || '').split('T')[0],
          author: r.author,
          likes: r.likes,
        }));
        setPosts(mapped);
      } catch (e) {
        console.error('Failed to load blog posts from Supabase:', e);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const addPost = useCallback(async (newPostData: Omit<CMSPost, 'id' | 'date' | 'likes'>): Promise<boolean> => {
    const post: CMSPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };

    if (isSupabaseConfigured) {
      try {
        const row = await createBlogPost({
          title: newPostData.title,
          category: newPostData.category,
          content: newPostData.content,
          mediaUrl: newPostData.mediaUrl,
          mediaType: newPostData.mediaType,
          mediaList: newPostData.mediaList,
          author: newPostData.author,
        });
        const created: CMSPost = {
          ...post,
          id: row.id,
          date: (row.published_at || row.created_at || '').split('T')[0],
          likes: row.likes,
        };
        setPosts(prev => [created, ...prev]);
        return true;
      } catch (e) {
        console.error('Failed to publish post to Supabase:', e);
        return false;
      }
    }

    setPosts(prev => [post, ...prev]);
    return true;
  }, []);

  const value = useMemo(() => ({
    posts,
    addPost,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    isSupabaseActive: isSupabaseConfigured,
  }), [posts, addPost, selectedCategory, isLoading]);

  return (
    <CMSContext.Provider value={value}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) throw new Error('useCMS must be used within CMSProvider');
  return context;
};


