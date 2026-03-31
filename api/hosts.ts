import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

const hosts = [
  { id: '1', name: 'טל יהב', area: 'הפרג 8, רחובות', day: 'יום ראשון', date: '29.3.2026', time: '21:30', capacity: 9, hasSafeRoom: true, hostingNote: '' },
  { id: '2', name: 'רינת נצרתי', area: 'זכריה חתוכה 8 דירה 31 קומה 8', day: 'יום ראשון', date: '29.3.2026', time: '11:00', capacity: 6, hasSafeRoom: true, hostingNote: '' },
  { id: '3', name: 'ריטה מושיאקוב', area: 'התבור 7, באר יעקב', day: 'יום שני', date: '30.3.2026', time: '11:00', capacity: 6, hasSafeRoom: true, hostingNote: '' },
  { id: '4', name: 'נדב וינינגר', area: 'חיים מלר 26, מזכרת בתיה', day: 'יום שני', date: '30.3.2026', time: '15:00', capacity: 6, hasSafeRoom: true, hostingNote: '' },
  { id: '5', name: 'נועה קריספל', area: 'אלוף דוד 203, רמת גן', day: 'יום שלישי', date: '31.3.2026', time: '10:30', capacity: 6, hasSafeRoom: true, hostingNote: '' },
  { id: '6', name: 'רבקה שפירר', area: 'צאלון 4, רחובות', day: 'יום שני', date: '6.4.2026', time: '10:30', capacity: 6, hasSafeRoom: true, hostingNote: '' },
  { id: '7', name: 'שרון רונס-מקמל', area: 'פרופ׳ יהודית בירק 3, רחובות', day: 'יום שלישי', date: '31.3.2026', time: '21:30', capacity: 6, hasSafeRoom: true, hostingNote: '' },
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

    const signups: any[] = (await redis.get('signups')) || [];

    const hostsWithSignups = hosts.map((host) => {
      const hostSignups = signups.filter((s: any) => s.hostId === host.id);
      return {
        ...host,
        signupCount: hostSignups.length,
        attendees: hostSignups.map((s: any) => s.name),
      };
    });

    return res.status(200).json(hostsWithSignups);
  } catch {
    return res.status(200).json(hosts.map((h) => ({ ...h, signupCount: 0, attendees: [] })));
  }
}
