import { useState } from 'react';
import apiClient from '../Api Client/api-client'; 
import { FormInterface } from '../Components/Form';

interface UseUpdateProps {
  refreshData: () => void;
}

export function useUpdate({ refreshData }: UseUpdateProps) {
  const [data, setData] = useState<string>('');
  const [error, setError] = useState<string>('');

  const updateNote = async (payload: FormInterface) => {
    try {
      const response = await apiClient.put(`/update`, payload); 
      setData(response.data);
      refreshData(); 
    } catch (err) {
      setError('An error occurred while updating data');
    }
  };

  return { data, error, updateNote };
}
