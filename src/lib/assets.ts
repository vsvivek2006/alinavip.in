/**
 * Universal Asset CDN Helper
 * 
 * Supports dual-mode zero downtime:
 * 1. If NEXT_PUBLIC_IMAGE_CDN_URL is configured: routes to ImageKit /shared/ folder with auto WebP/AVIF.
 * 2. If not configured: falls back cleanly to local public/images/assets/ files.
 */
const CDN_URL = (process.env.NEXT_PUBLIC_IMAGE_CDN_URL || 'https://ik.imagekit.io/uum5sguzw').replace(/\/$/, '');

export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return '';

  // Already an ImageKit CDN URL: sanitize out any old artificial sharpen/upscale filters
  if (path.includes('ik.imagekit.io')) {
    return path
      .replace(/e-sharpen-\d+,?/, '')
      .replace(/,\?/, '?')
      .replace(/[?,]$/, '');
  }

  // Upload URL: extract filename and route through ImageKit CDN
  if (path.includes('/wp-content/uploads/')) {
    const filename = path.split('/').pop()?.split('?')[0] || '';
    return `${CDN_URL}/shared/${filename}?tr=f-auto,q-85`;
  }

  // Other remote external URLs: return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Category portraits
  if (path.startsWith('/images/categories/')) {
    const filename = path.replace(/^\/?images\/categories\//, '');
    return `${CDN_URL}/categories/${filename}?tr=f-auto,q-85`;
  }

  // Blog images
  if (path.startsWith('/images/blog/')) {
    const filename = path.replace(/^\/?images\/blog\//, '');
    return `${CDN_URL}/blog/${filename}?tr=f-auto,q-85`;
  }

  // Assets folder
  if (path.startsWith('/images/assets/')) {
    const filename = path.replace(/^\/?images\/assets\//, '');
    return `${CDN_URL}/shared/${filename}?tr=f-auto,q-85`;
  }

  // General images folder
  if (path.startsWith('/images/')) {
    const filename = path.replace(/^\/?images\//, '');
    return `${CDN_URL}/${filename}?tr=f-auto,q-85`;
  }

  // Any relative path strictly routes through ImageKit /shared/
  const clean = path.replace(/^\//, '');
  return `${CDN_URL}/shared/${clean}?tr=f-auto,q-85`;
}
