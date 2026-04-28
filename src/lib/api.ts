import { authStorage } from './auth-storage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export type AuthPayload = {
  email: string;
  password: string;
  fullName?: string;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'STUDENT' | 'INSTRUCTOR';
};

export type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type AdminStudentsResponse = {
  totalStudents: number;
  students: Array<{
    id: string;
    fullName: string;
    email: string;
    createdAt: string;
    enrollments: Array<{ id: string; progress: number; course: { id: string; title: string } }>;
  }>;
};

export type AdminStatsResponse = {
  counters: {
    studentsCount: number;
    instructorsCount: number;
    adminsCount: number;
    coursesCount: number;
    videosCount: number;
  };
  enrollmentByDay: Record<string, number>;
};

export type VideoAsset = {
  id: string;
  title: string;
  description: string | null;
  fileUrl: string;
  priceCents: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = authStorage.getAccessToken();
  const headers: Record<string, string> = {
    ...(init?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(init?.headers as Record<string, string> || {}),
  };

  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export function login(payload: AuthPayload) {
  return request<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: payload.email, password: payload.password }),
  });
}

export function signup(payload: AuthPayload) {
  return request<AuthResponse>('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getCurrentUser() {
  return request<{ user: User }>('/api/auth/me', {
    method: 'GET',
  });
}

export function getAdminStudents() {
  return request<AdminStudentsResponse>('/api/admin/students', {
    method: 'GET',
  });
}

export function getAdminStats() {
  return request<AdminStatsResponse>('/api/admin/stats', {
    method: 'GET',
  });
}

export function getAdminVideos() {
  return request<{ total: number; videos: VideoAsset[] }>('/api/admin/videos', {
    method: 'GET',
  });
}

export function uploadAdminVideo(
  payload: { file: File; title: string; description: string; priceCents: number },
) {
  const form = new FormData();
  form.append('file', payload.file);
  form.append('title', payload.title);
  form.append('description', payload.description);
  form.append('priceCents', String(payload.priceCents));

  return request<{ video: VideoAsset }>('/api/admin/videos/upload', {
    method: 'POST',
    body: form,
  });
}

export function updateVideoPrice(id: string, priceCents: number) {
  return request<{ video: VideoAsset }>(`/api/admin/videos/${id}/price`, {
    method: 'PATCH',
    body: JSON.stringify({ priceCents }),
  });
}

