import { useState } from 'react';
import apiClient from '../Api Client/api-client';
import { FormInterface } from '../Components/Form';

interface UseCreateProps {
  fetchNotes: () => void; // Use fetchNotes here
}

export function useCreate({ fetchNotes }: UseCreateProps) {
  const [error, setError] = useState<string>('');

  const createNotes = async (payload: FormInterface) => {
    try {
      await apiClient.post('/add', payload);
      fetchNotes(); // Call fetchNotes directly
    } catch (err) {
      setError('An error occurred while sending data');
    }
  };

  return { error, createNotes };
}
