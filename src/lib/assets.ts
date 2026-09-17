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

  // Extract clean file basename without /images/assets/ prefix
  const filename = path
    .replace(/^\/?images\/assets\//, '')
    .replace(/^\//, '');

  if (CDN_URL) {
    // ImageKit CDN format with auto-format and high quality compression
    return `${CDN_URL}/shared/${filename}?tr=f-auto,q-85`;
  }

  // Fallback to local public assets
  return `/images/assets/${filename}`;
}
