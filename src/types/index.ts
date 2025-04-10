
export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  avatar_url: string | null;
  created_at: string;
}

export interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline';
  binding_time: string;
  created_at: string;
}

export interface DeviceAssignment {
  id: string;
  device_id: string;
  family_member_id: string;
  assigned_at: string;
  created_at: string;
}

export interface ChewingData {
  id: string;
  family_member_id: string;
  date: string;
  count: number;
  created_at: string;
  formattedDate?: string; // Added for UI display formatting
  timeOfDay?: string; // Could be used for future time-based organization
}
