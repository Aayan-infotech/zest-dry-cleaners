import { API_BASE_URL } from './apiUrl';
import { setCookie, getCookie, deleteCookie } from './cookies';

export interface LoginResponse {
  message: string;
  role: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    profileImage?: string;
    isVerified: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

export interface SignupData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  city: string;
  state: string;
  zipCode: string;
  houseNumber: string;
  streetName: string;
  area: string;
  landmark: string;
  longitude: string;
  latitude: string;
  profileImage?: File;
  addressType: string;
}

export const login = async (email: string, password: string, role: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      role,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Login failed' }));
    throw new Error(error.message || 'Login failed');
  }

  const data = await response.json();
  
  // Store access token in cookie
  if (data.accessToken) {
    setCookie('authToken', data.accessToken, 7);
  }
  
  // Store refresh token in cookie
  if (data.refreshToken) {
    setCookie('refreshToken', data.refreshToken, 30);
  }
  
  // Store user role from API response in cookie
  if (data.role) {
    setCookie('userRole', data.role, 7);
  }

  return data;
};

export const signup = async (formData: FormData): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Signup failed' }));
    throw new Error(error.message || 'Signup failed');
  }

  return response.json();
};

export const getAuthToken = (): string | null => {
  return getCookie('authToken');
};

export const getUserRole = (): string | null => {
  return getCookie('userRole');
};

export const logout = async (): Promise<void> => {
  const token = getAuthToken();
  
  // Call logout API if token exists
  if (token) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Even if API call fails, we still want to clear local cookies
      if (!response.ok) {
        console.warn('Logout API call failed, but clearing local session');
      }
    } catch (error) {
      // Network error or other issues - still clear local cookies
      console.error('Error calling logout API:', error);
    }
  }
  
  // Always clear local cookies regardless of API call result
  deleteCookie('authToken');
  deleteCookie('refreshToken');
  deleteCookie('userRole');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

