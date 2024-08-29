import { useState } from 'react';
import apiClient from '../Api Client/api-client';


export function useDelete() {
  const [error, setError] = useState<string>('');

  const deleteNote = async (id: string) => {
    try {
      await apiClient.post('/delete', { id });
  
    } catch (err) {
      setError('An error occurred while deleting data');
    }
  };

  return { error, deleteNote };
}
