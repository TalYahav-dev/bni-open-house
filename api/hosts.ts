import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

const hosts = [
  { id: '1', name: 'טל', area: 'רחובות', day: 'יום ראשון', date: '30.3.2026', time: '20:00', capacity: 4, hasSafeRoom: true, hostingNote: 'קפה ועוגיות ביתיות מחכים לכם' },
  { id: '2', name: 'רעות', area: 'נס ציונה', day: 'יום שני', date: '31.3.2026', time: '19:30', capacity: 3, hasSafeRoom: true, hostingNote: 'סלון גדול ונעים עם מרפסת' },
  { id: '3', name: 'אילן', area: 'מזכרת בתיה', day: 'יום שלישי', date: '1.4.2026', time: '20:00', capacity: 4, hasSafeRoom: true, hostingNote: '' },
  { id: '4', name: 'מיכל', area: 'רחובות', day: 'יום רביעי', date: '2.4.2026', time: '10:00', capacity: 5, hasSafeRoom: true, hostingNote: 'מפגש בוקר עם ארוחה קלה' },
  { id: '5', name: 'יוסי', area: 'גדרה', day: 'יום חמישי', date: '3.4.2026', time: '19:00', capacity: 3, hasSafeRoom: false, hostingNote: 'בית פרטי עם גינה' },
  { id: '6', name: 'שירה', area: 'נס ציונה', day: 'יום ראשון', date: '6.4.2026', time: '20:30', capacity: 4, hasSafeRoom: true, hostingNote: 'אווירה ביתית וחמה' },
  { id: '7', name: 'דני', area: 'יבנה', day: 'יום שני', date: '7.4.2026', time: '19:00', capacity: 4, hasSafeRoom: true, hostingNote: '' },
  { id: '8', name: 'נועה', area: 'רחובות', day: 'יום שלישי', date: '8.4.2026', time: '20:00', capacity: 3, hasSafeRoom: true, hostingNote: 'כיבוד קל ושתייה חמה' },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const redis = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    });

    // Get all signups from Redis
    const signups: any[] = (await redis.get('signups')) || [];

    const hostsWithSignups = hosts.map((host) => ({
      ...host,
      signupCount: signups.filter((s: any) => s.hostId === host.id).length,
    }));

    return res.status(200).json(hostsWithSignups);
  } catch {
    // If Redis unavailable, return hosts with 0 signups
    return res.status(200).json(hosts.map((h) => ({ ...h, signupCount: 0 })));
  }
}
