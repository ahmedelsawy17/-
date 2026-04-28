const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export type AuthPayload = {
  email: string;
  password: string;
  fullName?: string;
};

export type AuthResponse = {
  user: { id: string; fullName: string; email: string; role: 'ADMIN' | 'STUDENT' | 'INSTRUCTOR' };
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
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...(init?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

function authHeader(token: string) {
  return { Authorization: `Bearer ${token}` };
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

export function getAdminStudents(accessToken: string) {
  return request<AdminStudentsResponse>('/api/admin/students', {
    method: 'GET',
    headers: authHeader(accessToken),
  });
}

export function getAdminStats(accessToken: string) {
  return request<AdminStatsResponse>('/api/admin/stats', {
    method: 'GET',
    headers: authHeader(accessToken),
  });
}

export function getAdminVideos(accessToken: string) {
  return request<{ total: number; videos: VideoAsset[] }>('/api/admin/videos', {
    method: 'GET',
    headers: authHeader(accessToken),
  });
}

export function uploadAdminVideo(
  accessToken: string,
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
    headers: authHeader(accessToken),
  });
}

export function updateVideoPrice(accessToken: string, id: string, priceCents: number) {
  return request<{ video: VideoAsset }>(`/api/admin/videos/${id}/price`, {
    method: 'PATCH',
    headers: authHeader(accessToken),
    body: JSON.stringify({ priceCents }),
  });
}
