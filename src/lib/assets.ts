/**
 * Universal Asset CDN Helper
 * 
 * Supports dual-mode zero downtime:
 * 1. If NEXT_PUBLIC_IMAGE_CDN_URL is configured: routes to ImageKit /shared/ folder with auto WebP/AVIF.
 * 2. If not configured: falls back cleanly to local public/images/assets/ files.
 */
const CDN_URL = process.env.NEXT_PUBLIC_IMAGE_CDN_URL?.replace(/\/$/, '');

export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return '';

  // Return external or remote URLs unchanged
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  if (CDN_URL) {
    if (path.startsWith('/images/assets/')) {
      const filename = path.replace(/^\/?images\/assets\//, '');
      return `${CDN_URL}/shared/${filename}?tr=f-auto,q-90,e-sharpen-10`;
    }
    if (path.startsWith('/images/categories/')) {
      const filename = path.replace(/^\/?images\/categories\//, '');
      return `${CDN_URL}/categories/${filename}?tr=f-auto,q-90,e-sharpen-10`;
    }
    if (path.startsWith('/images/blog/')) {
      const filename = path.replace(/^\/?images\/blog\//, '');
      return `${CDN_URL}/blog/${filename}?tr=f-auto,q-90,e-sharpen-10`;
    }
    if (path.startsWith('/images/')) {
      const filename = path.replace(/^\/?images\//, '');
      return `${CDN_URL}/${filename}?tr=f-auto,q-90,e-sharpen-10`;
    }
    // Any other relative filename defaults to /shared/
    const clean = path.replace(/^\//, '');
    return `${CDN_URL}/shared/${clean}?tr=f-auto,q-90,e-sharpen-10`;
  }

  // Fallback to local public assets
  return path.startsWith('/') ? path : `/${path}`;
}
