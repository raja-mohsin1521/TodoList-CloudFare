import { useState } from 'react';
import apiClient from '../Api Client/api-client';

interface UseDeleteProps {
  refreshData: () => void;
}

export function useDelete({ refreshData }: UseDeleteProps) {
  const [data, setData] = useState<string>('');
  const [error, setError] = useState<string>('');

  const deleteNote = async (id: string) => {
    try {
      const response = await apiClient.post('/delete', { id });
      setData(response.data);
      refreshData();
    } catch (err) {
      setError('An error occurred while deleting data');
    }
  };

  return { data, error, deleteNote };
}
