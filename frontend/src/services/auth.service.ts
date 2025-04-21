import api from './api';
import type { AuthResponse, LoginCredentials, SignupCredentials } from '../types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    localStorage.setItem('token', data.token);
    return data;
  },

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/signup', credentials);
    localStorage.setItem('token', data.token);
    return data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  },

  async getCurrentUser(): Promise<AuthResponse['user']> {
    const { data } = await api.get<AuthResponse['user']>('/auth/me');
    return data;
  },
};