import fs from 'fs';
import path from 'path';
import { BlogPostRecord } from './supabaseAdmin';

const LOCAL_POSTS_PATH = path.join(process.cwd(), 'src', 'data', 'local_posts.json');

export function getLocalPosts(): BlogPostRecord[] {
  try {
    if (!fs.existsSync(LOCAL_POSTS_PATH)) {
      return [];
    }
    const raw = fs.readFileSync(LOCAL_POSTS_PATH, 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn('[localPostsStore] getLocalPosts error:', err);
    return [];
  }
}

export function saveLocalPost(post: BlogPostRecord): void {
  try {
    const posts = getLocalPosts();
    const existingIdx = posts.findIndex(p => p.id === post.id || p.slug === post.slug);
    if (existingIdx >= 0) {
      posts[existingIdx] = { ...posts[existingIdx], ...post, updated_at: new Date().toISOString() };
    } else {
      posts.unshift(post);
    }
    fs.writeFileSync(LOCAL_POSTS_PATH, JSON.stringify(posts, null, 2), 'utf-8');
  } catch (err) {
    console.error('[localPostsStore] saveLocalPost error:', err);
  }
}

export function deleteLocalPost(id: string): boolean {
  try {
    const posts = getLocalPosts();
    const filtered = posts.filter(p => p.id !== id && p.slug !== id);
    if (filtered.length !== posts.length) {
      fs.writeFileSync(LOCAL_POSTS_PATH, JSON.stringify(filtered, null, 2), 'utf-8');
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
