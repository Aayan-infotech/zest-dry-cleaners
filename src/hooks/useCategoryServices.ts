import { useState, useEffect } from 'react';
import { getAllCategoryServices } from '../utils/auth';

export interface Category {
  _id: string;
  categoryName: string;
  description: string;
  profileImage?: string;
  pricePerPiece?: number;
  estimatedDeliveryTime?: string;
  createdAt: string;
  updatedAt?: string;
  __v: number;
}

export interface UseCategoryServicesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useCategoryServices = (): UseCategoryServicesReturn => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategoryServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllCategoryServices();
      const fetchedCategories = data?.categories || [];
      setCategories(fetchedCategories);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch category services';
      setError(errorMessage);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryServices();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategoryServices,
  };
};

