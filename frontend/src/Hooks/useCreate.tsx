import { useState } from 'react';
import apiClient from '../Api Client/api-client'; 
import { FormInterface } from '../Components/Form';

export function useCreate() {
  const [data, setData] = useState<string>('');
  const [error, setError] = useState<string>('');

  const createNotes = async (payload: FormInterface) => {
    try {
      const response = await apiClient.post('/add', payload);
      setData(response.data);
    } catch (err) {
      setError('An error occurred while sending data');
    }
  };

  return { data, error, createNotes };
}
