import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');

function readJSON(file: string) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8'));
}

function writeJSON(file: string, data: any) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), 'utf-8');
}

router.post('/signups', (req, res) => {
  const { hostId, name, phone } = req.body;

  if (!hostId || !name || !phone) {
    return res.status(400).json({ error: 'hostId, name, and phone are required' });
  }

  const hosts = readJSON('hosts.json');
  const signups = readJSON('signups.json');

  const host = hosts.find((h: any) => h.id === hostId);
  if (!host) {
    return res.status(404).json({ error: 'Host not found' });
  }

  const hostSignups = signups.filter((s: any) => s.hostId === hostId);
  if (hostSignups.length >= host.capacity) {
    return res.status(400).json({ error: 'This gathering is full' });
  }

  const existing = signups.find((s: any) => s.hostId === hostId && s.phone === phone);
  if (existing) {
    return res.status(400).json({ error: 'You are already signed up for this gathering' });
  }

  const signup = {
    id: uuidv4(),
    hostId,
    name,
    phone,
    createdAt: new Date().toISOString(),
  };

  signups.push(signup);
  writeJSON('signups.json', signups);

  res.status(201).json(signup);
});

router.post('/host-requests', (req, res) => {
  const { name, area, phone, preferredDay, preferredTime, capacity, hasSafeRoom, notes } = req.body;

  if (!name || !area || !phone) {
    return res.status(400).json({ error: 'name, area, and phone are required' });
  }

  const requests = readJSON('host-requests.json');

  const hostRequest = {
    id: uuidv4(),
    name,
    area,
    phone,
    preferredDay: preferredDay || '',
    preferredTime: preferredTime || '',
    capacity: capacity || 0,
    hasSafeRoom: hasSafeRoom || false,
    notes: notes || '',
    createdAt: new Date().toISOString(),
  };

  requests.push(hostRequest);
  writeJSON('host-requests.json', requests);

  res.status(201).json(hostRequest);
});

export { router as signupsRouter };
