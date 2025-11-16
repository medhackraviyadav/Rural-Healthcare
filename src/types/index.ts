export interface Checkup {
  id: string;
  name: string;
  icon: 'Thermometer' | 'HeartPulse' | 'Droplet' | 'Wind' | 'Scale';
}

export interface DoctorSpeciality {
  id: string;
  name: string;
  description: string;
  icon: 'Stethoscope' | 'Baby' | 'User' | 'HeartPulse';
}
