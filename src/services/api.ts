import axios from 'axios';
import { Checkup, DoctorSpeciality } from '../types';

// Create an axios instance using the environment variable for the base URL.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// --- API Functions ---

/**
 * Fetches the list of available checkups.
 * Corresponds to: GET /checkups
 */
export const getCheckups = async (): Promise<Checkup[]> => {
  console.log('Fetching checkups from API...');
  const { data } = await apiClient.get<Checkup[]>('/checkups');
  return data;
};

/**
 * Fetches the list of available doctor specialities.
 * Corresponds to: GET /doctors/specialities
 */
export const getDoctorSpecialities = async (): Promise<DoctorSpeciality[]> => {
  console.log('Fetching doctor specialities from API...');
  const { data } = await apiClient.get<DoctorSpeciality[]>('/doctors/specialities');
  return data;
};

/**
 * Requests a new consultation session.
 * Corresponds to: POST /consultations
 * @param specialityId - The ID of the doctor speciality the user wants to connect with.
 */
export const requestConsultation = async (specialityId: string): Promise<{ success: boolean; consultationId: string }> => {
  console.log(`Requesting consultation for speciality ID: ${specialityId}`);
  const { data } = await apiClient.post('/consultations', { specialityId });
  return data;
};
