export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface SubmissionResult {
  success: boolean;
  status: 'success' | 'error';
  message: string;
  whatsappUrl?: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  category?: string;
  location: string;
  serviceType: string;
  message?: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  location: string;
  message?: string;
}

export interface NewsletterFormData {
  email: string;
}

export function buildWhatsAppUrl(text: string, phone: string = '919996265679'): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Submits contact inquiry to WhatsApp concierge.
 */
export async function submitContactInquiry(
  data: ContactFormData,
  whatsappPhone?: string
): Promise<SubmissionResult> {
  const lines = [
    `*ALINA VIP — Booking Inquiry*`,
    `--------------------------------`,
    `👤 *Name:* ${data.name.trim()}`,
    `📱 *Phone:* ${data.phone.trim()}`,
    data.category ? `💎 *Category:* ${data.category}` : null,
    `📍 *Location:* ${data.location || 'Gurgaon'}`,
    `🛎️ *Service:* ${data.serviceType || '5-Star Hotel Outcall'}`,
    data.message?.trim() ? `💬 *Preferences:* ${data.message.trim()}` : null,
    `--------------------------------`,
    `Please confirm escort model availability and dispatch schedule.`,
  ].filter(Boolean);

  const url = buildWhatsAppUrl(lines.join('\n'), whatsappPhone);
  return {
    success: true,
    status: 'success',
    message: 'Reservation details prepared! Directing to private WhatsApp concierge...',
    whatsappUrl: url,
  };
}

/**
 * Submits booking request from homepage or location pages to WhatsApp concierge.
 */
export async function submitBookingRequest(
  data: BookingFormData,
  whatsappPhone?: string
): Promise<SubmissionResult> {
  const lines = [
    `*ALINA VIP — Rapid Booking*`,
    `--------------------------------`,
    `👤 *Name:* ${data.name.trim()}`,
    `📱 *Phone:* ${data.phone.trim()}`,
    `📍 *Location:* ${data.location || 'Gurgaon'}`,
    data.message?.trim() ? `💬 *Preferences:* ${data.message.trim()}` : null,
    `--------------------------------`,
    `Please verify call girl arrival time (20-30 min outcall).`,
  ].filter(Boolean);

  const url = buildWhatsAppUrl(lines.join('\n'), whatsappPhone);
  return {
    success: true,
    status: 'success',
    message: 'Booking request generated! Connecting to private WhatsApp concierge...',
    whatsappUrl: url,
  };
}

/**
 * Submits newsletter subscription via WhatsApp concierge.
 */
export async function submitNewsletterSubscription(
  data: NewsletterFormData,
  whatsappPhone?: string
): Promise<SubmissionResult> {
  const text = `Hi ALINA VIP Concierge, please add my email (${data.email.trim()}) to your private VIP membership list for verified profile drops.`;
  const url = buildWhatsAppUrl(text, whatsappPhone);
  return {
    success: true,
    status: 'success',
    message: 'Subscription confirmed! Opening WhatsApp concierge...',
    whatsappUrl: url,
  };
}
