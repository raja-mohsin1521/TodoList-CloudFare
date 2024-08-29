import { useState } from 'react';
import apiClient from '../Api Client/api-client';
import { FormInterface } from '../Components/Form';

interface UseCreateProps {
  fetchNotes: () => void; 
}

export function useCreate({ fetchNotes }: UseCreateProps) {
  const [error, setError] = useState<string>('');

  const createNotes = async (payload: FormInterface) => {
    try {
      await apiClient.post('/add', payload).then(res=>   console.log(res.data.note));
      console.log()
      fetchNotes(); 
    } catch (err) {
      setError('An error occurred while sending data');
    }
  };

  return { error, createNotes };
}
