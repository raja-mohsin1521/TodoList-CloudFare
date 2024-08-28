import { useState } from 'react';
import apiClient from '../Api Client/api-client';

interface UseUpdateProps {
  fetchNotes: () => void; 
}

export function useUpdate({ fetchNotes }: UseUpdateProps) {
  const [error, setError] = useState<string>('');

  const updateNote = async (payload: { id: string; title: string; description: string; date: string }) => {
    try {
      await apiClient.put('/update', payload);
     
    } catch (err) {
      setError('An error occurred while updating data');
    }
  };

  return { error, updateNote };
}
