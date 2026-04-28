const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_ID_KEY = 'userId';
const ROLE_KEY = 'role';

export const authStorage = {
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  getUserId: () => localStorage.getItem(USER_ID_KEY),
  getRole: () => localStorage.getItem(ROLE_KEY),

  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  },

  setUser: (id: string, role: string) => {
    localStorage.setItem(USER_ID_KEY, id);
    localStorage.setItem(ROLE_KEY, role);
  },

  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(ROLE_KEY);
  },

  isAuthenticated: () => !!localStorage.getItem(ACCESS_TOKEN_KEY),
};
