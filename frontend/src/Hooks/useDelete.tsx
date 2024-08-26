import { useState } from 'react';
import apiClient from '../Api Client/api-client';

export function useDelete() {
  const [data, setData] = useState<string>('');
  const [error, setError] = useState<string>('');

  const deleteNote = async (id: string) => {
    console.log(id)
    try {
      const response = await apiClient.delete('/delete', {
        data: { id } 
      });
      setData(response.data);
    } catch (err) {
      setError('An error occurred while deleting the note');
    }
  };

  return { data, error, deleteNote };
}
