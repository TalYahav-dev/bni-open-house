import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

const HOST_IDS = ['1', '2', '3', '4', '5', '6', '7'];
const CAPACITIES: Record<string, number> = {
  '1': 9, '2': 6, '3': 6, '4': 6, '5': 6, '6': 6, '7': 6,
};

interface Signup {
  hostId: string;
  name: string;
  phone: string;
  createdAt: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { hostId, name, phone } = req.body || {};

  if (!hostId || !name || !phone) {
    return res.status(400).json({ error: 'חסרים שדות חובה' });
  }

  if (!HOST_IDS.includes(hostId)) {
    return res.status(400).json({ error: 'מארח לא נמצא' });
  }

  try {
    const redis = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    });

    const signups: Signup[] = (await redis.get('signups')) || [];

    const hostSignups = signups.filter((s) => s.hostId === hostId);
    if (hostSignups.length >= CAPACITIES[hostId]) {
      return res.status(400).json({ error: 'המפגש מלא' });
    }

    const duplicate = signups.find(
      (s) => s.hostId === hostId && s.phone === phone
    );
    if (duplicate) {
      return res.status(400).json({ error: 'כבר נרשמת למפגש הזה' });
    }

    const newSignup: Signup = {
      hostId,
      name: name.trim(),
      phone: phone.trim(),
      createdAt: new Date().toISOString(),
    };

    signups.push(newSignup);
    await redis.set('signups', signups);

    return res.status(201).json({ success: true, signup: newSignup });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'שגיאה בשרת, נסו שוב' });
  }
}
