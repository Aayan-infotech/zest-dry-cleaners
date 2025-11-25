import axios from 'axios';
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

export const login = async (email: string, password: string, role: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/login`, {
      email,
      password,
      role,
    });

    const data = response.data;
    
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
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Login failed';
    throw new Error(errorMessage);
  }
};

export const signup = async (formData: FormData): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Signup failed';
    throw new Error(errorMessage);
  }
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
      await axios.post(
        `${API_BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      // Even if API call fails, we still want to clear local cookies
      console.warn('Logout API call failed, but clearing local session');
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

export interface VerifyOTPRequest {
  phoneNumber: string;
  otp: string;
}

export interface ResendOTPRequest {
  phoneNumber: string;
}

export const verifyOTP = async (data: VerifyOTPRequest): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, data);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'OTP verification failed';
    throw new Error(errorMessage);
  }
};

export const resendOTP = async (data: ResendOTPRequest): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/resend-otp`, data);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to resend OTP';
    throw new Error(errorMessage);
  }
};

