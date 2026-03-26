import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');

function readJSON(file: string) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8'));
}

router.get('/hosts', (_req, res) => {
  const hosts = readJSON('hosts.json');
  const signups = readJSON('signups.json');

  const hostsWithCounts = hosts.map((host: any) => ({
    ...host,
    signupCount: signups.filter((s: any) => s.hostId === host.id).length,
  }));

  res.json(hostsWithCounts);
});

router.get('/hosts/:id/signups', (req, res) => {
  const signups = readJSON('signups.json');
  const hostSignups = signups.filter((s: any) => s.hostId === req.params.id);
  res.json(hostSignups);
});

export { router as hostsRouter };
