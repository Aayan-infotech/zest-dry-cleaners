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

export interface ForgotPasswordRequest {
  phoneNumber: string;
}

export const login = async (email: string, password: string, role: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/login`, {
      email,
      password,
      role,
    });

    const data = response.data;
    if (data.accessToken) {
      setCookie('authToken', data.accessToken, 7);
    }
    if (data.refreshToken) {
      setCookie('refreshToken', data.refreshToken, 30);
    }
    if (data.role) {
      setCookie('userRole', data.role, 7);
    }
    if (data.user?.id) {
      setCookie('loggedinId', data.user.id, 7);
    }
    return data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Login failed';
    throw new Error(errorMessage);
  }
};

// ==================== GET USER PROFILE ====================
export const getUserProfile = async (): Promise<any> => {
  try {
    const token = getAuthToken();
    const userId = getCookie('loggedinId');
    if (!token) throw new Error("User not authenticated");
    if (!userId) throw new Error("User ID not found");

    const response = await axios.get(`${API_BASE_URL}/user/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user profile");
  }
};

// ==================== UPDATE USER PROFILE ====================
export const updateUserProfile = async (
  userId: string,
  data: {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
  },
  profileImage?: File
): Promise<any> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("User not authenticated");

    const formData = new FormData();
    if (data.fullName) formData.append("fullName", data.fullName);
    if (data.email) formData.append("email", data.email);
    if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
    if (profileImage) formData.append("profileImage", profileImage);

    const response = await axios.put(`${API_BASE_URL}/auth/editProfile/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update profile");
  }
};

export const forgotPassword = async (data: ForgotPasswordRequest): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/forgotPassword`,
      data,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response?.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Forgot password request failed';
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
      console.warn('Logout API call failed, but clearing local session');
    }
  }
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

export const verifyOtp = async (phoneNumber: string, otp: string): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/verify-otp`, { phoneNumber, otp }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "OTP verification failed";
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

export const getAllCategoryServices = async (): Promise<any> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('User not authenticated');
    const response = await axios.get(`${API_BASE_URL}/service-category/getAll`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch category services';
    throw new Error(errorMessage);
  }
};

export const getServiceCategoryById = async (id: string): Promise<any> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('User not authenticated');
    const response = await axios.get(`${API_BASE_URL}/service-category/getById/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch category services';
    throw new Error(errorMessage);
  }
};

export const getAllActiveEmployeeOrders = async (id: string): Promise<any> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error('User not authenticated');
    const response = await axios.get(`${API_BASE_URL}/order/getOrdersByEmployee/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch active orders';
    throw new Error(errorMessage);
  }
};

export const addToCart = async (categoryId: string, quantity: number = 1): Promise<any> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("User not authenticated");
    const response = await axios.post(`${API_BASE_URL}/cart/add`, { categoryId, quantity }, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to add to cart";
    throw new Error(message);
  }
};

export const getCart = async (): Promise<any> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("User not authenticated");
    const response = await axios.get(`${API_BASE_URL}/cart/getCart`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to fetch cart";
    throw new Error(message);
  }
};

export const updateCartQuantity = async (categoryId: string, quantity: number): Promise<any> => {
  try {
    const token = getAuthToken();
    const response = await axios.put(
      `${API_BASE_URL}/cart/updateQuantity`,
      { categoryId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update quantity");
  }
};

export const removeCartItem = async (categoryId: string): Promise<any> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("User not authenticated");
    const response = await axios.delete(`${API_BASE_URL}/cart/removeItem`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      data: { categoryId }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to remove item");
  }
};

// ======================== ADD NEW LOCATION ========================
export const addUserAddress = async (payload: any): Promise<any> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("User not authenticated");

    const response = await axios.post(`${API_BASE_URL}/address/add`, payload, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to add address");
  }
};

// ======================== GET USER ADDRESSES ========================
export const getUserAddresses = async (userId: string): Promise<any> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("User not authenticated");

    const response = await axios.get(`${API_BASE_URL}/address/getAddresses/${userId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch addresses");
  }
};

// ======================== UPDATE USER ADDRESS ========================
export const updateUserAddress = async (addressId: string, payload: any): Promise<any> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("User not authenticated");

    const response = await axios.put(`${API_BASE_URL}/address/update/${addressId}`, payload, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update address");
  }
};

// ======================== DELETE USER ADDRESS ========================
export const deleteUserAddress = async (addressId: string): Promise<any> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("User not authenticated");

    const response = await axios.delete(`${API_BASE_URL}/address/delete/${addressId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete address");
  }
};