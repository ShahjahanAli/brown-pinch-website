'use client';
import { useState } from 'react';

export default function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const withLoading = async (callback: () => Promise<any>) => {
    setIsLoading(true);
    try {
      await callback();
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, withLoading };
} 