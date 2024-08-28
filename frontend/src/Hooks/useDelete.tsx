import { useState } from 'react';
import apiClient from '../Api Client/api-client';

interface UseDeleteProps {
  fetchNotes: () => void; 
}

export function useDelete({ fetchNotes }: UseDeleteProps) {
  const [error, setError] = useState<string>('');

  const deleteNote = async (id: string) => {
    try {
      await apiClient.post('/delete', { id });
      fetchNotes(); 
    } catch (err) {
      setError('An error occurred while deleting data');
    }
  };

  return { error, deleteNote };
}
