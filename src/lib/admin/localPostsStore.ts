import fs from 'fs';
import path from 'path';
import { BlogPostRecord } from './supabaseAdmin';

const LOCAL_POSTS_PATH = path.join(process.cwd(), 'src', 'data', 'local_posts.json');

// High-performance in-memory cache to eliminate redundant synchronous disk I/O
let memoryPostsCache: BlogPostRecord[] | null = null;
let lastMtime: number = 0;

export function clearLocalPostsMemoryCache(): void {
  memoryPostsCache = null;
  lastMtime = 0;
}

export function getLocalPosts(): BlogPostRecord[] {
  try {
    if (!fs.existsSync(LOCAL_POSTS_PATH)) {
      memoryPostsCache = [];
      return [];
    }

    const stat = fs.statSync(LOCAL_POSTS_PATH);
    if (memoryPostsCache !== null && stat.mtimeMs <= lastMtime) {
      return memoryPostsCache;
    }

    const raw = fs.readFileSync(LOCAL_POSTS_PATH, 'utf-8');
    const data = JSON.parse(raw);
    const valid = Array.isArray(data) ? data : [];
    memoryPostsCache = valid;
    lastMtime = stat.mtimeMs;
    return valid;
  } catch (err) {
    console.warn('[localPostsStore] getLocalPosts error:', err);
    return memoryPostsCache || [];
  }
}

export function saveLocalPost(post: BlogPostRecord): void {
  try {
    const posts = [...getLocalPosts()];
    const existingIdx = posts.findIndex(p => p.id === post.id || p.slug === post.slug);
    if (existingIdx >= 0) {
      posts[existingIdx] = { ...posts[existingIdx], ...post, updated_at: new Date().toISOString() };
    } else {
      posts.unshift(post);
    }

    fs.writeFileSync(LOCAL_POSTS_PATH, JSON.stringify(posts, null, 2), 'utf-8');
    memoryPostsCache = posts;
    if (fs.existsSync(LOCAL_POSTS_PATH)) {
      lastMtime = fs.statSync(LOCAL_POSTS_PATH).mtimeMs;
    }
  } catch (err) {
    console.error('[localPostsStore] saveLocalPost error:', err);
  }
}

export function deleteLocalPost(id: string): boolean {
  try {
    const posts = [...getLocalPosts()];
    const filtered = posts.filter(p => p.id !== id && p.slug !== id);
    if (filtered.length !== posts.length) {
      fs.writeFileSync(LOCAL_POSTS_PATH, JSON.stringify(filtered, null, 2), 'utf-8');
      memoryPostsCache = filtered;
      if (fs.existsSync(LOCAL_POSTS_PATH)) {
        lastMtime = fs.statSync(LOCAL_POSTS_PATH).mtimeMs;
      }
      return true;
    }
    return false;
  } catch (err) {
    console.error('[localPostsStore] deleteLocalPost error:', err);
    return false;
  }
}

export function getLocalPostBySlug(slug: string): BlogPostRecord | null {
  const posts = getLocalPosts();
  return posts.find(p => p.slug.toLowerCase() === slug.toLowerCase()) || null;
}
