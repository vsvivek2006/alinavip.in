'use client';

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function imagekitLoader({ src, width, quality }: ImageLoaderProps): string {
  if (!src) return '';

  const q = quality || 80;

  // If already an ImageKit URL
  if (src.includes('ik.imagekit.io')) {
    const base = src.split('?')[0];
    return `${base}?tr=w-${width},q-${q},f-auto`;
  }

  // If relative path pointing to images
  if (src.startsWith('/images/')) {
    const cdnUrl = 'https://ik.imagekit.io/uum5sguzw';
    const clean = src.replace(/^\/images\//, '');
    return `${cdnUrl}/${clean}?tr=w-${width},q-${q},f-auto`;
  }

  // Remote URLs outside ImageKit
  return src;
}
