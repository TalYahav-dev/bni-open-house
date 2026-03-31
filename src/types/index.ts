export interface OpenHouseHost {
  id: string;
  name: string;
  area: string;
  day: string;
  date: string;
  time: string;
  capacity: number;
  hasSafeRoom: boolean;
  hostingNote?: string;
}

export interface HostWithSignups extends OpenHouseHost {
  signupCount: number;
  attendees: string[];
}

export interface Signup {
  id: string;
  hostId: string;
  name: string;
  phone: string;
  createdAt: string;
}

export interface HostRequest {
  id: string;
  name: string;
  area: string;
  phone: string;
  preferredDay: string;
  preferredTime: string;
  capacity: number;
  hasSafeRoom: boolean;
  notes: string;
  createdAt: string;
}

export type HostStatus = 'available' | 'limited' | 'full';
